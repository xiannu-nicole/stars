import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let mainUrl = 'public/main.json'
// let mainUrl = '/stars/public/main.json'

let store = new Vuex.Store({
    state:{
        nav:[
            {id:'about',title:'關於太陽系'},
            {id:'sun',title:'恆星'},
            {id:'planets',title:'行星'},
            {id:'moon',title:'衛星'},
            {id:'test',title:'牛刀小試'}
        ],
        about:'',
        sun:'',
        planets:[],
        moon:'',
        testData:[],
        testScore: 0,
    },
    mutations:{
        setMainDate(state,main){
            state.about = main.mainData.about
            state.sun = main.mainData.sun
            state.planets = main.mainData.planets
            state.moon = main.mainData.moon
            state.testData = main.testData
        },
        getScore(state,payload){
            state.testScore = state.testScore + payload
        },
        testScore0(state,payload){
            state.testScore = 0
        }
    },

    actions:{
        getMainDate(context){
            fetch(mainUrl)
            .then(res => res.json())
            .then(main => context.commit('setMainDate',main))
        },
    }
})
export default store