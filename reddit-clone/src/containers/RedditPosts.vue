<template>
  <div>
    <h1>🔥🔥Hot Posts on r/{{ subreddit }}</h1>
    <div class="post-list">
      <post-card v-for="(post, index) in redditPosts" :key="index" :post="post" />
    </div>
  </div>
</template>

<script>

import PostCard from '../components/PostCard.vue';
import getHotRedditPosts from '../api/reddit_api';

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
  data() {
    return {
      redditPosts: []
    };
  },
  async mounted() {
    try {
      this.redditPosts = await getHotRedditPosts(this.subreddit);
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
