<template>
  <el-container>
    <el-aside width="20%">
      <noticeBoard></noticeBoard>

    </el-aside>
    <el-container style="min-height: 105vh;">
      <el-header>

      </el-header>
      <el-main>

        <el-card shadow="always" style="height: 100%">
          <BlogHeader />
          <!-- 搜索框 -->
          <el-input v-model="searchContent" placeholder="搜索内容回车确认" class="input-with-select" size="large"
            @keydown.enter="searchBlog" style="margin: 10px 0 10px 0;">
            <template #prepend>
              <el-button :icon="Search" />
            </template>
          </el-input>
          <el-divider />
          <div v-loading="blogListLoading">
            <blogCard v-for="item in blogList.items" :post="item" :key="item.instanceID" />
            <!-- <blogCard v-if="blogList.items && blogList.items.length > 0" :post="blogList.items[0]"/> -->
          </div>

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
import type { TabsPaneContext } from 'element-plus'
import blogCard from './components/blogCard.vue'
// import BlogHeader from './components/BlogHeader.vue'
 import { getPostByIdService, queryPostsService } from '@/api/post'
// import { queryCommentsService } from '@/api/comment'
// import { useUserInfoStore } from '@/stores/userInfo'
import { useRoute } from 'vue-router';
import { Search } from '@element-plus/icons-vue'

import show from '../compoment/show.vue'
// import { usePostStore } from '@/stores/postStore'
// const postStore = usePostStore()


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

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)

}
</script>
<style>
.demo-tabs>.el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
  