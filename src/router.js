
import App from './App.vue'
import about from './about.vue'
import sun from './sun.vue'
import planets from './planets.vue'
import moon from './moon.vue'
import test from './test.vue'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


   let router = new VueRouter({
        routes:[{
            mode: 'hash',
            path:'/',
            component:App,
            redirect:'/about',
            children:[
                {path:'about',component:about,name:'about'},
                {path:'sun',component:sun,name:'sun'},
                {path:'planets',component:planets,name:'planets'},
                {path:'moon',component:moon,name:'moon'},
                {path:'test',component:test,name:'test'}
            ]
        }
        ]
    })

    export default router
