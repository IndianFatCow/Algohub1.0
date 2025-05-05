<template>
  <el-card class="profile-header" shadow="never" body-style="{ padding: 0 }">
    <!-- 灰色背景区 + IP 属地 -->
    <div class="header-bg">
      <el-badge
        class="ip-badge"
        :value="`IP 属地：${ipLocation}`"
        type="info"
      />
    </div>

    <div class="profile-main">
      <!-- 头像 + 基本信息 -->
      <div class="left">
        <el-avatar :src="userStore.avatar"  @click="()=>{router.push('/userCenter/avatar')}" style="cursor: pointer" shape="square" class="avatar"/>
        <div class="info">
          <h2 class="name">{{ userStore.nickname }}</h2>
          <p class="bio">{{ userStore.bio }}</p>
          <el-button type="primary" size="small" @click="onEditProfile" v-if="isUser">
            编辑个人资料
          </el-button>
        </div>
      </div>

      <!-- 统计数据 -->
      <div class="right">
        <el-statistic
          class="stat"
          title="关注"
          :value="followingCount"
          :precision="0"
        />
        <el-statistic
          class="stat"
          title="粉丝"
          :value="followersCount"
          :precision="0"
        />
        <el-statistic
          class="stat"
          title="文章"
          :value="articleCount"
          :precision="0"
        />
      </div>
    </div>
  </el-card>
</template>

<script setup>
import { defineProps, defineEmits,ref } from 'vue'
import { useUserInfoStore } from '@/stores/userInfo'
import { useRouter,useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
const isUser = ref(false)
// 获取路由参数（动态参数）
const username = route.params.username
const userStore = useUserInfoStore().userinfo
if(username === userStore.username ){
  isUser.value = true
}
const props = defineProps({
  articleCount: { type: Number, default: 78 },
})
  const followersCount = ref(0)
  const followingCount = ref(0)

  const ipLocation = ref('')
// 需要做跨域处理
// 使用 fetch 获取 IP 信息
fetch('http://ip-api.com/json/')
  .then(response => response.json())
  .then(data => {
    console.log('IP 属地信息:', data);
    // 示例输出：{ city: "Beijing", regionName: "Beijing", country: "China", ... }
    // alert(`您来自：${data.city}, ${data.regionName}, ${data.country}`);
    ipLocation.value = ( data.country === 'China') ? data.regionName : data.country
  })
  .catch(error => console.error('获取 IP 属地失败:', error));

const emit = defineEmits(['edit-profile'])
const onEditProfile = () => {
  // emit('edit-profile')

  router.push('/userCenter/info')
}
</script>

<style scoped>
.profile-header {
  border-radius: 8px;
  overflow: hidden;
}

/* 灰色背景区 */
.header-bg {
  height: 80px;
  /* background-color: #dbdada; */
  /* background-image: url('@/assets/algo_logo.webq'); */
  /* background-image: url('@/assets/sunrise.jpg'); */
  background-image: url('@/assets/frosty-night.jpg');
  background-size: cover;
  position: relative;
}

/* IP 属地 标签 */
.ip-badge {
  position: absolute;
  top: 12px;
  left: 12px;
}

/* 主体内容区 */
.profile-main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
}

/* 左侧：头像 + 文字 */
.left {
  display: flex;
  align-items: center; 
}
.avatar {
  cursor: pointer;
  border-radius: 8px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
  width: 80px;
  height: 80px;
}
.info {
  margin-left: 16px;
}
.name {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
}
.bio {
  margin: 4px 0 8px;
  color: #666;
  font-size: 14px;
}

/* 右侧：统计数字 */
.right {
  display: flex;
  gap: 24px;
}
.stat .el-statistic__value {
  font-size: 18px;
  font-weight: 500;
}
</style>
