<template>
    <div class="w-full" v-if="Array.isArray(recentlyPlayed) && recentlyPlayed.length > 0">
        <ul>
            <li v-for="track in recentlyPlayed" :key="track.track.id">
                {{ track.track.name }}
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import type { Track } from '~/../types';
const { recentlyPlayed } = defineProps<
    {
        recentlyPlayed?: Track[];
    }>();

</script>

<style scoped></style>