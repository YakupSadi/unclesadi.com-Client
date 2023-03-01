<script setup>

</script>

<template>
    <div class="file">
        <NuxtLink to="/Vue.js">
            <img src="~/assets/images/js.png" alt="JavaScript">
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
        height: 100%;
        border-radius: 3px;
        border: 3px solid #fff;
    }
</style>