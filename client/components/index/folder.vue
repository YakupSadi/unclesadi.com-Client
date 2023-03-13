<script>
import axios from 'axios';
import File  from './file.vue';

export default {
    components: {
        File
    },
    props: [
        'title',
        'background'
    ],
    data() {
        return {
            files: null
        }
    },
    mounted() {
        this.getAllFile()
    },
    methods: {
        getAllFile() {
            axios.get('http://localhost:4000/api/v1/file')
            .then((res) => {
                this.files = res.data.data.filter(data => data.folder === this.title);
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }
}
</script>

<template>
    <div class="folder">
        <div class="folder_title">
            {{ this.title }}
        </div>

        <div class="folder_container" :style="{ backgroundColor: background }">
            <File 
                v-for="(file, index) in files"
                :key    = "index"
                :id     = "file._id"
                :title  = "file.title"
                :folder = "file.folder"
                :image  = "file.image"
            />
        </div>
    </div>    
</template>

<style scoped>
    .folder {
        width: 100%;
        margin-bottom: 3rem;
        height: fit-content;
    }
    .folder > .folder_title {
        color: #fff;
        font-size: 1.3rem;
        width: fit-content;
        padding: .2rem 1rem;
        border-top: 3px solid #fff;
        border-bottom: 10px solid #fff;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
    }
    .folder > .folder_container {
        gap: 1rem;
        display: grid;
        padding: 1.2rem;
        border: 3px solid #fff;
        grid-auto-rows: min-content;
        border-radius: 0 3px 3px 3px;
        background-color: rebeccapurple;
        grid-template-columns: repeat(auto-fill, minmax(7rem, 1fr));
    }

    @media (min-width: 62em) { 
        .folder {
            width: 45vw;
        }
    }
</style>