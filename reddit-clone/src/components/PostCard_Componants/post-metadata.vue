<template>
    <div class="post-metadata">
      <q-item>
        <q-item-section>
          <q-item-label class="text-h6">{{ post.title }}</q-item-label>
          <q-item-label class="text-body">Number of Comments: {{ post.num_comments }}</q-item-label>
          <q-item-label class="text-body">Author: {{ post.author }}</q-item-label>
          <q-item-label class="text-body">{{ post.url }}</q-item-label>
          <q-item-label v-if="post.content" class="text-body">{{ post.content }}</q-item-label>
        </q-item-section>
      </q-item>
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
  .post-metadata {
    padding: 20px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
  }
  </style>
  