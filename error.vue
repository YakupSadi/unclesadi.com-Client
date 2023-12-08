<script setup>
defineProps(['error'])

const clear = () => {
    clearError({
        redirect: '/'
    })
}
</script>

<template>
    <Head>
        <Title>404</Title>    
    </Head>

    <main class="main">
        <span>{{ error.statusCode }}</span>
        <span>{{ error.message }}</span>

        <button @click="clear">Go Home</button>
    </main>
</template>

<style scoped>
    .main {
        color: #fff;
        height: 100vh;
        display: flex;
        padding: 0 2rem;
        align-items: center;
        flex-direction: column;
        justify-content: center;
    }
    .main > span:nth-child(1) {
        font-size: 5rem;
    }
    .main > span:nth-child(2) {
        width: 100%;
        font-size: 1.5rem;
        text-align: center;
    }
    .main > button {
        margin-top: 2rem;
        padding: .5rem 1rem;
        border: 3px solid #fff;
    }
</style>