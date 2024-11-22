<template>
    <div class="w-full flex flex-col absolute top-0 left-0">
        <div v-if="text != undefined" class="marquee w-full h-min z-0 overflow-hidden flex flex-row" aria-hidden>
            <ul class="marquee__content animate">
                <li class="text-secondary">{{ playing ? text : 'paused' }}</li>
                <li class="text-secondary">{{ playing ? text : 'paused' }}</li>
                <li class="text-secondary">{{ playing ? text : 'paused' }}</li>
            </ul>
            <ul class="marquee__content animate">
                <li class="text-secondary">{{ playing ? text : 'paused' }}</li>
                <li class="text-secondary">{{ playing ? text : 'paused' }}</li>
                <li class="text-secondary">{{ playing ? text : 'paused' }}</li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
const { text } = defineProps<{
    text?: string;
    playing?: boolean;
}>();
</script>

<style scoped>
.marquee {
    --gap: 5rem;
    display: flex;
    overflow: hidden;
    user-select: none;
    gap: var(--gap);
}

.marquee__content {
    font-size: 7vw;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.4);
    flex-shrink: 0;
    display: flex;
    justify-content: space-around;
    min-width: 100%;
    gap: var(--gap);
}

.animate {
    animation: scroll 30s linear infinite;
}

@keyframes scroll {
    from {
        transform: translateX(0);
    }

    to {
        transform: translateX(calc(-100% - var(--gap)));
    }
}
</style>