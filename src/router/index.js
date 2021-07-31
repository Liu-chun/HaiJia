import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default new VueRouter({
    routes: [{
        path: '/',
        name: "layout",
        redirect: {
            path: '/oddWarpingPlan'
        },
        component: () => import('@/views/Layout'),
        children: [{
                path: '/home',
                name: 'home',
                component: () => import("@/views/Home/Home")
            },
            {
                path: '/user',
                name: 'user',
                component: () => import('@/views/UserManage/UserManage'),
            },
            {
                path: '/mall',
                name: 'mall',
                component: () => import('@/views/MallManage/MallManage'),
            },
            {
                path: '/page1',
                name: 'page1',
                component: () => import('@/views/Other/PageOne'),
            },
            {
                path: '/page2',
                name: 'page2',
                component: () => import('@/views/Other/PageTwo'),
            },
            // 生产计划
            // 查单经轴未制定整经计划
            {
                path: '/oddWarpingPlan',
                name: 'oddWarpingPlan',
                component: () => import('../views/project/oddWarpingPlan'),
            },
            // 查双经轴未制定整经计划（前）
            {
                path: '/evenWarpingPlan',
                name: 'evenWarpingPlan',
                component: () => import('../views/project/evenWarpingPlan'),

            },
            // 查双经轴未制定整经计划（后）
            {
                path: '/evenWarpingfPlan',
                name: 'evenWarpingfPlan',
                component: () => import('../views/project/evenWarpingfPlan'),
            },
            // 生产订单
            // 生产订单
            {
                path: '/productOrder',
                name: 'productOrder',
                component: () => import('../views/productOrder/productOrder'),
            },
            // 原料需求
            // 原料供应状态
            {
                path: '/rawStatus',
                name: 'rawStatus',
                component: () => import('../views/rawMaterial/rawStatus'),
            },
        ]
    }]
})