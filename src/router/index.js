/*
 * 路径中的#后为hash值
 * nginx可解决
 * npmjs.com搜connect-history-api-fallback
 **/


import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'
import Home from '../components/home/Home'
import AreaInfo from '../components/baseInfo/area/AreaInfo'
import VarietyInfo from '../components/baseInfo/variety/VarietyInfo'
import FruitTreeDetail from "../components/fruitTreeManage/FruitTreeDetail";
import AddFruitTree from "../components/fruitTreeManage/AddFruitTree";
import ArchiveDetail from "../components/archiveManage/ArchiveDetail";
import AddArchive from "../components/archiveManage/AddArchive";

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
        component: Home,
        meta:{
            title: '果树档案馆'
        }
    },
    {
        path: "/fruitTree/addFruitTree",
        name: "addFruitTree",
        component: AddFruitTree,
        meta:{
            title: '添加果树'
        }
        //独享路由守卫，只有前置没有后置，相当于前置
        // beforeEnter:(to,from,next)=>{
        //
        // }
    },
    {
        path: "/fruitTree/treeDetail/:treeCode",
        name: "treeDetail",
        component: FruitTreeDetail,
        meta:{
            title: '果树详情'
        }
        //独享路由守卫，只有前置没有后置，相当于前置
        // beforeEnter:(to,from,next)=>{
        //
        // }
    },
    {
        path: "/fruitTree/treeDetail/archiveDetail/:archiveCode",
        name: "archiveDetail",
        component: ArchiveDetail,
        meta: {
            title: '记录内容'
        }
    },
    {
        path: "/fruitTree/treeDetail/addArchive",
        name: "addArchive",
        component: AddArchive,
        meta: {
            title: '添加记录'
        }
    },
    {
        path: "/baseInfo/area",
        name: "areaInfo",
        component: AreaInfo,
        meta:{
            title: '地区信息'
        }
    },
    {
        path: "/baseInfo/variety",
        name: "varietyInfo",
        component: VarietyInfo,
        meta:{
            title: '品种管理'
        }
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
    if(to.meta.title){
        document.title = to.meta.title
    }
})


export default router