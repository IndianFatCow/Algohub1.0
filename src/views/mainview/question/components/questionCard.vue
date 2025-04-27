<script setup lang="ts">
import { questionStore } from '@/stores/questionStore';
import { useRouter } from 'vue-router';
import { reactive,ref } from 'vue';
import { getSolution } from '@/api/submit';
const route = useRouter()
// const from = (true)?"questionBank":"submitRecord" //测试用
// console.log(from);
// 当前题目选择存储
const quesitonStore = questionStore()
const questions = reactive({
  question: {
          "ID": 1,
          "instanceID": 1,
          "createdAt": "2025-04-22T12:37:47.145Z",
          "updatedAt": "2025-04-22T12:37:47.145Z",
          "DeletedAt": null,
          "unique_id": "示例代码",
          "title": "示例代码",
          "descrition": "示例描述",
          "author": "作者",
          "time_limit": 1,
          "memory_limit": 128,
          "tag": "math,test,example,easy",
          "level": 1,
          totalPass: 0,
          totalAttempt: 0,
      },
})
const solution = ref([])


const showSlotion = async () => {
    // 从pina加载题目
  questions.question = quesitonStore.$state.currentChoice
  let res = await getSolution(questions.unique_id)
  solution.value = res.data.items

}
showSlotion()
</script>

<template>
    
  <div class="card-header">
    <h1>{{ questions.question.ID }} . {{ questions.question.title }}</h1>

  </div>
    <div class="tags">
      <el-tag v-for="tag in questions.question.tag" :key="tag">{{ tag }}</el-tag>
      <el-tag v-if="questions.question.level === 1">简单</el-tag>
      <el-tag v-if="questions.question.level === 2" type="success">中等</el-tag>
      <el-tag v-if="questions.question.level === 3" type="warning">困难</el-tag>
      <el-tag v-if="questions.question.level === 4" type="danger">噩梦</el-tag>
    </div>
<!-- 分割线 + 信息项 -->
    <el-container class="divider-group">
        <el-main>
            <p class="description">{{ questions.question.descrition }}</p>
                <!-- 如果没有用例，显示空状态 -->
                  <el-empty v-if="!solution.length" description="暂无测试用例" />

                  <div class="examples-container">
                    <div
                      v-for="(item, idx) in solution"
                      :key="item.ID || idx"
                      class="example-card"
                    >
                        <span class="example-label">示例 {{ idx + 1 }}：</span>
                        <br>
                        <span class="description-label">输入:</span>
                          <code class="code-block">{{ item.data_test }}</code>
                          <br>
                        <span class="description-label">输出:</span>
                          <code class="code-block"> {{ item.result_test }}</code>
                    </div>
                  </div>
        </el-main>
        <el-aside>
            <div class="divider-group">
                <div class="info-item">
                    <span>时空限制：</span>
                    <span>{{ questions.question.time_limit }}ms / {{ (questions.question.memory_limit / 1024).toFixed(2) }}Mb</span>
                </div>

                <el-divider>
                    <icon-database-time theme="two-tone" size="24" :fill="['#9b9b9b', '#ffffff']" />
                </el-divider>
                <div class="info-item">
                    <span>总通过数：</span>
                    <span>{{ questions.question.totalPass }}</span>
                </div>

                <el-divider>
                    <icon-success theme="two-tone" size="24" :fill="['#9b9b9b', '#ffffff']" />
                </el-divider>
                <div class="info-item">
                    <span>总尝试数：</span>
                    <span>{{ questions.question.totalAttempt }}</span>
                </div>

                <el-divider>
                    <icon-code theme="two-tone" size="24" :fill="['#9b9b9b', '#ffffff']" />
                </el-divider>
            </div>
        </el-aside>
    </el-container>
</template>

<style scoped>
/* 卡片头部样式 */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h1 {
  margin: 0;
  font-size: 1.5em;
  color: #333;
}

.tags {
  display: flex;
  gap: 8px; /* 在标签之间添加间距 */
}

/* 信息项样式 */
.description {
  font-size: 16px;
  color: #666;
  margin-bottom: 16px;
}
.divider-group {
  padding-top: 16px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
}

.info-item span:first-child {
  font-weight: bold;
}

/* 调整总尝试数的字体大小 */
.attempt-count {
  font-size: 14px; /* 或者任何适合的大小 */
}

/* 如果需要，可以为所有 info-item 设置统一的最大字体大小 */
.info-item span {
  font-size: 14px; /* 统一设置字体大小 */
}
.examples-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 靠左对齐 */
}

.example-card {
  width: fit-content; /* 自由布局 */
  margin-bottom: 16px; /* 卡片之间的间距 */
}

/* “示例”标签样式：保持正常大小并加粗 */
.example-label {
  font-size: 0.8em; /* 字体大小设置为正常大小 */
  font-weight: bold; /* 加粗显示 */
}

/* 描述（如“输入”，“输出”）标签样式 */
.description-label {
  font-size: 0.5em; /* 字体稍小一些 */
}

/* 代码块样式：确保代码易于阅读 */
.code-block {
  font-size: 0.5em; /* 缩小字体大小 */
  background-color: #f5f7fa; /* 浅灰色背景 */
}
</style>