<template>
  <el-container>
    <el-aside width="20%">
      <noticeBoard></noticeBoard>
    <!-- <template>
      <el-affix :offset="120">
        <el-button type="primary">Offset top 120px</el-button>
      </el-affix>
    </template> -->

    </el-aside>
    <el-container style="min-height: 105vh;">
      <el-header style="max-height: 10px;" >
      </el-header>
      <el-main>

        <el-card shadow="always" style="height: 100%">
          <!-- <BlogHeader /> -->
          <!-- 搜索框 -->
          <el-input v-model="searchContent" placeholder="搜索内容回车确认" class="input-with-select" size="large"
            @keydown.enter="searchBlog" style="margin: 10px 0 10px 0;">
            <template #prepend>
              <el-button :icon="Search" />
            </template>
          </el-input>
          <!-- <el-divider /> -->
          <!-- 博客列表 -->
          <div v-loading="blogListLoading" class="scrollable-content" ref="scrollContainer">
            <blogCard v-for="item in blogList.items" :post="item" :key="item.instanceID" />
          </div>
            <!-- 返回顶部按钮 -->
            <el-backtop
            target=".scrollable-content"
            :bottom="100"
            :visibility-height="300"
            :right="50"
          >
            <div
              style="
                height: 100%;
                width: 100%;
                background-color: #f2f5f6;
                box-shadow: 0 0 6px rgba(0,0,0,.12);
                text-align: center;
                line-height: 40px;
                color: #1989fa;
                border-radius: 50%;
              "
            >
              ↑
            </div>
          </el-backtop>
        </el-card>
        
      </el-main>
      <el-footer>


      </el-footer>
    </el-container>
    <el-aside width="20%"></el-aside>
  </el-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { TabsPaneContext,ElAffix } from 'element-plus'
import blogCard from './components/blogCard.vue'
// import BlogHeader from './components/BlogHeader.vue'
 import { getPostByIdService, queryPostsService } from '@/api/post'
// import { queryCommentsService } from '@/api/comment'
// import { useUserInfoStore } from '@/stores/userInfo'
import { useRoute } from 'vue-router';
import { Search } from '@element-plus/icons-vue'

// import show from '../compoment/show.vue'
import { usePostStore } from '@/stores/postStore'
const postStore = usePostStore()

const scrollContainer = ref(null)//滚动容器
const { params } = useRoute()
const searchContent = ref('')
const blogListLoading = ref(true)
const activeName = ref('first')
const blogList = ref<any>([])

// const userStore = useUserInfoStore()

  
const getBlogList = async () => {
  const res = await queryPostsService(10, 0, undefined , undefined);
  // console.log(res.data);
  blogList.value = res.data
  // console.log(blogList.value);
  // console.log(blogList.value.items[0]);
  blogListLoading.value = false
}
getBlogList()
const searchBlog = async () => {//搜索博客
  //实现模糊搜索，搜索标题和内容
    blogListLoading.value = true
    const res = await queryPostsService(10, 0, searchContent.value, undefined);
    blogList.value = res.data.data
    blogListLoading.value = false
    console.log(blogList.value);

}

const handleClick = (tab: TabsPaneContext, event: Event) => { //选项卡点击事件
  console.log(tab, event)

}
</script>
<style>
.scrollable-content {
  max-height: 70vh; /* 让内容区可以滚动 */
  overflow-y: auto;
  padding: 10px;
}

/* 额外可以加点细节，让滚动条更好看 */
.scrollable-content::-webkit-scrollbar {
  width: 6px;
}
.scrollable-content::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}
.demo-tabs>.el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
  