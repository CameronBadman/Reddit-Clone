<template>
  <div class="post-card">
    <h3>{{ post.title }}</h3>
    <p>Score: {{ post.score }}</p>
    <p>Number of Comments: {{ post.comments_count }}</p>
    <p>Author: {{ post.author }}</p>
    <div>
      <div v-if="post.url">
        <p>Media Type: {{ getMediaType(post.url) }}</p>
        <div v-if="isImage(post.url)">
          <img class="media" :src="post.url" alt="Post Image" />
        </div>
        <div v-else-if="isVideo(post.url)">
          <video class="media" controls :src="post.url" alt="Post Video"></video>
        </div>
        <div v-else>
          <p>No media available for this post</p>
        </div>
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
    getMediaType(url) {
      if (this.isImage(url)) {
        return 'image';
      } else if (this.isVideo(url)) {
        return 'video';
      } else {
        return 'unknown';
      }
    },
    isImage(url) {
      // Check if the URL ends with common image extensions
      return /\.(jpeg|jpg|gif|png)$/i.test(url);
    },
    isVideo(url) {
      // Check if the URL ends with common video extensions
      return /\.(mp4|webm|ogg)$/i.test(url);
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

.media {
  max-width: 100%;
  height: auto;
}
</style>
