import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Note from '@/views/Note'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      name: 'note',
      path: '/note/:id',
      component: Note
    }
  ]
})