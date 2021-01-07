import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../layout/index.vue'),
      children: [
        {
          path: '/',
          name: 'Home',
          component: () => import('../views/Home.vue'),
          meta: {}
        },
        {
          path: '/timeline',
          name: 'timeline',
          component: () => import('../views/timeline.vue'),
          meta: {}
        },
        {
          path: '/chat/:id/:userId',
          name: 'chat',
          component: () => import('../views/chat.vue'),
          meta: {}
        },
      ]
    },
    {
      path: '/404',
      name: '404',
      component: () => import('../views/404.vue')
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
