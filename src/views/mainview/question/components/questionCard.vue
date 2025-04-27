<script setup lang="ts">
import { questionStore } from '@/stores/questionStore';
import { useRouter } from 'vue-router';
import { reactive } from 'vue';
const route = useRouter()
// const from = route.query.from //判断用户是从 "题目列表" 还是 "提交记录" 进入
const from = (true)?"questionBank":"submitRecord" //测试用
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

if (from == "record") {
  // 从后台加载
  // const res = await getQuestionById(route.query.from.unique_id)
  //   questions.question = res.data.data
  //   questions.question.inputSample = JSON.parse(questions.question.inputSample)
  //   questions.question.outputSample = JSON.parse(questions.question.outputSample)
  //   questions.question.tag = JSON.parse(questions.question.tag)
  //   loading_question.value = false
} else {
  // 从pina加载题目
  questions.question = quesitonStore.$state.currentChoice
  // if (typeof questions.question.inputSample == "string") {//检查是否是字符串
  //   questions.question.inputSample = JSON.parse(questions.question.inputSample)
  //   questions.question.outputSample = JSON.parse(questions.question.outputSample)
  //   questions.question.tag = JSON.parse(questions.question.tag)
  // } else {
  //   questions.question.inputSample = questions.question.inputSample
  //   questions.question.outputSample = questions.question.outputSample
  //   questions.question.tag = questions.question.tag
  // }


}
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
        </el-main>
        <el-aside>
            <div class="divider-group">
                <div class="info-item">
                    <span>时空限制：</span>
                    <span>{{ questions.question.time_limit }}ms / {{ (questions.question.memory_limit / 1024) }}kb</span>
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
</style>