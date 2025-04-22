<script lang="ts" setup>
import { Search ,Edit,Delete} from '@element-plus/icons-vue'
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import type { Question } from '@/lib/types';
import { questionStore } from '@/stores/questionStore';
import { ElNotification } from 'element-plus'
import emitter from "@/lib/bus";
import { MittRouterNameSpace } from "@/lib/type";
import { judgerStore } from '@/stores/judgerStore';
// import { useAuthStore } from '@/store/store';
import { useUserInfoStore } from '@/stores/userInfo';
import { countQuestion, getQuestionList, searchQuestion } from '@/api/question';

const userInfoStore = useUserInfoStore();
const router = useRouter()
// 统一导航栏的激活状态样式
onMounted(() => {
  emitter.emit(MittRouterNameSpace.ChangeRouter, "/problem");
})

// 一页显示几个题目
const page_size = 15;

// 当前第几页
const page = ref(1)
// 搜索内容
const searchContent = ref("")
// 总题目大小
const total_size = ref(0)
// table加载状态
const loading = ref(true)
// 统计题目总数
const count = async () => {
  let result = await countQuestion();
  total_size.value = result.data.total;
  // console.log(result.data.total);
  // console.log(total_size.value);
  total_size.value = 100;
};
count();

// 题目列表
const tableData = reactive({
  question_list: [],
  resolve_list: []
});

// 跳转题目详情
const toProblemDetail = (question: Question) => {
  judgerStore().setJudgeType(100);
  questionStore().setCurrentChoice(question);
  router.push({ path: '/questionDetial' });
};

// 改变页码
const changePage = (new_page: number) => {
  loading.value = true;
  page.value = new_page;
  getQuestionListData();
};

// 加载题目列表
const getQuestionListData = async () => {
  loading.value = true;
  // let username = userInfoStore.isLogin ? userInfoStore.userinfo.username : "0";
  let result = await getQuestionList(page.value,page_size);
  loading.value = false;
  tableData.question_list = result.data;
  // console.log(tableData.question_list);
};
getQuestionListData();

// 搜索题目
const searchQuestionData = async () => {
  if (searchContent.value === "") {
    ElNotification({
      title: "error",
      message: "请输入搜索题目",
      type: 'error',
    });
    getQuestionListData();
    return;
  }

  let result = await searchQuestion(page.value, searchContent.value);
  total_size.value = result.data.length;
  tableData.question_list = result.data;
};
</script>
<template>
    <el-container>
      <el-aside width="20%">
  
      </el-aside>
      <el-container style="min-height: 105vh;">
        <el-header>
  
        </el-header>
        <el-main>
  
          <el-card shadow="always" style="height: 100%">
            <!-- 搜索框 -->
            <el-input v-model="searchContent" placeholder="搜索题目" class="input-with-select" size="large"
              @keydown.enter="searchQuestionData">
              <template #prepend>
                <el-button :icon="Search" @click="searchQuestionData" />
              </template>
            </el-input>

            <!-- 题目列表 -->
            <el-table :data="tableData.question_list" style="width: 100%" v-loading="loading"
              element-loading-text="加载中..." >
              <el-table-column label="#" style="width: 10%;" #default="scope">
                {{ scope.row.id }}

                <el-popover placement="top-start" title="通过！" :width="200" trigger="hover" v-if="scope.row.uid == 1 " content="你已经成功征服这道题目=)">
                  <template #reference>
                    <icon-check-one theme="two-tone" size="23" :fill="['#333', '#7ed321']" :strokeWidth="2" />
  
                  </template>
  
                </el-popover>
              </el-table-column>
  
              <el-table-column label="题目" style="width: 70%;">
                <template #default="scope">
                  <el-button type="primary" @click="toProblemDetail(scope.row)" link>{{ scope.row.questionName}}</el-button>
                </template>
              </el-table-column>
              <el-table-column #default="scope" label="通过率" style="width: 10%;">
                {{ scope.row.passRate  }} %
              </el-table-column>
              <el-table-column label="难度" style="width: 10%;">
                <template #default="scope">
                  <el-tag class="ml-2" v-show="scope.row.difficulty == '简单'">简单</el-tag>
                  <el-tag class="ml-2" type="success" v-show="scope.row.difficulty == '中等'">中等</el-tag>
                  <el-tag class="ml-2" type="warning" v-show="scope.row.difficulty == '困难'">困难</el-tag>
                  <el-tag class="ml-2" type="danger" v-show="scope.row.difficulty == '噩梦'">噩梦</el-tag>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination class="pagination" background layout="prev, pager,n ext" :total="total_size"
              :page-size="page_size" @current-change="changePage" />
  
  
          </el-card>
  
  
        </el-main>
        <el-footer>
        </el-footer>
      </el-container>
      <el-aside width="20%"></el-aside>
    </el-container>
  </template>
    
  
  <style lang="css">
  .pagination {
    justify-content: center;
    margin-top: 20px;
  
  }
  </style>
    