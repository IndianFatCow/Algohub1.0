//导入vue-router
import { createRouter, createWebHistory } from 'vue-router'
// '@/views/admin/contentAdmin/show.vue'

//导入组件
import LoginVue from '@/views/Login.vue'

//admin页面的子页面
import admin from '@/views/admin/adminpage.vue'
import ArticleManagevue from '@/views/admin/contentAdmin/show.vue'//文章管理
import userManage from '@/views/admin/contentAdmin/show.vue'//用户管理
import Articlecategoryvue from '@/views/admin/contentAdmin/questionManage.vue'//文章分类

//uesr页面和子页面
import showVue from '@/views/mainview/compoment/show.vue'//项目展示
import userpage from '@/views/mainview/homepage.vue'
import homepage from '@/views/mainview/Blog/home.vue'
// import questionBank from '@/views/admin/contentAdmin/show.vue'
import profile from '@/views/admin/contentAdmin/show.vue'
import qa from '@/views/admin/contentAdmin/show.vue'
import visualAlgo from '@/views/admin/contentAdmin/show.vue'

//通用页面
//题库页面
import questionBank from '@/views/mainview/question/questionBank.vue'//题库
import questionDetial from '@/views/mainview/question/questionDetial.vue'//题目详情
// import NotFound from '@/views/NotFound.vue'//404页面
//用户中心页面
import userCenter from '@/views/mainview/userCenter/mainpage.vue'
import userAvatarvue from '@/views/admin/userCenter/UserAvatar.vue'
import userInfovue from '@/views/admin/userCenter/UserInfo.vue'
import userResetpasswordvue from '@/views/admin/userCenter/UserResetPassword.vue'//修改密码

import setupAllRouterGuard from './listen'//监听路由
//定义路由关系
const routes = [
    { path: '/login', component: LoginVue },    
    { path: '/admin', component: admin,
        redirect:'/admin/user/info',//重定向
        children://配置子路由
        [   { path: '/admin/question/manage', component: Articlecategoryvue },
            { path: '/admin/article/manage', component: ArticleManagevue },
            { path: '/admin/user/manage', component: userManage },
            { path: '/admin/user/avatar', component: userAvatarvue },
            { path: '/admin/user/info', component: userInfovue },
            {path: '/admin/user/repassword', component: userResetpasswordvue }
        ]

    },
    { path: '/', component: userpage,
        children://配置子路由
        [       
                {path: '/show', component: showVue},
                {path: '/home', component: homepage},
                {path: '/question-bank', component: questionBank},
                {path: '/questionDetial', component: questionDetial},
                {path: '/profile', component: profile},
                {path: '/qa', component: qa},
                {path: '/visual-algo', component: visualAlgo}      
        ]},
    { path: '/usercenter', component: userCenter,
        children://配置子路由
        [
            {path: '/userCenter/avatar', component: userAvatarvue},
            {path: '/userCenter/info', component: userInfovue},
            {path: '/userCenter/repassword', component: userResetpasswordvue}
        ]
    }
    // { path: '/:catchAll(.*)', component: NotFound ,meta:{ hidden: true }},//404页面
]

//创建路由器
const router = createRouter({
    history: createWebHistory(),
    routes: routes
});
setupAllRouterGuard(router)
export default router