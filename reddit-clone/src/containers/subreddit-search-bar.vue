<template>
  <div>
    <q-input outlined v-model="searchQuery" placeholder="Search subreddits"></q-input>
    <q-btn @click="search">Search</q-btn>
    <div v-if="loading">Loading...</div>
    <div v-else-if="subreddits !== null && subreddits.length === 0">No subreddits found</div>
    <div v-else>
      <div v-for="subreddit in subreddits" :key="subreddit.name">
        <h3 @click="navigateToSubreddit(subreddit.name)" style="cursor: pointer;">{{ subreddit.name }}</h3>
        <p>{{ subreddit.description }}</p>
        <p>Subscribers: {{ subreddit.subscribers }}</p>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { searchSubreddits } from '../api/reddit_api';

export default {
  name: 'SubredditSearchBar',
  props: {
    leftDrawerOpen: Boolean,
    replaceRedditPosts: Function // Modify the prop to receive replaceRedditPosts directly
  },
  data() {
    return {
      searchQuery: '',
      subreddits: [],
      loading: false
    };
  },
  methods: {
    async search() {
      if (!this.searchQuery) return;

      this.loading = true;
      try {
        const results = await searchSubreddits(this.searchQuery);
        this.subreddits = results;

        // Call replaceRedditPosts with the searchQuery value
        this.replaceRedditPosts(this.searchQuery);
      } catch (error) {
        console.error('Error searching subreddits:', error);
      } finally {
        this.loading = false;
      }
    },
  }
};
</script>

<style scoped>
/* Add your component-specific styles here */
</style>