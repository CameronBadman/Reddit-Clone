<template>
    <q-card class="post-card" :style="{ height: commentSectionExpanded ? 'auto' : 'inherit' }"
            @click="toggleCommentSection">
      <div class="post-content" @mouseenter="showHover" @mouseleave="hideHover">
        <div class="text-content">
          <PostMetadata :post="post" />
          <div v-if="hovered" class="hover-highlight">
            <q-icon name="arrow_downward" class="arrow-icon" @click.stop="toggleCommentSection" />
          </div>
        </div>
        <q-card-section class="image-section">
          <template v-if="post.thumbnail !== 'self' && (post.thumbnail || post.media_metadata || post.media)">
            <MediaDisplay :media="{
              'thumbnail': post.thumbnail,
              'media_metadata': post.media_metadata,
              'media': post.media
            }" />
          </template>
        </q-card-section>
      </div>
      <!-- Comment section -->
      <transition name="fade">
        <CommentSection v-if="commentSectionExpanded" :postId="post.id" />
      </transition>
    </q-card>
  </template>
  
  <script>
  import MediaDisplay from './PostCard_Componants/media-display.vue';
  import CommentSection from './PostCard_Componants/comment-section.vue';
  import PostMetadata from './PostCard_Componants/post-metadata.vue';
  
  export default {
    components: {
      MediaDisplay,
      CommentSection,
      PostMetadata // Register the PostMetadata component
    },
    props: {
      post: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        hovered: false,
        commentSectionExpanded: false
      };
    },
    methods: {
      showHover() {
        this.hovered = true;
      },
      hideHover() {
        this.hovered = false;
      },
      toggleCommentSection() {
        this.commentSectionExpanded = !this.commentSectionExpanded;
      }
    }
  };
  </script>
  
  <style scoped>
  .post-card {
    margin-bottom: 20px;
    border: 1px solid #ccc;
    position: relative;
    overflow: hidden;
  }
  
  .post-content {
    display: flex;
  }
  
  .text-content {
    flex: 1;
  }
  
  .hover-highlight {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: rgba(50, 50, 50, 0.9);
    padding: 5px 0;
    text-align: center;
    cursor: pointer;
    z-index: 999;
  }
  
  .arrow-icon {
    font-size: 24px;
    color: #fff;
  }
  
  .comment-section {
    padding: 10px;
    background-color: #f9f9f9;
    border-top: 1px solid #ddd;
    overflow: hidden;
    background-color: #f9f9f9;
    padding: 10px;
    border-top: 1px solid #ddd;
    transition: all 0.3s ease;
  }
  </style>
  