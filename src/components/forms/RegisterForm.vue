<template>
  <form @submit.prevent="register">
    <h2>Регистрация</h2>
    <div class="input-group">
      <input
          type="text"
          v-model="registerForm.fio"
          placeholder="ФИО"
          required
          :class="{'input-error': fioError}"
      />
      <span v-if="fioError" class="error-message">{{ fioError }}</span>
    </div>
    <div class="input-group">
      <input
          type="email"
          v-model="registerForm.email"
          placeholder="Email"
          required
          :class="{'input-error': emailError}"
      />
      <span v-if="emailError" class="error-message">{{ emailError }}</span>
    </div>
    <div class="input-group">
      <input
          type="password"
          v-model="registerForm.password"
          placeholder="Пароль (6-20 символов)"
          required
          :class="{'input-error': passwordError}"
      />
      <span v-if="passwordError" class="error-message">{{ passwordError }}</span>
    </div>
    <button type="submit" class="btn">Зарегистрироваться</button>
  </form>
</template>

<script>
import { mapStores } from 'pinia';
import { useMainStore } from '@/stores/main-store.js';

export default {
  name: 'RegisterForm',
  data() {
    return {
      registerForm: {
        fio: '',
        email: '',
        password: '',
      },
      emailError: '',
      passwordError: '',
      fioError: '',
    };
  },
  computed: {
    ...mapStores(useMainStore),
  },
  methods: {
    validateRegister() {
      this.emailError = '';
      this.passwordError = '';
      this.fioError = '';
      let isValid = true;

      // Валидация ФИО
      if (!this.registerForm.fio || this.registerForm.fio.trim().length === 0) {
        this.fioError = 'ФИО обязательно';
        isValid = false;
      }

      // Валидация email
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(this.registerForm.email)) {
        this.emailError = 'Неверный формат email';
        isValid = false;
      }

      // Валидация пароля
      if (this.registerForm.password.length < 6 || this.registerForm.password.length > 20) {
        this.passwordError = 'Пароль должен быть от 6 до 20 символов';
        isValid = false;
      }

      return isValid;
    },
    async register() {
      if (this.validateRegister()) {
        await this.mainStore.register(this.registerForm);
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
  color: white;
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
