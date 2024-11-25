<template>
    <div>
        Login
    </div>
</template>

<script setup lang="ts">
onMounted(async () => {
    const request = await $fetch('/api/spotify/authenticate');
    if (request.url) {
        navigateTo(request.url, { external: true });
    }
});
</script>

<style scoped></style>