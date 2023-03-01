<script setup>

</script>

<template>
    <header class="header">
        <div class="logo">
            <NuxtLink to="/">
                <img src="~/assets/logo/logo.png" alt="Uncle Sadi">
            </NuxtLink>
        </div>
    </header>

    <div>
        <slot />
    </div>

    <footer class="footer">

    </footer>
</template>

<style scoped>
    .header {
        width: 100%;
        height: 4rem;
        display: flex;
        padding: 0 1rem;
        position: fixed;
        align-items: center;
        background-color: #1E1E1E;
        justify-content: space-between;
        border-bottom: 3px solid #fff;
    }
    .header > .logo {
        width: 4rem;
        height: 4rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .header > .logo > a > img {
        width: 70%;
        height: 70%;
    }
    .header > .menu {
        height: 2.8rem;
    }

    .footer {
        height: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    @media (min-width: 36em) { 
        .header {
            padding: 0 2rem;
        }
    }
    @media (min-width: 48em) {
        .header {
            padding: 0 3rem;
        }  
    }
    @media (min-width: 62em) {
        .header {
            padding: 0 4rem;
        }
    }
</style>