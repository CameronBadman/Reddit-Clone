const snoowrap = require("snoowrap");

const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjpzS3dsMnlsV0VtMjVmcXhwTU40cWY4MXE2OWFFdWFyMnpLMUdhVGxjdWNZIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNzA4NzA1MTE5LjMxODQwMywiaWF0IjoxNzA4NjE4NzE5LjMxODQwMywianRpIjoidWdZUUtjNndSSEVJS3YzV0xZbmdJX3U2V2dyemlBIiwiY2lkIjoicG5sUkdiT1VVY3JKME1td3lVcWdqUSIsImxpZCI6InQyX2l0ZnV5aHh6IiwiYWlkIjoidDJfaXRmdXloeHoiLCJsY2EiOjE2NDI2MzY1NDM5NjksInNjcCI6ImVKeEVqa0Z1eFNBTVJPX2lkVzVVZFdHd3liY0tPTEpOcXR5LW92RGIzWWhobnQ4SFpHTWlDWWNEbWxMWDRKV3k5akJKSTlSMjExRHFYMWZraEFOOEpNOG1hVzQ4Yk9RWXh1VHhWSjZqZTlHLTVVdVlKT2I0OFpILUxfcEliYjByVlQxWHVOVGZPcVdpMlB5SDk5YlNlUEd2a0RFU0hIQ1ozQmpjMkIxUFhzV2xOcGxDM0VQaWdRT3EzTnl3NHprcG1MT092cS1HWVNtU3QtV0d2bVdWNXVOS3pyWEFBU194VUp2TTVmYjVFd0FBX185eG0yX3QiLCJmbG8iOjh9.oNXreeoxzfxAo6RYwlOXt0GqgeckJAgBpBwPjm9wPQ3CXpkFticexZeh7BKGSlK5lHxNZXokt1GAPvpZ-yXlcleM21L9ruY8DJBKRYs-4eN6WkacUtvwmDYTHlSWZVuou4g3lCqDBfpW1R0ouUfMA3n7QXtqYSHdxcmpY8ik3oq_DwN0IDmn7RXDvPFDgLnZdYCpbicL_X5RR993dS2derp0GJKMRG-QipaEZEmnT6Widr9tvFuiUdugyoc2KbjEVIrkPI_Kkkc3wiQJkVsv6u76B1APK5rci6lH1F8PNOp3EqvoIZsJr_64grGzOkoz46_QxNGhJQL10pr7W_PuJQ"
  
const redditClient = new snoowrap({
  userAgent: "api calls",
  accessToken: token,
});

async function getHotRedditPosts(subreddit, start, end) {
  try {
    const subredditObj = await redditClient.getSubreddit(subreddit);
    let postsInRange = [];
    let count = 0;

    // Fetch hot posts until reaching the end or limit
    while (postsInRange.length < end - start && count < end) {
      const hotPosts = await subredditObj.getHot({ limit: 100, count: count });

      // If there are no more posts available, break the loop
      if (hotPosts.length === 0) {
        break;
      }

      // Add fetched posts to the result
      postsInRange = postsInRange.concat(hotPosts);

      // Update the count for the next iteration
      count += hotPosts.length;
    }

    // Slice the array to get the posts within the specified range
    postsInRange = postsInRange.slice(start, end);

    return postsInRange.map((post) => extractPostInfo(post));
  } catch (error) {
    console.error("Error fetching Reddit posts:", error);
    return [];
  }
}

function extractPostInfo(submission) {
  let post = Object();
  post.id = submission.id;
  post.title = submission.title;
  post.content = submission.selftext;
  post.thumbnail = submission.thumbnail;
  post.likes = submission.likes;
  post.num_comments = submission.num_comments;
  post.comments = submission.comments;
  post.author = submission.author.name;
  post.media = submission.media;
  post.media_metadata = submission.media_metadata;
  post.score = submission.score;
  post.url = "reddit.com" + submission.permalink;

  return post;
}

// Function to get comments for a specific post
async function getCommentsForPost(postId) {
  try {
    // Get the post object using the subreddit name and post ID
    const post = await redditClient.getSubmission(postId).fetch();

    // Fetch comments for the post
    const comments = await post.comments.fetchAll();

    // Extract and return the comment bodies
    return comments.map((comment) => comment.body);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return []; // Return an empty array if there's an error
  }
}

async function searchSubreddits(query) {
  try {
    // Make the API call to search subreddits using the snoowrap client
    const results = await redditClient.searchSubredditNames({ query: query, limit: 10 }); // Limiting to 10 results

    // Extract relevant data from the results
    const subreddits = results.map(subreddit => ({
      name: subreddit.display_name,
      subscribers: subreddit.subscribers,
      description: subreddit.public_description
    }));

    return subreddits;
  } catch (error) {
    console.error('Error searching subreddits:', error);
    return null;
  }
}




module.exports = {
  getHotRedditPosts,
  getCommentsForPost,
  searchSubreddits,
};
