<template>
    <div class="w-full h-full flex flex-col items-center justify-center">
        <Transition>
            <div class="w-full flex items-start justify-evenly relative" ref="wrapper">
                <span v-for="(digit, index) in timeArray" :key="index"
                    class="text-white text-center align-top time-wrapper text-[20vh] w-[2em]">{{
                        digit
                    }}</span>
            </div>
        </Transition>
        <button class="bg-primary p-8 rounded-full text-4xl" @click="startMusic">Start Music</button>
    </div>
</template>

<script setup lang="ts">
const timeArray = ref([] as string[]);
const wrapper = ref(null);
const formatted = useDateFormat(useNow(), 'HH:mm:ss');
watch(() => formatted.value, (newValue, oldValue) => {
    timeArray.value = Array.from(formatted.value);
});

function startMusic() {
    $fetch('/api/spotify/actions/togglePause', { method: 'PUT', body: { action: 'play' } });
}



</script>

<style scoped>
.time-wrapper {
    font-family: "Jersey 15", monospace;
}

.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>