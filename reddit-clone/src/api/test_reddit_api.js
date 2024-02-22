const getHotRedditPosts = require('./reddit_api');

async function testGetHotRedditPosts() {
    const subreddit = 'aww'; 
    try {
        const hotPosts = await getHotRedditPosts(subreddit);
        console.log('Hot Reddit Posts:');
        console.log(hotPosts);
        
        
    } catch (error) {
        console.error('Error:', error);
    }
}

// Call the test function
testGetHotRedditPosts();
