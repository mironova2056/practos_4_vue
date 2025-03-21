import { defineStore } from 'pinia';
import { useMainStore } from '@/stores/main-store.js'; 

export const useBasketStore = defineStore('BasketStore', {
    state: () => ({
        basketProducts: [],
        ordersProducts: [],
    }),

    getters: {
        getBasketProducts: (state) => state.basketProducts,
    },

    actions: {
        getToken() {
            const mainStore = useMainStore();
            return mainStore.token;
        },
        async addToBasket(productId) {
            const token = this.getToken();
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}cart/${productId}`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                await this.getProducts();
            } catch (error) {
                console.error('Ошибка при добавлении товара в корзину:', error);
            }
        },
        async removeFromBasket(productId) {
            const token = this.getToken();
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}cart/${productId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                await this.getProducts();
            } catch (error) {
                console.error('Ошибка при удалении товара из корзины:', error);
            }
        },
        async getProducts() {
            const token = this.getToken();
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}cart`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const data = await response.json();
                this.basketProducts = data.data.map(item => {
                    item.quantity = item.quantity || 1;
                    return item;
                });
            } catch (error) {
                console.error('Ошибка при получении корзины:', error);
            }
        },
        async getOrders() {
            const token = this.getToken();
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}order`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const data = await response.json();
                console.log(data)
                this.ordersProducts = data.data
            } catch (error) {
                console.error('Ошибка при получении корзины:', error);
            }
        },
        async addToOrders() {
            const token = this.getToken();
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}order`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                await this.getOrders();
                return response.data;
            } catch (error) {
                console.error('Ошибка при добавлении заказа:', error);
            }
        },

        async updateQuantity(productId, quantityChange) {
            if (quantityChange > 0) {
                await this.addToBasket(productId);
            } else {
                await this.removeFromBasket(productId);
            }
        },
    },
});
