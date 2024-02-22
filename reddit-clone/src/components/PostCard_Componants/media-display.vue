<template>
    <div>
        <q-carousel class="media-carousel" animated v-model="slide" arrows navigation infinite>
            <template v-if="imageUrls.length > 0">
                <q-carousel-slide v-for="(image, index) in imageUrls" :key="index" :name="index" :img-src="image.url" />
            </template>
            <template v-else-if="videoUrl">
                <!-- Placeholder for the video slide -->
                <q-carousel-slide :name="1" :img-src="getSafeUrl(placeholderImage)" @click="openVideo" />
            </template>
            <template v-else>
                <!-- Placeholder for no images or video -->
                <q-carousel-slide :name="1" :img-src="media.thumbnail" />
            </template>
        </q-carousel>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    props: {
        media: {
            type: Object,
            required: true
        }
    },
    setup(props) {
        const slide = ref(1);
        const imageUrls = extractImageUrls(props.media);
        let videoUrl = null;

        // Check if reddit_video exists and set the video URL
        if (props.media.media && props.media.media.reddit_video) {
            videoUrl = getSafeUrl(props.media.media.reddit_video);
        }

        // Placeholder image for video slide
        const placeholderImage = videoUrl ? props.media.thumbnail : null;



        // Function to open the video
        const openVideo = () => {
            if (videoUrl) {
                // Open the video using the videoUrl
                window.open(videoUrl, '_blank');
            }
        };
        return {
            slide,
            imageUrls,
            videoUrl,
            placeholderImage,
            openVideo,
            getSafeUrl
        };
    }
};

// Function to safely access properties within nested proxy objects
function getSafeUrl(obj) {
    if (obj && typeof obj === 'object' && Object.prototype.hasOwnProperty.call(obj, 'url')) {
        return obj.url;
    }
    return null;
}

function extractImageUrls(media) {
    const imageUrls = [];
    if (media && media.media_metadata) {
        const metadata = media.media_metadata;
        console.log(metadata);
        for (const key in metadata) {
            if (Object.prototype.hasOwnProperty.call(metadata, key)) {
                const image = metadata[key];

                if (image && image.s && image.s.u) {
                    imageUrls.push({ url: image.s.u });
                }
            }
        }
    }
    return imageUrls;
}
</script>

<style scoped>
.media-carousel {
    width: 600px;
    height: 500px;
}
</style>
