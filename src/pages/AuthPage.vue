<template>
  <div class="auth-container">
    <div class="auth-box">
      <div class="tabs">
        <router-link to="login" class="tab" :class="{ active: currentTab === 'login' }">Вход</router-link>
        <router-link to="register" class="tab" :class="{ active: currentTab === 'register' }">Регистрация</router-link>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuthPage',
  data() {
    return {
      currentTab: 'register',
    };
  },

  watch: {
    $route(to) {
      this.currentTab = to.name === 'login' ? 'login' : 'register';
    },
  },
};
</script>

<style scoped>

.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f4f4f4;
}

.auth-box {
  background: #fff;
  padding: 24px 32px;
  width: 400px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.tabs {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.tab {
  text-decoration: none;
  padding: 10px;
  font-size: 16px;
  color: #333;
  border-bottom: 2px solid transparent;
  transition: 0.3s ease-in-out;
}

.tab.active {
  color: #007bff;
  border-bottom: 2px solid #007bff;
}

.tab:hover {
  color: #007bff;
}
</style>
