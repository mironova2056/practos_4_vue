import {defineStore} from "pinia";
import {useMainStore} from "@/stores/main-store.js";

export const useBasketStore = defineStore("basket-store", {
    state:() => ({
        basketProducts: [],
        orderProducts: [],
    }),
    getters: {
        getBasketProducts: (state) => state.basketProducts,
    },
    actions: {
        getToken(){
            const mainStore = useMainStore();
            return mainStore.token;
        },
        async addToBasket(productId){
            const token = this.getToken();
            try{
               const response = await fetch(`${import.meta.env.VITE_API_URL}cart/${productId}`, {
                   method: "POST",
                   headers: {
                       'Authorization': `Bearer ${token}`,
                   },
               });
               await this.getProducts();
            }catch(error){
                console.log('Ошибка при добавлении товара в корзину:', error);
            }
        }
    }
})