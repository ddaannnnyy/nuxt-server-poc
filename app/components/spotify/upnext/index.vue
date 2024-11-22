<template>
    <div v-if="upNext"
        class=" w-4/6 flex flex-col items-center justify-center gap-3 p-3 h-full z-[999] relative rounded-xl opacity-50"
        :class="isPlaying ? 'opacity-100' : 'opacity-30'">
        <div class="album-art -mt-8 flex items-center justify-center">
            <img :src="upNext.album.images[0]?.url" alt="" class="object-contain shadow-2xl w-full">
        </div>
        <div class="album-details flex flex-col items-start justify-start w-full gap-1  text-left">
            <h5 class="text-3xl flex-grow text-text">{{ upNext.name }}</h5>
            <div class="w-full">
                <!-- TODO remove this when i've confirmed the string list works correctly -->
                <!-- <p v-for="artist in upNext.artists" :key="artist.id" class="text-xl text-text">
                    {{ artist.name }}
                </p> -->
                <p class="text-xl text-text">{{ artistNamesList }}</p>
            </div>
        </div>
    </div>
    <div v-else class="w-full"></div>
</template>

<script setup lang="ts">
import type { CurrentlyPlayingQueue } from '~/../types';

const { upNext, isPlaying } = defineProps<
    {
        isPlaying: boolean;
        upNext?: CurrentlyPlayingQueue;
    }>();

const artistNames = ref<string[]>([]);
const artistNamesList = ref<string>('');

onMounted(() => {
    if (!upNext?.artists) return;
    if (upNext.artists.length < 1) return upNext.artists[0]?.name ?? '';
    upNext.artists.map((artist) => {
        artistNames.value.push(artist.name);
    });

    // Parses the list of artists into a human readable list. i.e. Ike and Tina, X, Y, and Z
    artistNamesList.value = new Intl.ListFormat('en-AU', {
        style: 'long',
        type: 'conjunction',
    }).format(artistNames.value);
});
</script>

<style scoped></style>