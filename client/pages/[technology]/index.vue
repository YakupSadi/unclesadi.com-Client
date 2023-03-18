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
            html  : '',

            title : null,
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
                    this.title = res.data.data[0].title
                    const data = res.data.data[0].data

                    console.log(data)
                    this.outputHtml(data)
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
        },

        outputHtml(data) {
            data.map(item => {
                switch (item.type) {
                    case 'paragraph':
                        this.html += `<div>${item.data.text}</div>`
                    default:
                        return ''
                }
            })
            document.querySelector('.data').innerHTML = this.html
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
        <div class="article">
            <h1>{{ this.title }}</h1>

            <div class="data">
    
            </div>
        </div>
    </main>
</template>

<style scoped>
    .index {
        color: #fff;
        max-width: 100rem;
        padding: 6rem 2rem 2rem;
        min-height: var(--index-height);
    }
    .index > .article {
        max-width: 60rem;
        margin: 0 auto;
    }
    .index > .article > h1 {
        margin-bottom: 1rem;
    }
</style>