<script>
import axios       from 'axios'
import EditorJS    from '@editorjs/editorjs'
import Error       from '../../components/error.vue'

import List        from '@editorjs/list'
import Header      from '@editorjs/header'
import RawTool     from '@editorjs/raw'
import CodeTool    from '@editorjs/code'
import ColorPlugin from 'editorjs-text-color-plugin'

import SimpleImage from '../../editorjs/image'

export default {
    data() {
        return {
            slug  : '',
            title : null, 
            error : false
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
                this.title = res.data.data.title
                const data = { blocks: res.data.data.data }

                window.editor = new EditorJS({
                    holder   : 'editorjs',
                    readOnly : true,
                    data     : data,
                        
                    tools: {
                        list: {
                            class: List,
                            inlineToolbar: true,
                            config: {
                                defaultStyle: 'ordered'
                            }
                        },
                        Color: {
                            class: ColorPlugin,
                            config: {
                                colorCollections : ['#EC7878','#9C27B0','#673AB7','#3F51B5','#0070FF','#03A9F4','#00BCD4','#4CAF50','#8BC34A','#CDDC39', '#FFF'],
                                defaultColor     : '#FF1300',
                                type             : 'text', 
                                customPicker     : true
                            }      
                        },

                        Marker: {
                            class: ColorPlugin,
                            config: {
                                defaultColor : '#FFBF00',
                                type         : 'marker',
                                icon         : `<svg fill="#000000" height="200px" width="200px" version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M17.6,6L6.9,16.7c-0.2,0.2-0.3,0.4-0.3,0.6L6,23.9c0,0.3,0.1,0.6,0.3,0.8C6.5,24.9,6.7,25,7,25c0,0,0.1,0,0.1,0l6.6-0.6 c0.2,0,0.5-0.1,0.6-0.3L25,13.4L17.6,6z"></path> <path d="M26.4,12l1.4-1.4c1.2-1.2,1.1-3.1-0.1-4.3l-3-3c-0.6-0.6-1.3-0.9-2.2-0.9c-0.8,0-1.6,0.3-2.2,0.9L19,4.6L26.4,12z"></path> </g> <g> <path d="M28,29H4c-0.6,0-1-0.4-1-1s0.4-1,1-1h24c0.6,0,1,0.4,1,1S28.6,29,28,29z"></path> </g> </g></svg>`
                            }       
                        },

                        image: SimpleImage,

                        header : Header,
                        code   : CodeTool,
                        raw    : RawTool,
                    }
                })
            })
            .catch((err) => {
                this.error = true
            })
        }
    }
}
</script>

<template>
    <Head>
        <Title>{{ this.title }}</Title>
        
        <Meta name="og:title" :content="this.title" />
        <Meta name="description" :content="this.title" />
        <Meta name="og:description" :content="this.title" />

        <Meta name="og:type" content="websitet" />
        <Meta name="og:locale" content="en_US" />
        <Meta name="og:url" content="https://unclesadi.com" />
    </Head>

    <Error v-if="this.error" />

    <main class="index">
        <div class="article">
            <h1>{{ this.title }}</h1>

            <div id="editorjs">
    
            </div>
        </div>
    </main>    
</template>

<style>
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

    /**/
    .simple-image {
        width: 100%;
        display: flex;
        margin: 1rem 0;
        max-height: 30rem;
        align-items: center;
        justify-content: center;
    }
    .simple-image > img {
        max-width: 100%;
        max-height: 100%;
    }
</style>