<script>
import axios from 'axios'

export default {
    data() {
        return {
            slug : '',
            segm : null
        }
    },

    mounted() {
        this.slug = this.$route.fullPath.slice(1)
        this.getContent()
    },

    methods: {
        getContent() {
            const segments = this.slug.split("/")
            this.segm = segments[1]

            axios.get(`http://localhost:4000/api/v1/detail/slug/${segments[1]}`)
            .then((res) => {
                console.log(res.data.data)
            })
            .catch((err) => {
                navigateTo('/')
            })
        }
    }
}
</script>

<template>
    <Head>
        <Title>{{ this.segm }}</Title>
        
        <Meta name="og:title" :content="this.segm" />
        <Meta name="description" :content="this.segm" />
        <Meta name="og:description" :content="this.segm" />

        <Meta name="og:type" content="websitet" />
        <Meta name="og:locale" content="en_US" />
        <Meta name="og:url" content="https://unclesadi.com" />
    </Head>

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