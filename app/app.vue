<template>
  <div>
    <pre>
      {{ data }}
    </pre>
  </div>
</template>

<script setup lang="ts">
const { data } = await useFetch('/api/hello');
</script>

<style scoped></style>