<template>
    <div class="w-screen h-screen flex items-center justify-center">
        <div class="h-full w-full bg-background  text-black relative z-20 overflow-hidden">
            <ClientOnly>
                <SpotifyNowplaying :key="nowPlayingKey" :currently-playing="currentlyPlaying"
                    :is-playing="isPlaying ?? false" />
            </ClientOnly>
            <!-- <SpotifyRecentlyplayed :recently-played="recentlyPlayed" />
            <SpotifyQueue :spotify-queue="spotifyQueue" /> -->
        </div>
    </div>
</template>

<script setup lang="ts">
import type { CurrentlyPlaying, Track, CurrentlyPlayingQueue } from '@/../types';
const recentlyPlayed = ref<Track[]>([]);
const currentlyPlaying = ref<CurrentlyPlaying | undefined>(undefined);
const spotifyQueue = ref<CurrentlyPlayingQueue[]>([]);
const isPlaying = ref(false);
const nowPlayingKey = ref("0");

// initial hydration and set the interval
await getCurrentlyPlaying();
onNuxtReady(() => {
    setInterval(async () => {
        await getCurrentlyPlaying();
    }, 1000);
});

async function getCurrentlyPlaying() {
    const request = await $fetch('/api/spotify/nowplaying');
    if (request.currentlyPlaying) {
        currentlyPlaying.value = request.currentlyPlaying;
        isPlaying.value = request.currentlyPlaying.is_playing;
    }
}

async function getQueue() {
    const request = await $fetch('/api/spotify/getqueue');
    if (request.queue) {
        spotifyQueue.value = request.queue;
    }
}

watch(() => currentlyPlaying.value, (newValue, oldValue) => {
    if (newValue?.item.id != oldValue?.item.id) {
        nowPlayingKey.value = crypto.randomUUID();
    }
})

</script>

<style scoped>
* {
    font-family: "Saira", Arial, Helvetica, sans-serif;
}
</style>