<script lang="ts" setup>
import { Search ,Edit,Delete,CircleCheckFilled} from '@element-plus/icons-vue'
import { ref, reactive, onMounted,watch } from 'vue'
import { useRouter,useRoute } from 'vue-router';
import type { Question } from '@/lib/types';
import { questionStore } from '@/stores/questionStore';
import { ElNotification } from 'element-plus'
import emitter from "@/lib/bus";
import { MittRouterNameSpace } from "@/lib/type";
import { judgerStore } from '@/stores/judgerStore';
// import { useAuthStore } from '@/store/store';
import { useUserInfoStore } from '@/stores/userInfo';
import {  getQuestionList, searchQuestion,getQuestionById } from '@/api/question';
import { ta } from 'element-plus/es/locales.mjs';
import { getSubmitList } from '@/api/submit';
const userInfoStore = useUserInfoStore();
const router = useRouter()
const route = useRoute()
// 统一导航栏的激活状态样式
onMounted(() => {
  emitter.emit(MittRouterNameSpace.ChangeRouter, "/problem");
})
// 搜索内容
const searchContent = ref("")

// 一页显示几个题目
const page_size = 15;

// 当前第几页
const page = ref(1)

// 总题目大小
const total_size = ref(0)
// table加载状态
const loading = ref(true)
// //是否通过
const isPass = ref(false)
const ifPass = async (unique_id: string) => {
  const res = await getSubmitList(unique_id, 0, 1);
  return res.data.items[0]?.status === "accepted";
};

const passStatus = reactive<Record<string, boolean>>({});

const updatePassStatus = async (unique_id: string) => {
  passStatus[unique_id] = await ifPass(unique_id);
};
// 题目列表
const tableData = reactive({
  question_list: [] as Question[],
  resolve_list: [] as any[]
});

// 跳转题目详情
const toProblemDetail = (question: Question) => {
  judgerStore().setJudgeType(100);
  questionStore().setCurrentChoice(question);
    // 使用命名路由并传递参数
  // const path = `/questionDetail/${question.unique_id}`;
  // router.push(path);
  router.push(`/questionDetail/${question.unique_id}`);
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
  const offset = (page.value - 1) * page_size;
  let result = await getQuestionList(offset,page_size);
  loading.value = false;
  total_size.value = result.data.totalItems;
  
  tableData.question_list = result.data.items;
  tableData.question_list.forEach((question) => {
    updatePassStatus(question.unique_id);
  });
  result.data.items = result.data.items.map((item:Question) => ({
    ...item,
    tag: item.tag ? item.tag.split(',').map(tag => tag.trim()) : [] // 将字符串转换为数组
  }));
  tableData.question_list = result.data.items;
  // console.log(tableData.question_list[0].tag[0]);//打印出来是第一个字符m
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
  console.log(searchContent.value)
  // let result = await searchQuestion(page.value, searchContent.value);
  // console.log(searchContent.value)
  let result = await getQuestionById(searchContent.value)
  console.log(result.data)
  if (result.data === null) {
    ElNotification({
      title: "error",
      message: "没有找到该题目",
      type: 'error',
      
    });
    getQuestionListData();
    return;
  }
//如果路由有参数，搜索题目
const routeSearch =  ()=>{
  if(route.query.searchContent !== undefined) {
  searchContent.value = route.query.searchContent as string || ""
  searchQuestionData()
} else {
  searchContent.value = ""
}
}
routeSearch()
  watch(() => route.query.searchContent, (newValue) => {
    routeSearch()
  }, { immediate: true }); // 立即执行监听器以处理初始加载
  // total_size.value = result.data.length;
  total_size.value = 1;
// 修改 tag 字段
  result.data.tag = result.data.tag 
  // @ts-ignore
      ? result.data.tag.split(',').map(tag => tag.trim()) 
      : [];
  // console.log(result.data.tag)
  tableData.question_list = [result.data];
};
</script>

<template>
    <!-- <el-container> -->
      <el-aside width="7%">
  
      </el-aside>
      <!-- <el-container style="min-height: 105vh;"> -->

        <el-main>
  
          <el-card shadow="always" style="height: 100%;">
            <!-- 搜索框 -->
            <el-input v-model="searchContent" placeholder="搜索题目" class="input-with-select" size="large"
              @keydown.enter="searchQuestionData">
              <!-- <template #prepend> -->
                <el-button :icon="Search" @click="searchQuestionData" />
            </el-input>
            <el-scrollbar  style="height: 70vh; margin-top: 10px;">
            <!-- 题目列表 -->
            <el-table :data="tableData.question_list" style="width: 100%" v-loading="loading" table-layout="fixed"
              element-loading-text="加载中..." >
              <el-table-column label="#" style="max-width: 10%;"  #default="scope">
                {{ scope.row.ID }}
                <el-icon  v-if="passStatus[scope.row.unique_id]"><CircleCheckFilled /></el-icon>

              </el-table-column>
              <el-table-column label="题目" style="width: 20%;">
                <template #default="scope">
                  <el-button type="primary" @click="toProblemDetail(scope.row)" link>{{ scope.row.title}}</el-button>
                </template>
              </el-table-column>
              <el-table-column label="标签" style="width: 50%;"  #default="scope">
                <el-tag v-for="tag in scope.row.tag" :key="tag" class="ml-2">{{ tag }}</el-tag>
              </el-table-column>
              <el-table-column #default="scope" label="通过率" style="width: 10%;">
                <!-- {{ scope.row.passRate  }} % -->
                  100%
              </el-table-column>
              <el-table-column label="难度" style="width: 10%;">
                <template #default="scope">
                  <el-tag class="ml-2" v-show="scope.row.level == 1">简单</el-tag>
                  <el-tag class="ml-2" type="success" v-show="scope.row.level == 2">中等</el-tag>
                  <el-tag class="ml-2" type="warning" v-show="scope.row.level == 3">困难</el-tag>
                  <el-tag class="ml-2" type="danger" v-show="scope.row.level == 4">噩梦</el-tag>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination class="pagination" background layout="prev, pager,n ext" :total="total_size"
              :page-size="page_size" @current-change="changePage" :current-page="page" />
            </el-scrollbar>
  
  
          </el-card>
  
  
        </el-main>

      <!-- </el-container> -->
      <el-aside width="7%"></el-aside>
    <!-- </el-container> -->
  </template>
    
  
  <style lang="css">
  .pagination {
    justify-content: center;
    margin-top: 20px;
  
  }
  </style>
    