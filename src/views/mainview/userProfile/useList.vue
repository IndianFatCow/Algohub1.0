<template>
    <div class="follow-list">
      <el-card
        v-for="user in users"
        :key="user.username"
        class="user-card"
      >
        <div class="user-info">
          <el-avatar
            :src="user.avatar"
            class="avatar"
            @click="goToProfile(user.username)"
          />
          <div class="meta">
            <div class="name" @click="goToProfile(user.username)">{{ user.nickname }}</div>
            <div class="bio">{{ truncate(user.bio, 20) }}</div>
            <div class="followers">{{ user.followers }} 粉丝</div>
          </div>
          <el-button
            class="follow-btn"
            size="small"
            :type="user.subscribed ? 'info' : 'primary'"
            @click="toggleSubscribe(user)"
            @mouseenter="user.hovering = true"
            @mouseleave="user.hovering = false"
          >
            {{ user.subscribed ? (user.hovering ? '取消关注' : '已关注') : '关注他' }}
          </el-button>
        </div>
      </el-card>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import {
    getSubscribeList,
    subscribeUser,
    unsubscribeUser
  } from '@/api/subscribe';
  
  const router = useRouter();
  const users = ref<any[]>([]);
  const props = defineProps({
    user: {
      type: Object,
      required: true
    }
  });
  
  const currentUsername = 'your-username'; // 从store或props中获取当前登录用户
  
  onMounted(async () => {
    const res = await getSubscribeList(currentUsername, 'user');
    users.value = res.data.map((u: any) => ({
      ...u,
      subscribed: true,
      hovering: false
    }));
  });
  
  const truncate = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };
  
  const goToProfile = (username: string) => {
    router.push(`/profile/${username}`);
  };
  
  const toggleSubscribe = async (user: any) => {
    if (user.subscribed) {
      await unsubscribeUser(user.username);
      user.subscribed = false;
    } else {
      await subscribeUser(user.username);
      user.subscribed = true;
    }
  };
  </script>
  
  <style scoped>
  .follow-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  
  .user-card {
    display: flex;
    align-items: center;
    padding: 12px;
  }
  
  .user-info {
    display: flex;
    align-items: center;
    width: 100%;
  }
  
  .avatar {
    cursor: pointer;
    margin-right: 16px;
  }
  
  .meta {
    flex-grow: 1;
  }
  
  .name {
    font-weight: bold;
    cursor: pointer;
    font-size: 16px;
  }
  
  .bio {
    color: #666;
    font-size: 14px;
    margin-top: 4px;
  }
  
  .followers {
    color: #999;
    font-size: 12px;
    margin-top: 4px;
  }
  
  .follow-btn {
    min-width: 80px;
  }
  </style>
  