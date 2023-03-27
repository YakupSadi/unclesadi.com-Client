<script>
import axios  from 'axios'
import Folder from '~/components/index/folder.vue';


definePageMeta({
    layout: 'custom',
})


export default {
    components: {
        Folder
    },
    
    data() {
        return {
            folders: null
        }
    },
    
    mounted() {
        this.getAllFolder()
    },

    methods: {
        getAllFolder() {
            axios.get('http://localhost:4000/api/v1/folder')
            .then((res) => {
                this.folders = res.data.data
            })
            .catch((err) => {
                console.log(err)
            })
        },
    }
}
</script>

<template>
    <Head>
        <Title>Uncle Sadi</Title>
        
        <Meta name="og:title" content="this.slug" />
        <Meta name="description" content="this.slug" />
        <Meta name="og:description" content="this.slug" />

        <Meta name="og:type" content="websitet" />
        <Meta name="og:locale" content="en_US" />
        <Meta name="og:url" content="https://unclesadi.com" />
    </Head>

    <main class="index">
        <Folder 
            v-for="(folder, index) in this.folders"
            :key        = "index"
            :id         = "folder._id"
            :title      = "folder.title"
            :background = "folder.background"
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