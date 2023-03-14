<script>
import axios from 'axios'

export default {
    layout: 'default',
    
    data() {
        return {
            slug: '',
            slugList: null
        }
    },

    mounted() {
        this.slug = this.$route.fullPath.slice(1),
        this.getContent()
    },

    methods: {
        getContent() {
            axios.get(`http://localhost:4000/api/v1/content/slug/${this.slug}`)
            .then((res) => {
                console.log(res.data.data[0])
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }
}
</script>

<template>
    <main class="index">
        <NuxtLink :to="slug">
            {{ slug }}
        </NuxtLink>
    </main>    
</template>

<style scoped>
    .index {
        max-width: 100rem;
        padding: 6rem 2rem 2rem;
        min-height: var(--index-height);
    }
</style>