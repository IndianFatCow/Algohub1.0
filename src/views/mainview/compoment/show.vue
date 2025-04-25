<template>
  <el-container class="welcome-container" width="100%">
    <el-main>
      <section class="hero-section">
        <div class="content">
          <h1 class="main-title">AlgoHub</h1>
          <h2 class="subtitle">你的一站式算法平台</h2>

          <p class="description">
            欢迎来到 <strong>AlgoHub</strong>！
            本站是一个面向计算机程序设计的在线评测系统，提供各种题目的在线测评和社区服务，
            旨在为用户提供一个高效、方便、丰富的学习和竞赛平台。
          </p>

          <div class="button-group">
            <div class="button-wrapper">
              <el-button type="primary" round size="large" @click="goToCode">
                Code Now
              </el-button>
              <span class="badge">开发版本1.0</span>
            </div>
            <a href="#" class="secondary-link">查看源代码</a>
          </div>
        </div>
      </section>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
const goToCode = () => {
  window.location.href = "/question-bank";
};
</script>

<style scoped>
.welcome-container {
  min-height: 10vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-section {
  width: 100%;
  background-color: #fff;
  padding: 4rem 2rem;
}

.content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.main-title {
  font-size: 4rem;
  font-weight: 800;
  color: #111;
  margin-bottom: 0.5rem; /* 控制和 subtitle 的间距 */
}

.subtitle {
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(to right, #6366f1, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-top: 0.5rem;
}

.description {
  margin-top: 2rem;
  font-size: 1.2rem;
  color: #4b5563;
  line-height: 1.8;
}

.button-group {
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.button-wrapper {
  position: relative;
}

.badge {
  position: absolute;
  top: -10px;
  right: -20px;
  background-color: #34d399;
  color: white;
  font-size: 0.75rem;
  padding: 2px 8px;
  border-radius: 9999px;
  white-space: nowrap;
}

.secondary-link {
  font-size: 0.9rem;
  color: #6366f1;
  text-decoration: none;
}
</style>
