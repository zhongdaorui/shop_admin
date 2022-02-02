import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import User from '../components/user/user.vue'
import Rights from '../components/power/Rights.vue'
import Roles from '../components/power/Roles.vue'



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
    },
    { path: '/rights', component: Rights },
    { path: '/roles', component: Roles }
   ]
 }
]

const router = new VueRouter({
  routes
})

export default router
