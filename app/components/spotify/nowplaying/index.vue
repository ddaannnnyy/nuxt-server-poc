<template>
    <div v-if="currentlyPlaying"
        class="w-full flex flex-col items-center justify-center gap-10 h-full z-[999] relative rounded-xl transition-all duration-1000"
        :class="isPlaying ? 'grayscale-0' : 'grayscale'" style="background-size: cover;"
        :style="showDetails ? '' : `background-image:url('${currentlyPlaying.item.album.images[0]?.url}')`">
        <div class="album-art flex items-center justify-center z-20">
            <img :src="currentlyPlaying.item.album.images[0]?.url" alt=""
                class="object-contain w-4/6 shadow-2xl shadow-accent transition-transform duration-300 origin-center"
                :class="showDetails ? 'translate-y-0' : 'translate-y-10 scale-150'"
                @click.prevent="showDetails = !showDetails">
        </div>
        <div class="album-details flex flex-col items-center justify-start w-fit gap-1  text-center p-6 transition-all duration-200"
            :class="showDetails ? 'translate-y-0' : '-translate-y-10 opacity-0'">
            <h5 class="text-7xl flex-grow text-accent max-w-full">{{ currentlyPlaying.item.name }}</h5>
            <div class="w-full">
                <!-- <p class="text-5xl">{{ currentlyPlaying.item.album.name }}</p> -->
                <p v-for="artist in currentlyPlaying.item.artists" :key="artist.id" class="text-4xl text-text">
                    {{ artist.name }}
                </p>
            </div>
        </div>
        <ClientOnly>
            <div class="w-full bg-secondary h-10 dark:bg-gray-700 fixed bottom-0 transition-opacity duration-300"
                :class="showDetails ? 'opacity-100' : 'opacity-0'">
                <div class="bg-accent h-full transition-all duration-[1s] ease-linear flex items-center justify-end px-1"
                    :style="`width:${(currentlyPlaying.progress_ms / currentlyPlaying.item.duration_ms) * 100}%`">
                    <p class="text-text">{{ millisToMinutesAndSeconds(currentlyPlaying.item.duration_ms,
                        currentlyPlaying.progress_ms) }}</p>
                </div>
            </div>
        </ClientOnly>
        <div v-if="!showDetails" class="absolute top-0 left-0 w-full h-full backdrop-blur-lg"></div>
    </div>
    <div v-else class="w-full"></div>

</template>

<script setup lang="ts">
import type { CurrentlyPlaying } from '~/../types';

const { currentlyPlaying, isPlaying } = defineProps<
    {
        isPlaying: boolean;
        currentlyPlaying?: CurrentlyPlaying;
        upNext?: any;
    }>();

const showDetails = ref(true);

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