<!-- App.vue -->
<template>
  <div>
    <!-- Layout structure for entire app -->
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
          <!-- Search bar component -->
          
        </q-toolbar>
      </q-header>
      <q-drawer show-if-above v-model="leftDrawerOpen" side="left" behavior="desktop" bordered>
        <SubredditSearchBar :left-drawer-open="leftDrawerOpen" :replace-reddit-posts="replaceRedditPosts" />
        <!-- Drawer content -->
      </q-drawer>

      <q-page-container>
        <router-view />
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
  </div>
</template>

<script>
import { ref } from 'vue'
import SubredditSearchBar from './containers/subreddit-search-bar.vue'
export default {
  setup() {
    const leftDrawerOpen = ref(false)

    const toggleLeftDrawer = () => {
      leftDrawerOpen.value = !leftDrawerOpen.value
    }

    // Function to replace reddit posts
    const replaceRedditPosts = () => {
      // Implement logic to replace reddit posts
    }

    return {
      leftDrawerOpen,
      toggleLeftDrawer,
      replaceRedditPosts
    }
  },
  components: {
    SubredditSearchBar  
  }
}
</script>
