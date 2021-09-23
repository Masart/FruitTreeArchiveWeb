/*
 * 路径中的#后为hash值
 * nginx可解决
 * npmjs.com搜connect-history-api-fallback
 **/


import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'
import Home from '../components/home/Home'
import Management from '../components/fruitTreeManage/Management'
import AreaInfo from '../components/baseInfo/area/AreaInfo'
import VarietyInfo from '../components/baseInfo/variety/VarietyInfo'

const routes = [
    {
        path: "/", redirect: "/home",
    },
    {
        path: "/baseInfo", redirect: "/baseInfo/area",
    },
    {
        path: "/home",
        name: "home",
        component: Home
    },
    {
        path: "/fruitTree",
        name: "fruitTree",
        component: Management,
        //独享路由守卫，只有前置没有后置，相当于前置
        // beforeEnter:(to,from,next)=>{
        //
        // }
    },
    {
        path: "/baseInfo/area",
        name: "areaInfo",
        component: AreaInfo
    },
    {
        path: "/baseInfo/variety",
        name: "varietyInfo",
        component: VarietyInfo
    },
]


const router = createRouter({
    history: createWebHashHistory(),
    // history:createWebHistory(),
    routes: routes
})

// 路由守卫：全局前置路由守卫，每次切换时、初始化时被调用
router.beforeEach((to, from, next) => {
    next()
})

// 后置
router.afterEach((to, from) => {
})


export default router