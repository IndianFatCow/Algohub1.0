<template>
	<div
	  class="p-4 items-center justify-center w-full rounded-xl group sm:flex space-x-6 bg-white bg-opacity-50 shadow-xl hover:rounded-2xl md:flex"
	  style="margin-bottom: 10px; height: 250px;"
	>
	  <!-- 封面图 -->
	  <!-- <img
		class="mx-auto block w-3/12 h-full rounded-lg"
		alt="art cover"
		loading="lazy"
		:src="blog.faceImage"
		style="object-fit: cover"
	  /> -->
  
	  <div class="sm:w-8/12 pl-0 p-5">
		<div class="space-y-2">
		  <!-- 标题 & 管理员标签 -->
		  <div class="space-y-4">
			<RouterLink :to="toBlogDetailUrl" class="text-md font-semibold text-cyan-900">
			  {{ post.title }}
			</RouterLink>
			<!-- <el-tag
			  v-for="tag in adminTags"
			  :key="tag.message"
			  :type="tag.type"
			  class="mx-1"
			  effect="dark"
			>
			  {{ tag.message }}
			</el-tag> -->
		  </div>
  
		  <!-- 普通标签 -->
		  <!-- <div>
			<el-tag class="mx-1" type="info" v-for="t in tags" :key="t" round>{{ t }}</el-tag>
		  </div> -->
  
		  <!-- 简要介绍 -->
		  <el-text class="mx-1" type="info">
			<RouterLink :to="toBlogDetailUrl" class="text-md font-semibold text-cyan-900">
			  {{ post.content.slice(0, 35) + '……' }}
			</RouterLink>
		  </el-text>
  
		  <!-- 作者 & 收藏/评论 控件 -->
		  <div class="flex items-center justify-between space-x-4">
			<div class="flex items-center gap-3">
			  <img :src="postUser.avatar || defaultAvatar" class="rounded-full h-8 w-8" />
			  <span class="text-sm">{{ postUser.nickname }}</span>
			</div>
  
			<div class="flex space-x-4">
			  <!-- 收藏 -->
			  <div
				class="flex items-center cursor-pointer"
				@click="toggleStar"
			  >
				<icon-star theme="two-tone" size="20" :fill="starColor" />
				<span class="ml-1 text-md" :style="{ color: starColor[0] }">{{ starCount }}</span>
			  </div>
  
			  <!-- 评论数 -->
			  <div class="flex items-center cursor-pointer">
				<icon-comment theme="two-tone" size="20" :fill="commentColor" />
				<span class="ml-1 text-md" :style="{ color: commentColor[0] }">{{ 111 }}</span>
			  </div>
			</div>
		  </div>
  
		  <!-- 发布时间 & 点赞 -->
		  <div class="flex items-center justify-between mt-4">
			<div class="flex items-center space-x-1">
			  <ClockCircleOutlined />
			  <span class="text-xs text-gray-500">{{ calculateTime() }}</span>
			</div>
  
			<div class="flex items-center space-x-1">
			  <div class="flex items-center cursor-pointer" @click="toggleLike">
				<icon-like theme="two-tone" size="20" :fill="likeColor" />
				<span class="ml-1 text-md" :style="{ color: likeColor[0] }">{{ likeCount }}</span>
			  </div>
			</div>
		  </div>
  
		  <!-- 话题链接 -->
		  <div class="mt-2">
			<el-link :href="topicUrl.get(blog.type)" type="primary">
			  话题：{{ topicText.get(blog.type) }}
			</el-link>
		  </div>
		</div>
	  </div>
	</div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue'
  import { useRouter, RouterLink } from 'vue-router'
  import { useUserInfoStore } from '@/stores/userInfo'
  import { likeResourceService, unlikeResourceService,getLikesCountService } from '@/api/like'
  import { getPostByIdService, queryPostsService } from '@/api/post'
  import { createCommentService, queryCommentsService, getCommentByIdService, updateCommentService, deleteCommentService } from '@/api/comment'
  import defaultAvatar from '@/assets/algo_logo.webp'
  import { ElMessage } from 'element-plus'
  import type { userInfo, Post, Like, Comment } from '@/lib/types'
  
  
  interface Props { post: Post }  // 确保传入的博客数据包含了（post）所有的字段
  const props = defineProps<Props>() //接受父组件传参
  const post = props.post
  
  const userInfoStore = useUserInfoStore()
  const postUseravatar = computed(() => userInfoStore.userinfo.avatar)
//   const postUser = computed(() => ({
// 	post.author,
// })) //动态更新用户
  
  // parse tags
//   const adminTags: AdminTag[] = post.adminTags ? JSON.parse(post.adminTags) : []
//   const tags = typeof post.tag === 'string' ? JSON.parse(post.tag) : post.tag || []
  
  // like & star state
  const getLikesCount = async (id: number) => {
	const res = await getLikesCountService(id, 'post')
	return res.data
  }
  const likeCount = ref(await getLikesCount(post.ID))
//   const liked = ref(blog.likeState === 1)
const liked = ref(true)
  const starCount = ref(blog.star)
  const starred = ref(blog.starState === 1)
  
  // button colors
  const likeColor = computed(() => (liked.value ? ['#f56c6c', '#ffffff'] : ['#9b9b9b', '#ffffff']))
  const starColor = computed(() => (starred.value ? ['#f5a623', '#ffffff'] : ['#9b9b9b', '#ffffff']))
  const commentColor = ref(['#9b9b9b', '#ffffff'])
  
  // topic maps
  const topicUrl = new Map<string, string>([
	['#all', '/blog/all'],
	['#other', '/blog/other'],
	['#question', '/blog/question'],
	['#technology', '/blog/technology'],
  ])
  const topicText = new Map<string, string>([
	['#all', '#全部'],
	['#other', '#其他闲聊'],
	['#question', '#题解讨论'],
	['#technology', '#技术杂谈'],
  ])
  
  // router
  const router = useRouter()
  const toBlogDetailUrl = `/BlogDetail/${blog.id}`
  
  // toggle like
  const toggleLike = async () => {
	try {
	  if (liked.value) {
		await unlikePost(blog.id, 'post')
		likeCount.value--
	  } else {
		await likePost(blog.id, 'post')
		likeCount.value++
	  }
	  liked.value = !liked.value
	} catch (err) {
	  ElMessage.error('操作失败，请稍后重试')
	}
  }
  
  // toggle star (subscribe)
  const toggleStar = async () => {
	try {
	  if (starred.value) {
		await unlikePost(blog.id, 'post')
		starCount.value--
	  } else {
		await likePost(blog.id, 'post')
		starCount.value++
	  }
	  starred.value = !starred.value
	} catch (err) {
	  ElMessage.error('操作失败，请稍后重试')
	}
  }
  
  // time formatter
  const calculateTime = () => {
	const postTs = new Date(blog.time).getTime()
	const diff = Date.now() - postTs
	const m = 60 * 1000,
	  h = 60 * m,
	  d = 24 * h,
	  w = 7 * d
  
	if (diff < h) return `${Math.floor(diff / m)} 分钟前`
	if (diff < d) return `${Math.floor(diff / h)} 小时前`
	if (diff < w) return `${Math.floor(diff / d)} 天前`
	return blog.time
  }
  </script>
  