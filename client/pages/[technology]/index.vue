<script>
import axios from 'axios'
import { mapState } from 'vuex'
import Error from '../../components/error.vue'

export default {
    components: {
        Error
    },

    data() {
        return {
            slug  : '',
            error : false
        }
    },

    mounted() {
        this.slug = this.$route.fullPath.slice(1),
        this.getContent()
    },
    
    computed: {
        ...mapState(['content'])
    },

    methods: {
        getContent() {
            axios.get(`http://localhost:4000/api/v1/content/slug/${this.slug}`)
            .then((res) => {
                if(res.data.data[0]) {
                    console.log(res.data.data[0])
                    this.setContent(res.data.data)
                } else {
                    this.error = true
                } 
            })
            .catch((err) => {
                this.error = true
            })
        },

        setContent(value) {
            this.$store.commit('getContent', value)
        }
    }
}
</script>

<template>
    <Head>
        <Title>{{ this.slug }}</Title>
        
        <Meta name="og:title" :content="this.slug" />
        <Meta name="description" :content="this.slug" />
        <Meta name="og:description" :content="this.slug" />

        <Meta name="og:type" content="websitet" />
        <Meta name="og:locale" content="en_US" />
        <Meta name="og:url" content="https://unclesadi.com" />
    </Head>

    <Error v-if="this.error" />

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