<script lang="ts" setup>
import submitRecord from './components/submitRecord.vue'
import aceEditor from './components/aceEditor.vue'
import sloving from './components/sloving.vue'
import questionCard from './components/questionCard.vue'
import { StarFilled } from '@element-plus/icons-vue'
import { ref, reactive } from 'vue'

// import request from '@/utils/request';
import{ useUserInfoStore } from '@/stores/userInfo'; 
import {getQuestionById} from '@/api/question';
import { questionStore } from '@/stores/questionStore';
const loading_question = ref(true)

// tabs激活选择

const isLogin = ref(useUserInfoStore().$state.isLogin)
// console.log(useUserInfoStore().$state.isLogin);
const activeName = ref('first')

// console.log(quesitonStore.$state.currentChoice);

loading_question.value = false//题目加载完成

const qid= questionStore().$state.currentChoice.unique_id

</script>
<template>
  <el-container class="page-container">

    <!-- 左侧留白 -->
    <el-aside class="aside-blank" width="10%"></el-aside>

    <!-- 中心区 -->
    <el-container>
      <el-main class="main-content">
        <el-card class="code-card" shadow="always">
          <!-- 加载骨架 -->
          <el-skeleton
            class="skeleton-loading"
            :rows="0"
            animated
            v-show="loading_question"
          />

          <!-- 选项卡 -->
          <el-tabs
            v-model="activeName"
            class="demo-tabs"
            v-show="!loading_question"
          >
            <!-- 代码 + 题目信息 -->
            <el-tab-pane label="代码" name="first">
              <!-- 题目信息卡 -->
              <questionCard />
              <!-- 代码编辑器 -->
              <div class="editor-wrapper">
                <aceEditor :mode="'normal'" :code="''" :title="''" qid="" />
              </div>
            </el-tab-pane>

            <!-- 提交记录 -->
            <el-tab-pane v-if="isLogin" label="提交记录" name="second">
              <submitRecord :uid="'detail'" />
            </el-tab-pane>
            <!-- 题解 -->
            <el-tab-pane label="题解" name="third">
              <sloving :qid="qid" />
            </el-tab-pane>
          </el-tabs>

        </el-card>
      </el-main>
    </el-container>

    <!-- 右侧留白 -->
    <el-aside class="aside-blank" width="10%"></el-aside>
  </el-container>
</template>

<style scoped>

</style>
