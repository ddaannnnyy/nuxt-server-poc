<template>
    <div>
        callback
    </div>
</template>

<script setup lang="ts">
const url = useRoute();
if (url.query.code) {
    const request = await $fetch('/api/spotify/exchangeCode', { method: 'POST', body: { code: url.query.code } });
    console.log(request);
}
</script>

<style scoped></style>