<script>
import axios from 'axios'

export default {
    data() {
        return {
            slug: ''
        }
    },

    mounted() {
        this.slug = this.$route.fullPath.slice(1)
        this.getContent()
    },

    methods: {
        getContent() {
            const segments = this.slug.split("/")

            axios.get(`http://localhost:4000/api/v1/detail/slug/${segments[1]}`)
            .then((res) => {
                console.log(res.data.data)
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
        {{ slug }}
    </main>    
</template>

<style scoped>
    .index {
        max-width: 100rem;
        padding: 6rem 2rem 2rem;
        min-height: var(--index-height);
    }
</style>