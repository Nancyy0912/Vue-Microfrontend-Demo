import { defineStore } from 'pinia';

export const useProductsStore = defineStore('menu', {
  state: () => ({
    menuList : [
      {
        id: 0,
        name: "Burger",
        preparationTime: "25-30 min",
        price: "100",
        imgSrc: "https://i.loli.net/2020/04/06/ZOsdvCkE6jDN8Ka.png",
      },
      {
        id: 1,
        name: "Cheezy-7 Pizza",
        preparationTime: "30-35 min",
        price: "350",
        imgSrc: "https://i.loli.net/2020/04/06/67ruCzS8WYONoUp.png",
      },
      {
        id: 2,
        name: "Mc Puff",
        preparationTime: "15-20 min",
        price: "150",
        imgSrc: "https://i.loli.net/2020/04/06/Hqn6217mSUCbQ8d.png",
      },
      {
        id: 3,
        name: "BBQ Burger",
        price: "75",
        preparationTime: "15-20 min",
        imgSrc: "https://i.loli.net/2020/04/06/7oZgORNCnGE5qhU.png",
      },
      {
        id: 4,
        name: "French Fries",
        preparationTime: "15-20 min",
        price: "100",
        imgSrc: "https://i.loli.net/2020/04/06/EZJyVICMS6GYueL.png",
      },
      {
        id: 5,
        name: "Cheese Cake",
        preparationTime: "15-20 min",
        price: "600",
        imgSrc: "https://i.loli.net/2020/04/06/pIWNyMlqCSZiLtr.png",
      },
    ]
  }),
  getters: {
    getProducts() {
      return this.menuList;
    },
  },
});
