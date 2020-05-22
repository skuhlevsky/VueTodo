import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import undo from './modules/undo'
import notes from './modules/notes'

Vue.use(Vuex)

// Adding the Vuex localStorage plugin
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

export default new Vuex.Store({
  modules: {
    undo,
    notes
  },
  plugins: [vuexLocal.plugin]
})
