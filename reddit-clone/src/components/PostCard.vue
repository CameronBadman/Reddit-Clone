<template>
  <q-card class="post-card" @click="expandCard">
    <div class="post-content" @mouseenter="showHover" @mouseleave="hideHover">
      <div class="text-content">
        <q-item>
          <q-item-section>
            <q-item-label class="text-h6">{{ post.title }}</q-item-label>
            <q-item-label class="text-body">Number of Comments: {{ post.num_comments }}</q-item-label>
            <q-item-label class="text-body">Author: {{ post.author }}</q-item-label>
            <q-item-label v-if="post.content" class="text-body">{{ post.content }}</q-item-label>
            <q-item-label  class="text-body">{{ post.url }}</q-item-label>
          </q-item-section>
        </q-item>
        <div v-if="hovered" class="hover-highlight">
          <q-icon name="arrow_downward" class="arrow-icon" @click.stop="expandCard"/>
        </div>
      </div>
      <q-card-section class="image-section">
        <template v-if="post.thumbnail !== 'self' && (post.thumbnail || post.media_metadata || post.media)">
          <MediaDisplay :media="{
            'thumbnail': post.thumbnail,
            'media_metadata': post.media_metadata, 
            'media': post.media
          }"/>
        </template>
      </q-card-section>
    </div>
  </q-card>
</template>

<script>
import MediaDisplay from '@/components/MediaDisplay.vue'; 

export default {
  components: {
    MediaDisplay 
  },
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      hovered: false
    };
  },
  methods: {
    showHover() {
      this.hovered = true;
    },
    hideHover() {
      this.hovered = false;
    },
    expandCard() {
      // Implement the logic to expand the card
      // For example, emit an event to notify the parent component
      this.$emit('expand');
    }
  }
};
</script>

<style scoped>
.post-card {
  margin-bottom: 20px;
  border: 1px solid #ccc;
  position: relative; /* Required for absolute positioning of hover highlight */
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
  background-color: rgba(50, 50, 50, 0.9); /* Dark grey color */
  padding: 5px 0;
  text-align: center;
  cursor: pointer;
  z-index: 999; /* Higher z-index to make it appear above other elements */
}

.arrow-icon {
  font-size: 24px;
  color: #fff; /* White color for arrow icon */
}

</style>
