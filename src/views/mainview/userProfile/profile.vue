<template>
    <el-container>
      <el-aside width="15%">
        <noticeBoard></noticeBoard>
      <!-- <template>
        <el-affix :offset="120">
          <el-button type="primary">Offset top 120px</el-button>
        </el-affix>
      </template> -->
  
      </el-aside>
      
        <el-main >
        <el-card >
            <!-- <el-divider /> -->
            <!-- <el-divider content-position="left">博客列表</el-divider> -->
            <!-- 博客列表 -->
            <!-- <div v-loading="blogListLoading" class="scrollable-content" ref="scrollContainer"> -->
                <Header/>
            <!-- <BlogHeader /> -->
            <!-- 搜索框 -->
            <el-input v-model="searchContent" placeholder="搜索内容回车确认" class="input-with-select" size="large"
              @keydown.enter="searchBlog" style="margin: 10px 0 10px 0;">
              <template #prepend>
                <el-button :icon="Search" />
              </template>
            </el-input>
              <!-- <blogCard v-for="item in blogList.items" :post="item" :key="item.instanceID" /> -->
              <blogCard v-for="item in postStore.posts" :post="item" :key="item.instanceID" />
              <el-divider></el-divider>
            <!-- </div> -->
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

       
      <el-aside width="15%" ></el-aside>
    </el-container>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue'
  import type { TabsPaneContext,ElAffix } from 'element-plus'
  import blogCard from '../Blog/components/blogCard.vue'
  // import BlogHeader from './components/BlogHeader.vue'
   import { getPostByIdService, queryPostsService } from '@/api/post'
  // import { queryCommentsService } from '@/api/comment'
  // import { useUserInfoStore } from '@/stores/userInfo'
  import { useRoute } from 'vue-router';
  import { Search } from '@element-plus/icons-vue'
  import Header from './profileHeader.vue'
  import { useUserInfoStore } from '@/stores/userInfo'
  import { usePostStore } from '@/stores/postStore'

  const postStore = usePostStore()
  const userStore = useUserInfoStore()


  const scrollContainer = ref(null)//滚动容器
  const { params } = useRoute()
  const searchContent = ref('')
  const blogListLoading = ref(true)
  const activeName = ref('first')
  // const blogList = ref<any>([])
  
  // const userStore = useUserInfoStore()
  
    
  const getBlogList = async () => {
    const res = await queryPostsService(10, 0,userStore.userinfo.username, undefined , undefined);
    // console.log(res.data);
    postStore.setPosts(res.data.items);
    console.log(postStore.posts);
  
    blogListLoading.value = false
  }
  getBlogList()
  const searchBlog = async () => {//搜索博客
    //实现模糊搜索，搜索标题和内容
      blogListLoading.value = true
      const res = await queryPostsService(10, 0,userStore.userinfo.username, searchContent.value, undefined);
      postStore.setPosts(res.data.data);
      console.log(postStore.posts);
      blogListLoading.value = false
  
  
  }
  
  const handleClick = (tab: TabsPaneContext, event: Event) => { //选项卡点击事件
    console.log(tab, event)
  
  }
  </script>
  <style>
  .scrollable-content {
    /* overflow-y: auto; */
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
    /* padding: 32px; */
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
  }
  </style>
    