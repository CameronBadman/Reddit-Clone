// main.js
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'

// Import your components for routing
import MultiplePosts from '@/pages/multiple-posts.vue'
import SinglePost from './pages/single-post.vue'

// Define your routes
const routes = [
    { path: '/', redirect: '/programming' }, // Redirect to a default subreddit, change 'programming' to your desired default subreddit
    { path: '/:subreddit', component: () => import(MultiplePosts) }, // Pass :subreddit as prop
    { path: '/post/:subreddit/:id', component: () => import(SinglePost) }, // Route for single post with ID
  ];
  
  

// Create the router instance
const router = createRouter({
  history: createWebHistory(),
  routes
})

// Create the Vue app and use the router
const app = createApp(App)
app.use(Quasar, router, quasarUserOptions)
app.mount('#app')
