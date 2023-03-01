<script>
import Folder from '~/components/index/folder.vue';

definePageMeta({
    layout: 'custom',
})

export default {
    components: {
        Folder
    }
}
</script>

<template>
    <main class="index">
        <Folder 
            v-for="n in 14" 
            :key="n"
        />
    </main>    
</template>

<style scoped>
    .index {
        display: flex;
        flex-wrap: wrap;
        max-width: 100rem;
        flex-direction: row;
        padding: 6rem 2rem 2rem;
        justify-content: space-evenly;
        min-height: var(--index-height);
    }
</style>