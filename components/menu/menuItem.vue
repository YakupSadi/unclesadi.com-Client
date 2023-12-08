<script>
export default {
    props: [
        'title'
    ],
    
    data() {
        return {
            slug: null
        }
    },

    mounted() {
        this.slug = this.$route.params.technology
    }
}
</script>

<template>
    <div class="menu_item">
        <NuxtLink :to="'/' + slug + '/' + title">
            {{ title }}
        </NuxtLink>
    </div>
</template>

<style scoped>
    .menu_item > a {
        width: 75%;
        color: #fff;
        display: flex;
        padding: .3rem 0;
        margin: 1rem auto;
        font-size: 1.3rem;
        align-items: center;
        justify-content: center;
        border: 3px solid #fff;
        background-color: #1E1E1E;
    }
</style>