import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

const store = createStore({
    state () {
      return {
        usuario: { "id" : -1, "nome": '' }
      }
    },
    mutations: {
      login(state, usuario) {
        if(usuario) {
            state.usuario = { "id" : usuario.id, "nome": usuario.nome }
        }
      },
      logout(state){
        state.usuario = { "id" : -1, "nome": '' }
      }
    },
    getters:  {
        isLoggedIn(state){
          return state.usuario.id != -1
        },
        getUsuarioNome(state){
          return state.usuario.nome
        },
        getUsuarioId(state){
          return state.usuario.id
        },
        getUsuario(state){
          return state.usuario
        }
    },
    plugins: [createPersistedState()],  
})

export default store;