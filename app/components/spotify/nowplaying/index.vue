<template>
    <div v-if="currentlyPlaying"
        class="w-full flex flex-col items-center justify-center gap-10 h-full z-[999] relative transition-all duration-1000"
        :class="isPlaying ? 'grayscale-0' : 'grayscale'" style="background-size: cover;"
        :style="`background-image:url('${currentlyPlaying.item.album.images[0]?.url}')`">
        <div class="album-art flex items-center justify-center z-20">
            <button @click.prevent="togglePause">
                <img :src="currentlyPlaying.item.album.images[0]?.url" alt=""
                    class="object-contain w-full shadow-2xl shadow-accent transition-transform duration-300 origin-center">
            </button>
        </div>
        <div
            class="album-details bg-background/40 backdrop-blur-3xl rounded-2xl z-20 flex flex-col items-center justify-start w-fit gap-1  text-center p-10 transition-all duration-200">
            <h5 class="text-5xl flex-grow text-white max-w-full">{{ currentlyPlaying.item.name }}</h5>
            <div class="w-full">
                <!-- <p class="text-5xl">{{ currentlyPlaying.item.album.name }}</p> -->
                <p v-for="artist in currentlyPlaying.item.artists" :key="artist.id" class="text-xl text-text">
                    {{ artist.name }}
                </p>
            </div>
            <ClientOnly>
                <div class="w-full bg-secondary h-1 dark:bg-gray-700 transition-opacity duration-300">
                    <div class="bg-text h-full transition-all duration-[1s] ease-linear flex items-center justify-end px-1"
                        :style="`width:${(currentlyPlaying.progress_ms / currentlyPlaying.item.duration_ms) * 100}%`">
                    </div>
                    <p class="text-text text-xs">{{ millisToMinutesAndSeconds(currentlyPlaying.item.duration_ms,
                        currentlyPlaying.progress_ms) }}</p>
                </div>
            </ClientOnly>
        </div>
        <div class="absolute top-0 left-0 w-full h-full backdrop-blur-lg"></div>
    </div>
    <div v-else class="w-full h-full flex items-center justify-center">
        <clock></clock>
    </div>

</template>

<script setup lang="ts">
import type { CurrentlyPlaying } from '~/../types';
const paused = ref(false);

const { currentlyPlaying, isPlaying } = defineProps<
    {
        isPlaying: boolean;
        currentlyPlaying?: CurrentlyPlaying;
        upNext?: any;
    }>();

onMounted(() => {
    paused.value = !currentlyPlaying?.is_playing;
});

watch(() => currentlyPlaying?.is_playing, (newValue, oldValue) => {
    paused.value = oldValue ?? false;
});

function millisToMinutesAndSeconds(durationMS: number, progressMS: number) {
    let millis = durationMS - progressMS;
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return (
        Number(seconds) == 60 ?
            (minutes + 1) + ":00" :
            new Intl.NumberFormat('en-AU', { minimumIntegerDigits: 2 }).format(minutes) + ":" + new Intl.NumberFormat('en-AU', { minimumIntegerDigits: 2 }).format(Number(seconds))
    );
}
function togglePause() {
    console.log('isPaused', paused.value);
    if (paused.value) {
        $fetch('/api/spotify/actions/togglePause', { method: 'PUT', body: { action: 'play' } });
    } else {
        $fetch('/api/spotify/actions/togglePause', { method: 'PUT', body: { action: 'pause' } });

    }
}
</script>

<style scoped>
.album-details {
    font-weight: 300;
}

input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    background: transparent;
    cursor: pointer;
    width: 15rem;
}

input[type="range"]::-webkit-slider-thumb,
input[type="range"]::-moz-range-thumb {
    display: none;
}
</style>