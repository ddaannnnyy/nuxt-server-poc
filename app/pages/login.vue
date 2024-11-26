<template>
    <div class="w-screen h-screen flex items-center justify-center bg-primary">
        <form action.prevent @submit.prevent="login" class="bg-white rounded flex flex-col gap-2 p-6 w-1/3">
            <h1 class="text-2xl pb-4">Sign In</h1>
            <label for="Username" class="flex flex-col gap-1">
                Email
                <input type="text" name="Username" id="" autocomplete="username" class="border-b px-1"
                    @input="(event) => captureInput('email', event)">
            </label>
            <label for="Password" class="flex flex-col gap-1">
                Password
                <input type="password" name="" id="" autocomplete="current-password" class="border-b px-1"
                    @input="(event) => captureInput('password', event)">
            </label>
            <button class="bg-primary rounded mt-4 p-2">Log In</button>
            <div v-if="errorText" class="w-full">
                <p>{{ errorText }}</p>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
const email = ref('');
const password = ref('');
const errorText = ref(undefined as string | undefined);
const supabase = useSupabaseClient();

async function login() {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value
    });
    if (error) {
        errorText.value = error.message;
    }
    if (data) {
        navigateTo('/');
    }
}
function captureInput(destination: 'email' | 'password', event: any) {
    if (!event && !event.target.value) return;
    switch (destination) {
        case 'email':
            email.value = event.target.value;
            break;
        case 'password':
            password.value = event.target.value;
            break;
        default:
            break;
    }
}
</script>

<style scoped></style>