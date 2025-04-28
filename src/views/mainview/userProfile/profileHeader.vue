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
        <el-avatar :src="avatarUrl" size="80" />
        <div class="info">
          <h2 class="name">{{ username }}</h2>
          <p class="bio">{{ bio }}</p>
          <el-button type="primary" size="small" @click="onEditProfile">
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
import { defineProps, defineEmits } from 'vue'
import { useUserInfoStore } from '@/stores/userInfo'
const props = defineProps({
  avatarUrl: { type: String, default: '' },
  username: { type: String, default: '前度' },
  bio: {
    type: String,
    default: '互联网冲浪好手，关注世间万物'
  },
  followingCount: { type: Number, default: 123 },
  followersCount: { type: Number, default: 456 },
  articleCount: { type: Number, default: 78 },
  ipLocation: { type: String, default: '江苏' }
})

const emit = defineEmits(['edit-profile'])
const onEditProfile = () => {
  emit('edit-profile')
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
  background-color: #c0c0c0;
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
