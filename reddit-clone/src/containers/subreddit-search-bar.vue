<template>
    <div>
        <q-input outlined v-model="searchQuery" placeholder="Search subreddits"></q-input>
        <q-btn @click="search">Search</q-btn>
        <div v-if="loading">Loading...</div>

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
import { router } from './../routing'

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
                // Update route with the searchQuery
                await router.push(this.searchQuery);
                window.location.reload()
            } catch (error) {
                console.error('Error searching subreddits:', error);
            } finally {
                this.loading = false;
            }
        },
        navigateToSubreddit(subredditName) {
            // Navigation logic to navigate to the subreddit
        }
    }
};
</script>

<style scoped>
/* Add your component-specific styles here */
</style>
