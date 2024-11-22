<template>
    <div class="w-screen h-screen flex items-center justify-center bg-black">
        <div class="h-full aspect-[4/3] bg-background rounded-2xl text-black relative z-20 overflow-hidden">
            <SpotifyNamespan :text="`${currentlyPlaying?.item.name} - ${currentlyPlaying?.item.artists[0]?.name}`"
                :playing="isPlaying ?? false" />
            <ClientOnly>
                <SpotifyNowplaying :currently-playing="currentlyPlaying" :is-playing="isPlaying ?? false" />
            </ClientOnly>
            <div class="absolute w-full h-full top-0 left-[50%] scale-50">
                <SpotifyUpnext :up-next="spotifyQueue[0]" :is-playing="isPlaying ?? false" />
            </div>
            <!-- <SpotifyRecentlyplayed :recently-played="recentlyPlayed" />
            <SpotifyQueue :spotify-queue="spotifyQueue" /> -->
        </div>
    </div>
</template>

<script setup lang="ts">
import type { CurrentlyPlaying, Track, CurrentlyPlayingQueue } from '@/../types';
const recentlyPlayed = ref<Track[]>([]);
const currentlyPlaying = ref<CurrentlyPlaying>();
const spotifyQueue = ref<CurrentlyPlayingQueue[]>([]);
const isPlaying = ref(false);

// initial hydration and set the interval
await getCurrentlyPlaying();
getQueue();
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
        console.log('fetching queue');
        getQueue();
    }
})

</script>

<style scoped>
* {
    font-family: "Saira", Arial, Helvetica, sans-serif;
}
</style>