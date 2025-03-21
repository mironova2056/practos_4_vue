<template>
  <div class="product-card">
    <img :src="imgSrc" alt="product image" class="product-image" />
    <div class="product-details">
      <h3 class="product-title">{{ card.name }}</h3>
      <p class="product-description">{{ card.description }}</p>
      <div class="product-price">{{ card.price }} ₽</div>
      <button
          v-if="isAuthenticated"
          class="btn add-to-cart"
          @click="addToBasket"
      >
        Добавить в корзину
      </button>
      <button
          v-else
          class="btn login-btn"
          @click="goToLogin"
      >
        Войти для добавления в корзину
      </button>
    </div>
  </div>
</template>

<script>
import {useBasketStore} from "@/stores/basket-store.js";
import {useMainStore} from "@/stores/main-store.js";
import {useRouter} from "vue-router";

export default {
  name: "ProductCard",
  props:{
    card:{
      type:Object,
      required: true
    },
  },
  data(){
    return{
      basketStore:useBasketStore(),
      mainStore:useMainStore(),
      router:useRouter()
    };
  },
  computed:{
    imgSrc(){
      return `${import.meta.env.VITE_API_IMG}${this.card.image}`;
    },
    isAuthenticated(){
      return this.mainStore.isAuthenticated;
    }
  },
  methods:{
    async addToBasket(){
      try {
        await this.basketStore.addToBasket(this.card.id);
        alert('Товар добавлен в корзину!');
      } catch (error) {
        alert('Ошибка при добавлении товара в корзину.');
      }
    },
    goToLogin(){
      this.router.push('/auth/login');
    }
  }
}
</script>

<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin: 16px;
  width: 250px;
  transition: transform 0.3s ease;
}

.product-card:hover {
  transform: translateY(-10px);
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.product-details {
  padding: 12px;
}

.product-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
}

.product-description {
  font-size: 14px;
  color: #777;
  margin-bottom: 8px;
}

.product-price {
  font-size: 16px;
  font-weight: bold;
  color: #007bff;
  margin-bottom: 12px;
}

.add-to-cart,
.login-btn {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 8px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 6px;
  transition: background-color 0.3s;
}

.add-to-cart:hover {
  background-color: #218838;
}

.login-btn {
  background-color: #dc3545;
}

.login-btn:hover {
  background-color: #c82333;
}
</style>