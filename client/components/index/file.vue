<script>
export default {
    props: [
        'image',
        'title'
    ],
    data() {
        return {
            urlImage: `http://localhost:4000/api/v1/file/${this.image}`
        }
    }
}
</script>

<template>
    <div class="file">
        <NuxtLink :to="title">
            <img :src="urlImage" :alt="this.title">
        </NuxtLink>
    </div>
</template>

<style scoped>
    .file {
        height: 6rem;
        display: flex;
        overflow: hidden;
        border-radius: 3px;
        align-items: center;
        justify-content: center;
    }
    .file > a {
        height: 6rem;
    }
    .file > a > img {
        width: 100%;
        height: 100%;
        border-radius: 3px;
        border: 3px solid #fff;
    }
</style>