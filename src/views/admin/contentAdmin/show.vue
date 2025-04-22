<script setup>
import { ref } from 'vue'
import { SearchUserService } from '@/api/user'

// 使用ref创建响应式数据
const result = ref(null)
const loading = ref(false) // 可选：用于显示加载状态
const error = ref(null) // 可选：用于捕获并显示错误信息

const search = async () => {
    try {
        loading.value = true
        const username = "admin"
        const offset = 0
        const limit = 10
        const res = await SearchUserService(username, offset, limit)
        result.value = res // 将API响应赋值给响应式变量
        console.log(result.value)
    } catch (err) {
        error.value = err.message || 'Failed to fetch data.'
        console.error(error.value)
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <div>show</div>
    <h1>1111</h1>
    <el-button @click="search">查找列表</el-button> <!-- 注意这里不需要括号 -->
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else-if="result">
        {{ result.data }} <!-- 假设API返回的数据结构包含data字段 -->
    </div>
    <div v-else>No Data</div>
</template>

<style scoped>
/* 样式可以根据需要进行调整 */
</style>