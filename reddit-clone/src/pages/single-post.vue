<!-- SinglePost.vue -->
<template>
    <div>
      <h1>Single Post</h1>
      <p>Subreddit: {{ subreddit }}</p>
      <p>Post ID: {{ id }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SinglePost',
    props: {
      subreddit: {
        type: String,
        required: true
      },
      id: {
        type: String,
        required: true
      }
    }
  }
  </script>
  