<template>
  <div class="post-card">
    <div class="post-content">
      <h3>{{ post.title }}</h3>
      <p>Score: {{ post.score }}</p>
      <p>Number of Comments: {{ post.comments_count }}</p>
      <p>Author: {{ post.author }}</p>
    </div>
    <div class="media-container">
      <div v-if="post.url && isImage(post.url)">
        <img class="media" :src="post.url" alt="Post Image" />
      </div>
      <div v-else>
        <img class="media" src="/NoImage.jpeg" alt="No Image Available" />
      </div>
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
  },
  methods: {
    isImage(url) {
      // Check if the URL ends with common image extensions
      return /\.(jpeg|jpg|gif|png)$/i.test(url);
    }
  }
};
</script>

<style scoped>
.post-card {
  display: flex; /* Use flexbox layout */
  align-items: flex-start; /* Align items to the start of the flex container */
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
}

.post-content {
  flex: 1; /* Allow the content to take up remaining space */
}

.media-container {
  margin-left: 10px; /* Add some space between content and image */
}

.media {
  max-width: 150px; /* Limit the width of the image */
  height: auto;
}
</style>
