<template>
  <form @submit.prevent="login">
    <h2>Вход</h2>
    <div class="input-group">
      <input
          type="email"
          v-model="loginForm.email"
          placeholder="Email"
          required
          :class="{'input-error': emailError}"
      />
      <span v-if="emailError" class="error-message">{{ emailError }}</span>
    </div>
    <div class="input-group">
      <input
          type="password"
          v-model="loginForm.password"
          placeholder="Пароль"
          required
          :class="{'input-error': passwordError}"
      />
      <span v-if="passwordError" class="error-message">{{ passwordError }}</span>
    </div>
    <button type="submit" class="btn">Войти</button>
    <p v-if="mainStore.loginError" class="error">{{ mainStore.loginError }}</p>
  </form>
</template>

<script>
import { mapStores } from 'pinia';
import { useMainStore } from '@/stores/main-store.js';

export default {
  name: 'LoginForm',
  data() {
    return {
      loginForm: {
        email: '',
        password: '',
      },
      emailError: '',
      passwordError: '',
    };
  },
  computed: {
    ...mapStores(useMainStore),
  },
  methods: {
    validateLogin() {
      this.emailError = '';
      this.passwordError = '';
      let isValid = true;

      // Валидация email
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(this.loginForm.email)) {
        this.emailError = 'Неверный формат email';
        isValid = false;
      }

      // Валидация пароля
      if (this.loginForm.password.length < 6) {
        this.passwordError = 'Пароль должен быть не менее 6 символов';
        isValid = false;
      }

      return isValid;
    },
    async login() {
      if (this.validateLogin()) {
        await this.mainStore.login(this.loginForm);
      }
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

h2 {
  text-align: center;
  margin-bottom: 15px;
  color: #333;
}

.input-group input {
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 14px;
  transition: 0.3s;
  width: 100%;
}

.input-group input:focus {
  outline: none;
  border-color: #007bff;
}

.btn {
  padding: 12px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: 0.3s;
}

.btn:hover {
  background-color: #0056b3;
}

.error-message {
  color: #dc3545;
  font-size: 12px;
}

.input-error {
  border-color: #dc3545;
}
</style>
