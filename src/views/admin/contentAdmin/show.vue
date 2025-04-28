<template>
    <div>
      <!-- 导航栏 -->
      <el-header class="nav-bar">
        <h1>我的应用</h1>
      </el-header>
  
      <!-- 内容区域，用于模拟滚动 -->
      <div class="scrollable-content" ref="scrollContainer">
        <p v-for="item in 50" :key="item">这是内容行 {{ item }}</p>
      </div>
  
      <!-- 返回顶部按钮 -->
      <el-backtop target=".scrollable-content" :bottom="100">
        <div
          style="
            height: 100%;
            width: 100%;
            background-color: #f2f5f6;
            box-shadow: 0 0 6px rgba(0,0,0,.12);
            text-align: center;
            line-height: 40px;
            color: #1989fa;
          "
        >
          UP
        </div>
      </el-backtop>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // 内容容器引用
  const scrollContainer = ref(null);
  </script>
  
  <style scoped>
  .nav-bar {
    background-color: #b3c0d1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .scrollable-content {
    height: 400px; /* 确保有滚动条 */
    overflow-y: auto;
    padding: 15px;
    border: 1px solid #ccc;
  }
  </style>
  