<script>
import File from './file.vue';

export default {
    components: {
        File
    }
}
</script>

<template>
    <div class="folder">
        <div class="folder_title">
            Back-End
        </div>

        <div class="folder_container">
            <File 
                v-for="n in 3" 
                :key="n"
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
        /* box-shadow: inset -5px -5px 1rem red, inset 5px 5px 1rem red; */
    }

    @media (min-width: 62em) { 
        .folder {
            width: 45vw;
        }
    }
</style>