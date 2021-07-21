/**
 * @Author: Caven
 * @Date: 2020-03-19 22:24:00
 */

import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'index',
        component: () =>
            import ('@/views')
    },
    {
        path: '/moudle',
        name: 'moudle',
        component: () =>
            import ('@/views/moudleFanzhi')
    },
    {
        path: '/equipment',
        name: 'equipment',
        component: () =>
            import ('@/views/equipment')
    }

]

const router = new VueRouter({
    routes
})

export default router