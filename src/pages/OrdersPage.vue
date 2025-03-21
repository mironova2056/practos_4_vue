<script>
import OrderCard from "@/components/OrderCard.vue";
import {useBasketStore} from "@/stores/basket-store.js";

export default {
  name: "OrdersPage",
  components: {
    OrderCard,
  },
  data(){
    return {
      orderStore: useBasketStore(),
    };
  },
  async mounted(){
    await this.orderStore.getOrders()
  },

};
</script>

<template>
  <section class="order-section">
    <h1 v-if="orderStore.ordersProducts.length === 0" class="no-orders">
      Заказов нет
    </h1>
    <OrderCard :number-order="index + 1"
               :order="order"
               v-for="(order,index) in orderStore.ordersProducts"
               :key="order.id"
    />
  </section>
</template>

<style scoped>
.order-section {
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  background-color: #f8f9fa;
  min-height: 100vh;
}

.no-orders {
  margin-top: 100px;
  font-size: 24px;
  color: #007bff;
  text-align: center;
}
</style>