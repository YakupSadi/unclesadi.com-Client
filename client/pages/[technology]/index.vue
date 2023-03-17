<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {
    data() {
        return {
            slug: ''
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
                    navigateTo('/')
                } 
            })
            .catch((err) => {
                console.log(err)
            })
        },

        setContent(value) {
            this.$store.commit('getContent', value)
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