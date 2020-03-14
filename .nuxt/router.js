import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _02665055 = () => interopDefault(import('../pages/appliances.vue' /* webpackChunkName: "pages/appliances" */))
const _7d9161e0 = () => interopDefault(import('../pages/autorization.vue' /* webpackChunkName: "pages/autorization" */))
const _0b16b718 = () => interopDefault(import('../pages/electronics.vue' /* webpackChunkName: "pages/electronics" */))
const _fd485a22 = () => interopDefault(import('../pages/personal.vue' /* webpackChunkName: "pages/personal" */))
const _4bd66530 = () => interopDefault(import('../pages/registration.vue' /* webpackChunkName: "pages/registration" */))
const _701cf949 = () => interopDefault(import('../pages/appliancecard/_id.vue' /* webpackChunkName: "pages/appliancecard/_id" */))
const _19d30126 = () => interopDefault(import('../pages/electroniccard/_id.vue' /* webpackChunkName: "pages/electroniccard/_id" */))
const _2513d09a = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/appliances",
    component: _02665055,
    name: "appliances"
  }, {
    path: "/autorization",
    component: _7d9161e0,
    name: "autorization"
  }, {
    path: "/electronics",
    component: _0b16b718,
    name: "electronics"
  }, {
    path: "/personal",
    component: _fd485a22,
    name: "personal"
  }, {
    path: "/registration",
    component: _4bd66530,
    name: "registration"
  }, {
    path: "/appliancecard/:id?",
    component: _701cf949,
    name: "appliancecard-id"
  }, {
    path: "/electroniccard/:id?",
    component: _19d30126,
    name: "electroniccard-id"
  }, {
    path: "/",
    component: _2513d09a,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
