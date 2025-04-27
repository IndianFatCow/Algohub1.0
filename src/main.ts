import './assets/main.scss'
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from '@/router/index'
// 引入aceEditor编辑器
import ace from 'ace-builds'
import '@icon-park/vue-next/styles/index.css'; // 引入字节跳动图标库
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'

import App from './App.vue'

const app = createApp(App)
const pinia=createPinia()
const persist=createPersistedState()
pinia.use(persist)
app.use(ElementPlus)
app.use(pinia)//管理全局状态
app.use(router)//管理路由
app.use(ace)//ace编辑器
app.mount('#app')
