<script>
import  {ref} from "vue";
import {useBasketStore} from "@/stores/basket-store.js";
import {useMainStore} from "@/stores/main-store.js";

export default {
  name: "BasketCard",
  props:{
    product:{
      type: Object,
      required: true
    },
    groupCount:{
      type: Number,
      required: true
    },
    group:{
      type: Object,
      required: true
    },
  },
  mounted() {
    useMainStore().getCards()
  },
  data(){
    return {
      quantity: ref(this.groupCount),
      BasketStore: useBasketStore()
    };
  },
  methods: {
    increment(){
      this.quantity++;
      this.BasketStore.updateQuantity(this.product.product_id, 1);
    },
    decrement(){
      if(this.quantity > 1){
        this.quantity--;
        this.BasketStore.updateQuantity(this.product.id, -1)
      }
    },
    async removeProduct(productId){
      const productElement =document.getElementById(`product-${productId}`);
      if(productElement){
        productElement.style.transition = 'opacity 0.5s';
        productElement.style.opacity = 0;
      }
      setTimeout(async () => {
        for(const item of this.group.products){
          await this.BasketStore.removeFromBasket(item.id);
        }
        await this.BasketStore.getProducts();
      }, 500);
    },
  },
  computed:{
    imgSrc(){
      return `${import.meta.env.VITE_API_IMG}${this.product.image}`;
    },
  },
  watch:{
    groupCount(newCount){
      this.quantity = newCount;
    }
  }
}
</script>

<template>
  <div class="basket-card" :id="`product-${product.id}`">
    <img :src="imgSrc" alt="Product Image" class="product-image"/>
    <div class="product-info">
      <h3>{{ product.name }}</h3>
      <p>{{ product.description }}</p>
      <p class="price">₽{{ product.price }}</p>

      <div class="quantity-controls">
        <button :disabled="quantity === 1" @click="decrement">-</button>
        <span>{{ quantity }}</span>
        <button @click="increment">+</button>
      </div>

      <button @click="removeProduct(product.id)" class="remove-button">
        Удалить
      </button>
    </div>
  </div>
</template>

<style scoped>
.basket-card {
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: opacity 0.5s ease;
}

.product-image {
  max-width: 100%;
  height: auto;
  border-radius: 5px;
}

.product-info {
  text-align: center;
}

.price {
  font-size: 18px;
  color: green;
}

.quantity-controls {
  display: flex;
  justify-content: center;
  gap: 10px;
}

button {
  padding: 5px 10px;
  background-color: lightblue;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: deepskyblue;
}

.remove-button {
  background-color: red;
  color: white;
}

.remove-button:hover {
  background-color: darkred;
}
</style>