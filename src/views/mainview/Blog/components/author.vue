<template>
    <div class="author-wrapper">
      <el-popover
        trigger="hover"
        placement="bottom"
        width="200"
        popper-class="author-popover"
      >
        <!-- 悬浮卡片内容 -->
        <div class="popover-content">
          <div>
          <el-avatar :src="avatarUrl" style="float: left;"/>
          <p >{{ user.nickname }}</p>
          <p >{{ user.bio }}</p>
          </div>
          
          <div class="popover-actions">
            <el-button
              size="mini"
              type="primary"
              @click="subscribeChoice"
            >{{ isFollowed ? '已关注' : '+ 关注' }}</el-button>
            <el-button size="mini" @click="onMessage">私信</el-button>
          </div>
        </div>
        <!-- 触发区域：始终可见的头像 & 昵称 -->
        <template #reference>
          <div>
          <el-avatar :src="avatarUrl" />
          <span>{{ user.nickname }}</span>
           <!-- <p>{{ user.nickname}}</p> -->
          </div>
        </template>
      </el-popover>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, computed, onMounted } from 'vue'
  import { ElMessage } from 'element-plus'
  import defaultAvatar from '@/assets/algo_logo.webp'
  import type { userInfo } from '@/lib/types'
  import { checkSubscribe,subscribeUser,unsubscribeUser} from '@/api/subscribe'
  import { useUserInfoStore } from '@/stores/userInfo'
import { User } from '@icon-park/vue-next'
  const isFollowed = ref(true)
  const props = defineProps<{
    user: userInfo
  }>()
  const emit = defineEmits<{
    (e: 'follow', username: string): void
    (e: 'message', username: string): void
  }>()
  onMounted( () => {
    checkSubscribe(props.user.username).then((res) => {
      console.log(res)
      isFollowed.value = res.data
    })
  })
  // 头像 URL 计算
  const avatarUrl = computed(() =>
    props.user.avatar !== 'abandoned' ? props.user.avatar : defaultAvatar
  )
  
  // 点击关注
  function onFollow() {
    emit('follow', props.user.username)
  }
  
  // 点击私信
  function onMessage() {
    emit('message', props.user.username)
  }
  // 关注
const subscribeChoice =async () => {//关注
    if(isFollowed.value){
      console.log("取消关注")
       await unSubscribe()
    }else{
      console.log("关注")
       await subscribe()
    }
}

const unSubscribe =async () => {// 取消关注
    if (useUserInfoStore().$state.isLogin) {
        const res =await unsubscribeUser(props.user.username)
            ElMessage({
                message: res.message,
                type: 'success'
            })
          isFollowed.value = false
            // location.reload()

    }else{
        ElMessage.error("请先登录！")
    }

}
const subscribe =async () => {
    if (useUserInfoStore().$state.isLogin) {
      console.log(props.user.username)
        const res =await subscribeUser(props.user.username)
        console.log(res)
          ElMessage({
              message: res.message,
              type: 'success'
          })
        isFollowed.value = true
            // location.reload()
        
    }else{
        ElMessage.error("请先登录！")
    }

}
  </script>
  
  <style scoped>

  </style>
  