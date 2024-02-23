<template>
    <h1>🔥🔥Hot Posts on r/{{ subreddit }}</h1>
    <!-- Display the RedditPosts component -->
    <RedditPosts :subreddit="subreddit" />
</template>

<script>
import RedditPosts from '@/containers/reddit-posts.vue';


export default {
    name: 'MultiplePosts',
    components: {
        RedditPosts
    },
    data() {
        return {
            subreddit: null
        };
    },
    beforeRouteEnter(to, from, next) {
        const subreddit = to.params.subreddit;

        console.log('Subreddit:', subreddit);
        next(vm => {
            vm.subreddit = subreddit;
        });
    }
};
</script>
