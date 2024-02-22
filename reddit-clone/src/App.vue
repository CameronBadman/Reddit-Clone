<template>
  <q-layout view="hhh LpR fFf">

    <q-header reveal bordered class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          Reddit Clone
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" behavior="desktop" bordered>
      <!-- drawer content -->
      <SubredditSearchBar :leftDrawerOpen="leftDrawerOpen" :replaceRedditPosts="replaceRedditPosts" />
    </q-drawer>

    <q-page-container>
      <router-view />
      <RedditPosts :subreddit="currentSubreddit" :key="redditPostsKey" /> <!-- Add a unique key to force recreation -->
    </q-page-container>

    <q-footer bordered class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script>
import { ref } from 'vue'
import RedditPosts from './containers/RedditPosts.vue';
import SubredditSearchBar from './containers/SubredditSearch.vue'; // Import the SubredditSearchBar component

export default {
  components: {
    RedditPosts,
    SubredditSearchBar // Register the SubredditSearchBar component
  },

  setup () {
    const leftDrawerOpen = ref(false)
    const currentSubreddit = ref('aww');
    const redditPostsKey = ref(0); // Reactive variable to force recreation of RedditPosts component

    const replaceRedditPosts = (newSubreddit) => {
      currentSubreddit.value = newSubreddit;
      redditPostsKey.value += 1; // Increment the key to force recreation of RedditPosts component
    }

    return {
      leftDrawerOpen,
      currentSubreddit, // Expose currentSubreddit ref
      redditPostsKey, // Expose redditPostsKey ref
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      replaceRedditPosts
    }
  }
}
</script>
