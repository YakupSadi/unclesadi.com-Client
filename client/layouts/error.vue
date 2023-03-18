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
    
    <main>
        {{ error.statusCode }}
        {{ error.message }}
        <button @click="clear">Go Home</button>
    </main>
</template>

<style scoped>

</style>