<template>
    <div v-if="Array.isArray(spotifyQueue) && spotifyQueue.length > 0">
        <ul>
            <li v-for="queueItem in spotifyQueue" :key="queueItem.id">
                {{ queueItem.name }}
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import type { CurrentlyPlayingQueue } from '@/../types';
const { spotifyQueue } = defineProps<{
    spotifyQueue?: CurrentlyPlayingQueue[];
}>();
</script>

<style scoped></style>