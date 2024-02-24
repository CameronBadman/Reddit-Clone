<template>
    <div>
        <div class="post-list">
            <q-infinite-scroll @load="loadMorePosts">
                <template v-slot:loading>
                    <div class="text-center">Loading more posts...</div>
                </template>

                <div v-for="(post, index) in redditPosts" :key="index" class="post-card">
                    <post-card :post="post" />
                </div>
            </q-infinite-scroll>
        </div>
    </div>
</template>

<script>
import PostCard from '../components/post-card.vue';
import { getHotRedditPosts } from '../api/reddit_api';
import { ref } from 'vue';

export default {
    props: {
        subreddit: {
            type: String,
            required: true
        }
    },
    components: {
        PostCard
    },

    mounted() {
        console.log('Subreddit:', "test");
    },

    setup(props) {
        const redditPosts = ref([]);
        let loading = false; // Flag to prevent multiple concurrent requests



        const loadMorePosts = async (index, done) => {
            if (loading) return; // Prevent concurrent requests
            try {
                loading = true; // Set loading flag

                // Calculate start index based on the current length of redditPosts
                const start = redditPosts.value.length;
                const end = start + 5; // Assuming each page fetches 5 more posts

                // Fetch more posts from the API within the range defined by start and end
                const newPosts = await getHotRedditPosts(props.subreddit, start, end);
                redditPosts.value = [...redditPosts.value, ...newPosts];
            } catch (error) {
                console.error('Error fetching Reddit posts:', error);
            } finally {
                loading = false; // Reset loading flag
                done();
            }
        };



        return {
            redditPosts,
            loadMorePosts
        };
    }
};



</script>

<style scoped>
.post-list {
    display: flex;
    flex-direction: column;
}

.post-card {
    margin-bottom: 10px;
    /* Adjust spacing between posts */
}
</style>
