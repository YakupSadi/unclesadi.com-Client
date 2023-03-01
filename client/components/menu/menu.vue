<script>
import menuItem from './menuItem.vue';

export default {
    components: {
        menuItem
    }
}
</script>

<template>
    <div class="menu">
        <menuItem 
            v-for="n in 14"
            :key="n"
        />
    </div>
</template>

<style scoped>
    .menu {
        bottom: 0;
        width: 100%;
        position: fixed;
        overflow-y: auto;
        border-style: solid;
        border-color: #fff;
        height: calc(100vh - 4rem);
        border-width: 0 3px 3px 3px;
        background-color: #10A19D;
    }
    .menu::-webkit-scrollbar {
        width: .5em;
    }
    .menu::-webkit-scrollbar-thumb {
        background-color: #fff;
    }
    
    @media (min-width: 36em) { 
        .menu {
            width: 25rem;
        }
    }
</style>