const getHotRedditPosts = require('./reddit_api'); 

async function testGetHotRedditPosts() {
    const subreddit = 'aww'; // Replace 'YOUR_SUBREDDIT_NAME' with the subreddit you want to fetch posts from
    try {
        const hotPosts = await getHotRedditPosts(subreddit);
        console.log('Hot Reddit Posts:');
        hotPosts.forEach((post, index) => {
            console.log(`Post ${index + 1}:`);
            console.log(`Title: ${post.title}`);
            console.log(`URL: ${post.url}`);
            console.log(`Score: ${post.score}`);
            console.log(`Number of Comments: ${post.comments_count}`);
            console.log(`Author: ${post.author}`);
            console.log(`Created UTC: ${new Date(post.created_utc * 1000)}`);
            if (post.media) {
                console.log('Media:');
                console.log(`Type: ${post.media.type}`);
                console.log(`URL: ${post.media.url}`);
            }
            console.log('---------------------');
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

// Call the test function
testGetHotRedditPosts();