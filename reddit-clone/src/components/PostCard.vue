<template>
    <div class="post-card">
      <h3>{{ post.title }}</h3>
      <p>Score: {{ post.score }}</p>
      <p>Number of Comments: {{ post.comments_count }}</p>
      <p>Author: {{ post.author }}</p>
      <div v-if="post.media">
        <p>Media Type: {{ post.media.type }}</p>
        <p>Media URL: {{ post.media.url }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      post: {
        type: Object,
        required: true
      }
    }
  };
  </script>
  
  <style scoped>
  .post-card {
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid #ccc;
  }
  </style>
  