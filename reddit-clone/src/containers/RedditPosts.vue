<template>
  <div>
    <h1>Hot Reddit Posts</h1>
    <div class="post-list">
      <post-card v-for="(post, index) in redditPosts" :key="index" :post="post" />
    </div>
  </div>
</template>

<script>
import PostCard from '../components/PostCard.vue';
import getHotRedditPosts from '../api/reddit_api'; // Assuming getHotRedditPosts.js is in the same directory

export default {
  components: {
    PostCard
  },
  data() {
    return {
      redditPosts: []
    };
  },
  async mounted() {
    try {
      const subreddit = 'aww'; // Replace 'YOUR_SUBREDDIT_NAME' with the subreddit you want to fetch posts from
      this.redditPosts = await getHotRedditPosts(subreddit);
    } catch (error) {
      console.error('Error fetching Reddit posts:', error);
    }
  }
};
</script>

<style scoped>
.post-list {
  display: flex;
  flex-direction: column;
}
</style>
