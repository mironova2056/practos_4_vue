
<template>
  <header class="header">
    <div class="header-inner">
      <router-link to="/" class="logo">
        <img src="@/assets/logo.png" alt="logo"/>
      </router-link>
      <nav class="header-nav">
        <template v-if="mainStore.isAuthenticated">
          <router-link to="/basket" class="li">Корзина</router-link>
          <router-link to="/orders" class="li">Заказы</router-link>
          <button @click="mainStore.logout" class="btn">Выйти</button>
        </template>
        <router-link v-else to="/auth" class="li">
          <span>Ругистрация/Вход</span>
        </router-link>
      </nav>
    </div>
  </header>
</template>

<script>
import { mapStores } from 'pinia';
import { useMainStore } from '@/stores/main-store.js';

export default {
  name: "TheHeader",
  computed:{
    ...mapStores(useMainStore),
  },
};
</script>

<style scoped>

.header {
  background-color: #f8f9fa;
  padding: 12px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.logo img {
  height: 40px;
  width: auto;
}

.header-nav {
  display: flex;
  align-items: center;
  gap: 15px;
}

.li {
  text-decoration: none;
  color: #333;
  font-size: 16px;
  transition: color 0.3s;

  &:hover {
    color: #007bff;
  }
}

.btn {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #c82333;
  }
}
</style>