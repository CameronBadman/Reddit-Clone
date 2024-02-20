const snoowrap = require('snoowrap');

const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjpzS3dsMnlsV0VtMjVmcXhwTU40cWY4MXE2OWFFdWFyMnpLMUdhVGxjdWNZIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNzA4NDg3Nzc3LjI0Mzg1NCwiaWF0IjoxNzA4NDAxMzc3LjI0Mzg1NCwianRpIjoiNHV5aGRHZllXT0VxVGJSRDE0cUlFYXU5a24xaVl3IiwiY2lkIjoicG5sUkdiT1VVY3JKME1td3lVcWdqUSIsImxpZCI6InQyX2l0ZnV5aHh6IiwiYWlkIjoidDJfaXRmdXloeHoiLCJsY2EiOjE2NDI2MzY1NDM5NjksInNjcCI6ImVKeUtWaXBLVFV4UjBsSEt6VThweUM4dUtWYUtCUVFBQVBfX1BuMEdnZyIsInJjaWQiOiJlWTh3VG8zZ3hSSzY4d1VuVVdVR0pjQ3BMOXdmNTU3U2xnUVRoR1JZVzJRIiwiZmxvIjo4fQ.N6j2HQj6bLa-P90UAeTG4S_lY1SLxFmuLOR5iv0ySC3Ebp3eGn7Si1FkW_c32ccCMfRYbo-EGwF350PRwITqSsS-7Sou5y3WyOFkZeTGVom9WcfIzxcglGGOjVKVVvIiZ4trpPDTWlXkURYd8wZL7z53YQO_AYucb_7C5IrA8gFVSlCLycK5sXAwiWal91XjOddyTtNrvrywvOTBoTsuzfR5zkPHzSr8dAT9SEZCoIyO-4Z6Kj8JfvS_tJu49qOZ7l9YH9RA7jzEV1nVTN9l5B2dglHMgRt4gL82rzIlJRVQa4KaYmcWgZCcfqyXjveqg1KVVU9V8yH8tPgU0ueheA' // Set your access token here


async function getHotRedditPosts(subreddit) {
    const redditClient = new snoowrap({
        userAgent: 'api calls', 
        accessToken: token,
    });

    try {
        const subredditObj = await redditClient.getSubreddit(subreddit);
        const hotPosts = await subredditObj.getHot({ limit: 10 }); 

        const hotPostsArray = hotPosts.map(post => {
            let mediaInfo = null;
            if (post.media) {
                if (post.media.type === 'image') {
                    mediaInfo = {
                        type: 'image',
                        url: post.media.content ? post.media.content : post.media.reddit_video.fallback_url
                    };
                } else if (post.media.type === 'video') {
                    mediaInfo = {
                        type: 'video',
                        url: post.media.reddit_video.fallback_url
                    };
                }
            }

            return {
                title: post.title,
                url: post.url,
                score: post.score,
                comments_count: post.num_comments,
                author: post.author.name,
                created_utc: post.created_utc,
                media: mediaInfo
            };
        });

        return hotPostsArray;
    } catch (error) {
        console.error('Error fetching Reddit posts:', error);
        return [];
    }
}

module.exports = getHotRedditPosts;