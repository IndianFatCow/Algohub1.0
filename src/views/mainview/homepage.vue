<script setup>
import { createApp, ref } from 'vue';
import { ElButton, ElInput, ElAvatar, ElDropdown, ElDropdownItem, ElDropdownMenu, ElContainer, ElHeader, ElMain, ElMenu, ElMenuItem, ElTabs, ElTabPane, ElCard } from 'element-plus';
import {
    Management,
    Promotion,
    UserFilled,
    User,
    Crop,
    EditPen,
    SwitchButton,
    CaretBottom,
    Back,
    Menu,
    Search,
} from '@element-plus/icons-vue'
import { useAuthStore } from '@/store/store';
import { useTokenStore } from '@/store/token';
import { userLogoutService } from '@/api/user';
import { useUserInfoStore } from '@/stores/userInfo';
//头像条目点击后的处理
import { useRouter } from 'vue-router'
const router = useRouter();
const authStore = useAuthStore();
const tokenStore = useTokenStore()
const userInfoStore = useUserInfoStore();

const searchText = ref('');
const handleSearch = () => {
  if (searchText.value.trim() === '') {
    return;
  }
  // 跳转到搜索结果页面
  
};

import miniCenter from './userCenter/miniCenter.vue';
</script>
<template>
  <el-container>
    <!-- 顶部栏 -->
    <el-header class="header">
      <div class="nav-left"  >
        <el-menu mode="horizontal" router :ellipsis="false">
          <el-menu-item index="/show">Algohub</el-menu-item>
          <el-menu-item index="/home">首页</el-menu-item>
          <el-menu-item index="/question-bank">题库</el-menu-item>
          <el-menu-item index="/profile">个人主页</el-menu-item>
          <el-menu-item index="/qa">问答</el-menu-item>
          <!-- <el-menu-item index="/visual-algo">Visual-algo</el-menu-item> -->
        </el-menu>
      </div>
      <!-- <div class="nav-center">
        <el-input placeholder="查找题目文章动态" class="search-bar">
          <template #append>
            <el-button>搜索</el-button>
          </template>
        </el-input>
      </div> -->

      <div class="nav-center">
        <el-input 
          v-model="searchText"
          placeholder="查找题目文章动态" 
          class="search-bar"
          @keydown.enter="handleSearch">

          <template #prepend>
            <span style="display: flex; align-items: center;">
          <el-icon class="el-input__icon"><Search /></el-icon>
            </span> 
            <el-select v-model="searchType" placeholder="请选择">
              <el-option label="用户" value="users"></el-option>
              <el-option label="题目" value="problems"></el-option>
              <el-option label="动态" value="activities"></el-option>
            </el-select>
          </template>
          <template #append>
            <el-button @click="handleSearch">搜索</el-button>
          </template>
          </el-input>
        </div>

      <div class="nav-right">
          <miniCenter/>
      </div>
    </el-header>
    
    <!-- 主体内容 -->
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 20px; /* 上下也加 padding，撑开区域 */
  background: #ffffff; /* 更白的白色 */
  box-shadow: 0 2px 4px rgba(0,0,0,0.05); /* 添加阴影让它看起来像独立头部 */
}

.nav-left {
  display: flex;
  align-items: center;
}

/* .nav-center {
  display: flex;
  align-items: center;
  gap: 15px;
}

.search-bar {
  width: 250px;
} */
 /* 居中搜索栏 */
.nav-center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 40%; /* 根据需要调整宽度 */
  display: flex;
  justify-content: center;
}

/* 搜索栏样式 */
.search-bar {
  width: 100%;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
}
</style>

<!-- <style lang="scss" scoped>
  /* 让主体内容居中，并限制最大宽度 */
  .el-main {
    display: flex; /* 使用 flex 让内容居中 */
    flex-direction: column; /* 让内容纵向排列 */
    align-items: center; /* 水平居中 */
    justify-content: center; /* 垂直居中（适用于高度自适应的场景） */
    max-width: 800px; /* 限制最大宽度，防止内容过宽 */
    margin: 20px auto; /* 上下 20px，左右自动居中 */
    padding: 20px; /* 添加适当内边距，防止内容贴边 */
  }

  /* 个人信息卡片 */
  .el-card {
    width: 100%; /* 让卡片宽度自适应父容器 */
    padding: 20px; /* 让卡片内部内容有间距 */
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* 添加轻微阴影，增加层次感 */
    border-radius: 8px; /* 圆角优化 UI */
  }

  /* 个人信息容器 */
  .profile-container {
    display: flex; /* 让头像和信息并排 */
    align-items: center; /* 让头像和文字对齐 */
    gap: 15px; /* 头像和文字之间的间距 */
  }

  /* 头像样式 */
  .el-avatar {
    border: 2px solid #ddd; /* 添加边框，让头像更明显 */
  }

  /* 个人信息文本部分 */
  .profile-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  /* 标签页样式 */
  .el-tabs {
    width: 100%; /* 让 Tabs 组件自适应 */
    margin-top: 20px; /* 增加与上方的间距 */
  }

  /* 题目卡片样式 */
  .el-tab-pane .el-card {
    margin-top: 10px; /* 让题目列表有一些间距 */
  }

</style> -->
