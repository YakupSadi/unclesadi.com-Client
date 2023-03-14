export const state = () => ({
    content: null
})
  
export const getters = {
    getContent(state) {
        return state.content
    }
}
  
export const mutations = {
    setContent(state, content) {
        state.content = content
    }
}