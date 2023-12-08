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
        <span>404</span>
        <span>Not Found</span>
        <button @click="clear">Go Home</button>
    </main>
</template>

<style scoped>
    .main {
        width: 100%;
        color: #fff;
        height: 100vh;
        display: flex;
        padding: 0 2rem;
        position: absolute;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        background-color: #1E1E1E;
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