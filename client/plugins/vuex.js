import { createStore } from "vuex";

const store = createStore({
    state() {
        return {
            content: null
        }
    },
    
    mutations: {
        getContent(state, data) {
            state.content = data
        }
    }
})

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(store)
})