import { defineStore } from "pinia";
import {ref, computed} from 'vue';
import { useRouter } from "vue-router";

export const useMainStore = defineStore('main', {
    state:() => ({
        token: localStorage.getItem("token") || null,
        loginError: null,
        router: useRouter(),
    }),
    getters: {
      isAuthenticated: (state) => !!state.token,
    },
    actions: {
        async login(data) {
            try {
              const response = await fetch(`${import.meta.env.VITE_API_URL}login`, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(data),
              });
              if (!response.ok) {
                  if (response.status === 401) {
                      this.loginError = 'Неверные введенные данные';
                      return;
                  }else {
                      throw new Error('Ошибка при входе');
                  }
              }
              const result = await response.json();
              this.token = result.data.user_token;
              localStorage.setItem("token", this.token);
              this.loginError = null;
              await this.router.push('/');
            }catch(error) {
                console.log('Ошибка при входе:',error);
                this.loginError = 'Ошибка при входе';
            }
        },
        async register(data) {
            try{
                const response = await fetch(`${import.meta.env.VITE_API_URL}signup`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
                const result = await response.json();

                if (!response.ok) {
                    if (response.status === 422) {
                        alert('Данная почта занята');
                    }else {
                        console.error('Ошибка при регистрации:', result.message || 'Неизвестная ошибка');
                    }
                    return;
                }
                this.token = result.data.user_token;
                localStorage.setItem('token', this.token);
                await this.router.push('/');
            }catch (error) {
                console.error('Ошибка при регистрации:', error);
                alert('Произошла ошибка при регистрации');
            }
        },
        async logout() {
            try{
                const response = await fetch(`${import.meta.env.VITE_API_URL}logout`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                    },
                });
                await this.router.push('/');
                this.token = null;
                localStorage.removeItem('token');
                console.log('Выход выполнен успешно');
            }catch (error) {
                console.error('Ошибка при выходе:', error);
            }
        }
    }
})