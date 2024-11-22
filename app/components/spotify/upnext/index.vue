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
                <p v-for="artist in upNext.artists" :key="artist.id" class="text-xl text-text">
                    {{ artist.name }}
                </p>
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
</script>

<style scoped></style>