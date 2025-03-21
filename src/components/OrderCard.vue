<script>
export default {
  name: "OrderCard",
  props: {
    order:{
      type: Object,
      required: true,
    },
    numberOrder:{
      type: Number,
      required: true,
    },
  },
};
</script>

<template>
  <div class="order-card">
    <h3>Заказ № {{ numberOrder }}</h3>
    <ul class="order-list">
      <li class="product-item">
        <div class="product-info">
          <p>Количество позиций: {{ order.products.length }}</p>
        </div>
      </li>
    </ul>
    <p class="order-total">Итоговая сумма: <strong>{{ order.order_price }} ₽</strong></p>
  </div>
</template>

<style scoped>
.order-card {
  width: 320px;
  height: fit-content;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
  transition: transform 0.2s;
}

.order-card:hover {
  transform: translateY(-5px);
}

h3 {
  font-size: 18px;
  margin-bottom: 12px;
}

.order-list {
  list-style: none;
  padding: 0;
}

.product-item {
  border-bottom: 1px solid #ddd;
  padding: 8px 0;
}

.product-info p {
  margin: 4px 0;
  font-size: 14px;
}

.order-total {
  margin-top: 12px;
  font-size: 16px;
  color: #28a745;
}
</style>