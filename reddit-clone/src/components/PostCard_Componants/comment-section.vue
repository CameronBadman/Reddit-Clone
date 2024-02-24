<template>
    <div class="comment-section">
      <div v-if="loading" class="loading">Loading comments...</div>
      <div v-else-if="error" class="error">Error fetching comments. Please try again later.</div>
      <div v-else>
        <div v-for="(comment, index) in comments" :key="index" class="comment">
          <div v-for="(part, partIndex) in splitComment(comment)" :key="partIndex" class="comment-part">
            <span>{{ part }}</span>
            <br /> <!-- Add line break for readability -->
          </div>
          <hr /> <!-- Add horizontal line to separate comments -->
        </div>
      </div>
    </div>
  </template>
  
  <script>
  // Import the Reddit API function
  import { getCommentsForPost } from '@/api/reddit_api'; // Update the correct path to your reddit-api module
  
  export default {
    props: {
      postId: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        comments: [],
        loading: true,
        error: false
      };
    },
    async created() {
      try {
        // Fetch comments for the post using the provided postId
        this.comments = await getCommentsForPost(this.postId);
        this.loading = false;
      } catch (error) {
        console.error("Error fetching comments:", error);
        this.loading = false;
        this.error = true;
      }
    },
    methods: {
      splitComment(comment) {
        // Split the comment based on a delimiter (e.g., period, comma, newline, etc.)
        // Adjust the delimiter based on your comment structure
        return comment.split('.'); // Splitting by period for example
      }
    }
  };
  </script>
  
  <style scoped>
  .comment-section {
    padding: 20px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
  }
  
  .loading {
    color: #333;
  }
  
  .error {
    color: red;
  }
  
  .comment {
    margin-bottom: 20px;
  }
  
  .comment-part {
    margin-bottom: 10px;
  }
  </style>
  