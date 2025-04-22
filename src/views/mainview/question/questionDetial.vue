<script lang="ts" setup>
import submitRecord from './components/submitRecord.vue'
import aceEditor from './components/front/aceEditor1.vue'
import { StarFilled } from '@element-plus/icons-vue'
import { ref, reactive } from 'vue'
import { questionStore } from '@/stores/questionStore';
import { useRoute } from 'vue-router';
import request from '@/utils/request';
import { useAuthStore } from '@/store/store';
const route = useRoute()
const from = route.query.from //判断用户是从 "题目列表" 还是 "提交记录" 进入
console.log(from);
const loading_question = ref(true)
// 当前题目选择存储
const quesitonStore = questionStore()
// tabs激活选择

const isLogin = ref(useAuthStore().$state.isLogin)
const activeName = ref('first')

console.log(quesitonStore.$state.currentChoice);



const questions = reactive({
  question: {
    id: 0,
    questionName: '',
    inputStyle: '',
    outputStyle: '',
    inputSample: '',
    outputSample: '',
    dataRange: '',
    difficulty: '',
    timeLimit: 0,
    memoryLimit: 0,
    description: '',
    totalPass: 0,
    totalAttempt: 0,
    resource: '',
    tag: ''
  }
})

if (from == "record") {
  // 从后台加载
  request({
    url: '/getQuestion/' + quesitonStore.$state.currentChoice.id,
    method: 'get'
  }).then((res) => {
    questions.question = res.data.data
    questions.question.inputSample = JSON.parse(questions.question.inputSample)
    questions.question.outputSample = JSON.parse(questions.question.outputSample)
    questions.question.tag = JSON.parse(questions.question.tag)
    loading_question.value = false
  })
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
  loading_question.value = false//题目加载完成

}

</script>

<template>
  <div>
    <el-container style="min-height: 100vh;">
      <!-- 左侧部分 -->
      <el-aside width="40%" class="leftAside">
        <el-card class="box-card" v-show="loading_question" style="margin: 0px;">
          <el-skeleton :rows="8" animated v-show="loading_question" />
        </el-card>

        <el-card class="box-card" v-show="!loading_question" style="margin: 0px;">
          <template #header>
            <div class="card-header">
              <h1 v-show="!loading_question">{{ questions.question.id }} . {{ questions.question.questionName }}</h1>
            </div>
          </template>
          <div class="info-item">
            <div style="float: left;">难度:</div>
            <div style="float:right">
              <el-tag class="ml-2" v-show="questions.question.difficulty == '简单'">简单</el-tag>
              <el-tag class="ml-2" type="success" v-show="questions.question.difficulty == '中等'">中等</el-tag>
              <el-tag class="ml-2" type="warning" v-show="questions.question.difficulty == '困难'">困难</el-tag>
              <el-tag class="ml-2" type="danger" v-show="questions.question.difficulty == '噩梦'">噩梦</el-tag>
            </div>
          </div>
          <div style="clear:both;"></div>
          <el-divider>
            <icon-certificate theme="two-tone" size="24" :fill="['#9b9b9b', '#ffffff']" />
          </el-divider>
          <div class="info-item">
            <div style="float: left;">时空限制:</div>
            <div style="float:right">{{ questions.question.timeLimit }}s/{{
              (questions.question.memoryLimit / 1024)}}Mb</div>
          </div>
          <div style="clear:both;"></div>
          <el-divider>
            <icon-database-time theme="two-tone" size="24" :fill="['#9b9b9b', '#ffffff']" />
          </el-divider>
          <div class="info-item">
            <div style="float: left;">总通过数:</div>
            <div style="float:right">{{ questions.question.totalPass }}</div>
          </div>
          <div style="clear:both;"></div>
          <el-divider>
            <icon-success theme="two-tone" size="24" :fill="['#9b9b9b', '#ffffff']" />
          </el-divider>
          <div class="info-item">
            <div style="float: left;">总尝试数:</div>
            <div style="float:right">{{ questions.question.totalAttempt }}</div>
          </div>
          <div style="clear:both;"></div>
          <el-divider>
            <icon-code theme="two-tone" size="24" :fill="['#9b9b9b', '#ffffff']" />
          </el-divider>
          <div class="info-item">
            <div style="float: left;">题目来源:</div>
            <div style="float:right">{{ questions.question.resource }}</div>
          </div>
          <div style="clear:both;"></div>
          <el-divider>
            <icon-router theme="two-tone" size="24" :fill="['#9b9b9b', '#ffffff']" />
          </el-divider>
          <div class="info-item">
            <div class="demo-collapse">
              <el-collapse>
                <el-collapse-item title="算法标签" name="1">
                  <div v-for="tag in questions.question.tag ">
                    <el-tag class="ml-2" type="info" style="float: left;margin: 5px;">{{ tag }}</el-tag>
                  </div>
                </el-collapse-item>
              </el-collapse>
            </div>
          </div>
          <!-- 题目详细信息描述栏 -->
          <el-divider content-position="left"><strong>题目信息</strong></el-divider>
          <v-md-editor v-model="questions.question.description" mode="preview"></v-md-editor>
          <el-divider content-position="left">输入样式</el-divider>
          <v-md-editor v-model="questions.question.inputStyle" mode="preview"></v-md-editor>
          <el-divider content-position="left">输出格式</el-divider>
          <v-md-editor v-model="questions.question.outputStyle" mode="preview"></v-md-editor>
          <el-divider content-position="left">数据范围</el-divider>
          <v-md-editor v-model="questions.question.dataRange" mode="preview"></v-md-editor>

          <el-divider content-position="left">样例输入</el-divider>
          <el-alert v-for="input in questions.question.inputSample" type="info" :closable="false"
            style="margin-bottom: 10px;;">

            <template #default="content" style="position: relative;">
              <span style="white-space: pre-line;line-height: 0.5;">
                {{ input }}
              </span>
              <el-button type="info" style="position: absolute;top: 5px;right: 5px;bottom: 5px;"
                plain>复制</el-button>
            </template>

          </el-alert>
          <el-divider content-position="left">样例输出</el-divider>
          <el-alert v-for="output in questions.question.outputSample" type="info" :closable="false"
            style="margin-bottom: 10px;">
            <template #default="content" style="position: relative;">
              <span style="white-space: pre-line;line-height: 0.5;">
                {{ output }}
              </span>
              <el-button type="info" style="position: absolute;top: 5px;right: 5px;bottom: 5px;"
                plain>复制</el-button>
            </template>

          </el-alert>
        </el-card>
        
      </el-aside>

      <!-- 右侧部分 -->
      <el-main>

        <el-card shadow="always" style="height: 100%; margin: 0px;">
          
          <el-skeleton :rows="0" animated v-show="loading_question" />
          <el-tabs v-model="activeName" class="demo-tabs" style="width: 100%;">
            <!-- 题目详细信息 -->
            <el-tab-pane label="代码" name="first" style="width: 100%;">
              <!-- 编辑器 -->
              <aceEditor :mode="'normal'" :code="''" :title="''" />
              
            </el-tab-pane>
            <el-tab-pane v-if="isLogin" label="提交记录" name="second" style="width: 100%;">
              <!-- 提交记录 -->
              <submitRecord :uid="'detial'" />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<style scoped>
.leftAside {
  display: inline;
}
.info-item {
  display: flex;
  justify-content: space-between;
  height: 10px;
  font-size: 14px;
  padding: 0px 0;
  margin: 0px 0;
  line-height: 1.2;
}
/* 右侧部分导航栏 */
.demo-tabs>.el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}


.text {
  font-size: 14px;
}
</style>