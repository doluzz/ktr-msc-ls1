import { createStore } from 'vuex'
var CryptoJS = require("crypto-js");


const store = createStore({
    state () {
      return {
      }
    },
    mutations: {
      setStatus: function (state, status) {
        state.status = status;
        localStorage.setItem('Status', state.status)
      },
      coUser: function (state, data) {
        state.data = data
        localStorage.removeItem('User')
        localStorage.setItem('User', JSON.stringify(data))
      },
      encrypt (state, mdp) {
        state.mdp = CryptoJS.SHA256(mdp, "montravailpourepitech").toString()
      },
    },
    actions: {
        login ({ commit }, data) {
            commit('setStatus', 'connecté');
            commit('coUser', data)
        }
    }
})

export default store;