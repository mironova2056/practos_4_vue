<template>
  <div>
    <div class="catalog"><span>Каталог</span></div>

    <section class="catalog-section">
      <div v-if="cards.length > 0" class="product-cards">
        <product-card
            v-for="card in cards"
            :key="card.id"
            :card="card"
        />
      </div>
      <p v-else>Загрузка данных...</p>
    </section>
  </div>
</template>

<script>
import {useMainStore} from "@/stores/main-store.js";
import ProductCard from "@/components/ProductCard.vue";

export default {
  name: "CatalogComponent",
  components: {
    ProductCard,
  },
  data(){
    return {
      mainStore: useMainStore(),
      cards: [],
    };
  },
  async mounted(){
    await this.getCards();
  },
  methods:{
    async getCards(){
      await this.mainStore.getCards();
      this.cards = this.mainStore.cards;
    },
  },
}
</script>

<style scoped>
.catalog {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.catalog-section {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.product-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: 20px;
}

.catalog-section p {
  text-align: center;
  font-size: 18px;
  color: #555;
}
</style>