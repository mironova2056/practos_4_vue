<script>
import BasketCard from "@/components/BasketCard.vue";
import {useBasketStore} from "@/stores/basket-store.js";
import {useRouter} from "vue-router";

export default {
  name: "BasketPage",
  components: {
    BasketCard,
  },
  data() {
    return {
      BasketStore: useBasketStore(),
      router: useRouter(),
    };
  },
  computed: {
    groupedProducts() {
      return this.BasketStore.basketProducts.reduce((acc, product) => {
        if (!acc[product.product_id]) {
          acc[product.product_id] = {products: [], count: 0};
        }
        acc[product.product_id].products.push(product);
        acc[product.product_id].count += product.quantity;
        return acc;
      }, {});
    }
  },
  methods: {
    async loadProducts() {
      await this.BasketStore.getProducts();
    },
    async checkoutWithAnimation() {
      const basketItems = document.querySelectorAll('.basket-item');
      basketItems.forEach(item => {
        item.classList.add('fade-out');
      });
      setTimeout(async () => {
        await this.BasketStore.addToOrders();
        this.BasketStore.basketProducts = [];
        this.router.push('/orders');
      }, 500);
    }
  },
  mounted() {
    this.loadProducts();
  }
};
</script>

<template>
  <div class="container">
    <!-- Кнопка оформления заказа -->
    <div class="catalog">
      <button
          v-show="BasketStore.basketProducts.length > 0"
          @click="checkoutWithAnimation"
      >
        Оформить заказ
      </button>
    </div>

    <!-- Секция товаров в корзине -->
    <section class="catalog-section">
      <h1 v-if="BasketStore.basketProducts.length === 0" class="empty-cart">
        Корзина пуста
      </h1>

      <div v-else class="product-container">
        <div
            v-for="(group, productId) in groupedProducts"
            :key="productId"
            class="product-group"
        >
          <basket-card
              v-for="product in group.products.slice(0, 1)"
              :group-count="group.count"
              class="basket-item"
              :group="group"
              :product="product"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.catalog {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}

.catalog button {
  padding: 10px 20px;
  background-color: #3b82f6;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.catalog button:hover {
  background-color: #2563eb;
}

.catalog-section {
  padding: 20px 0;
}

.empty-cart {
  text-align: center;
  font-size: 24px;
  color: gray;
  margin-top: 50px;
}

.product-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: flex-start;
}

.product-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.fade-out {
  opacity: 0;
  transition: opacity 0.5s ease;
}
</style>