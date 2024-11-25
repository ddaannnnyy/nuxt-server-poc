<template>
    <div class="min-h-screen min-w-screen overflow-hidden flex flex-col">
        <div class="flex-grow">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
useHead({
    meta: [
        { name: 'apple-mobile-web-app-capable', content: 'yes' }
    ],
});
</script>

<style scoped></style>