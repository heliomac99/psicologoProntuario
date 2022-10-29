import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

const store = createStore({
    state () {
      return {
        usuario: { "id" : -1, "nome": '', "admin": 0 }
      }
    },
    mutations: {
      login(state, usuario) {
        if(usuario) {
            state.usuario = { "id" : usuario.id, "nome": usuario.nome, "admin": usuario.admin}
        }
      },
      logout(state){
        state.usuario = { "id" : -1, "nome": '' }
      },
      setNomeUsuario(state, nome){
        state.usuario.nome = nome
      },
      setAdminUsuario(state, admin){
        state.usuario.admin = admin
      }
    },
    getters:  {
        isLoggedIn(state){
          return state.usuario.id != -1
        },
        isAdmin(state){
          if(state.usuario.admin == 1)
            return true
          return false
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