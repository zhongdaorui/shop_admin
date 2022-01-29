import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import User from '../components/user/user.vue'


Vue.use(VueRouter)

const routes = [
 {
   path:'/Login',
   component:Login
 },
 {
   path:'/',
   redirect:'/Login'
 },
 {
   path:'/Home',
   component:Home,
   redirect: '/welcome',
   children:[
     {path:'/Welcome',
     component: Welcome 
    },{
      path:'/users',
      component:User
    }
   ]
 }
]

const router = new VueRouter({
  routes
})

export default router
