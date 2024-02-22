const snoowrap = require('snoowrap');


const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjpzS3dsMnlsV0VtMjVmcXhwTU40cWY4MXE2OWFFdWFyMnpLMUdhVGxjdWNZIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNzA4NjEwODM0LjE0ODU2MiwiaWF0IjoxNzA4NTI0NDM0LjE0ODU2MiwianRpIjoiZjVkOFlWRDJiZURiRkVGYWdWUjVTZzB3MTZJRFZRIiwiY2lkIjoicG5sUkdiT1VVY3JKME1td3lVcWdqUSIsImxpZCI6InQyX2l0ZnV5aHh6IiwiYWlkIjoidDJfaXRmdXloeHoiLCJsY2EiOjE2NDI2MzY1NDM5NjksInNjcCI6ImVKeUtWaXBLVFV4UjBsRXF6OHpPQkROakFRRUFBUF9fUGdVR1dRIiwiZmxvIjo4fQ.caDEn6w4T7ijUY7ESx2uD5UbApqdALmiv0vifHMACWnldgbiwH0PVGC4yTzRcyetbuR8UepgXHNbSvFngbhk0w_v1oqTpcXYLyauZ9Re_vOmgaOh07OE41L6N_08FmEyMz9eFM40ui7Sc2eTdcu-EMxF9GaPNG-mz1XMchTENWebZ3Pv-0-pPOSTS2YPhAN29FqmLhXeePt9r5A94nI3O1JVA9fwQUbnqh3vlSKTKG0RJbiO-AUycGBRtBAHxc8eGxHjC5ryf5waZoXlyd7TUTzNAVtNToQW3oYJw5a5P8RAigmUA5gxeT1SE8CwAxhOxQQshS6V64ybJjEAILZAsw';


const redditClient = new snoowrap({
    userAgent: 'api calls', 
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

    return postsInRange.map(post => extractPostInfo(post));
      
  } catch (error) {
    console.error('Error fetching Reddit posts:', error);
    return [];
  }
}






function extractPostInfo(submission) {
    let post = Object()
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
      return comments.map(comment => comment.body);
    } catch (error) {
      console.error('Error fetching comments:', error);
      return []; // Return an empty array if there's an error
    }
  }


module.exports = (getHotRedditPosts, getCommentsForPost);















module.exports = (getHotRedditPosts);