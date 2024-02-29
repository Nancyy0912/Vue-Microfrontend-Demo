<template>
  <div>
    <article class="restaurant-panel">
      <div class="nav-class">
        <span class="bar-item">Recommendations</span>
      </div>
      <section class="section">
        <ul class="restaurant-list">
          <li
            class="restaurant-list__item"
            v-for="(item, index) in menuList"
            :key="index"
          >
            <a href="#"><img class="restaurant-image" :src="item.imgSrc" /></a>
            <div class="restaurant-name">{{ item.name }}</div>
            <div class="restaurant-info">
              <button
                v-if="!isItemIdExists(item.id)"
                @click="addCartitems(item)"
                class="btn info"
              >
                Add to Cart
              </button>
              <ul v-else class="food-list">
                <!-- <li
                  v-for="(item, index) in cartList"
                  :key="index"
                  class="food-list__item"
                > -->
                <!-- <div class="food-name">{{ item.name }}</div>                                                            -->
                <div class="quantity-controls">
                  <button
                    @click="decreaseQuantity(item)"
                    class="decrease-button"
                  >
                    -
                  </button>
                  <span class="quantity">{{ itemQuantity(item.id) }}</span>
                  <button
                    @click="increaseQuantity(item)"
                    class="increase-button"
                   :class="{'disabled': itemQuantity(item.id) >= 5}"
                  >
                    +
                  </button>
                </div>
                <!-- <div class="food-price">{{ item.price }}</div> -->
                <!-- </li> -->
              </ul>
            </div>
          </li>
        </ul>
      </section>
    </article>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
import { useProductsStore } from "../store/productStore";
import { useCartStore } from "cart/CartStore";

import { pubsub } from "../pubsub";

const isCartEmpty = ref(true);
const disableItem = ref(false);
const selectedItemId = ref(null);
const productsStore = useProductsStore();
const cartStore = useCartStore();
const menuList = ref(productsStore.getProducts);
const selectedItem = ref([]);
const cartItems = computed(() => cartStore.getCartItems);

const isItemIdExists = (id) => {
  return cartItems.value.some(item => item.id === id);

};

const addCartitems = (data) => {
  isCartEmpty.value = false;
  selectedItemId.value = data.id;
  selectedItem.value.push(data.id);
  pubsub.publish("addToCart", data);
};

function itemQuantity (id) {
  const existingProduct = cartItems.value.find((item) => item.id === id);
  if (existingProduct) {
    if (existingProduct.quantity > 5) {
      disableItem.value = true;
    }
    disableItem.value = false;
    return existingProduct.quantity;
  }
    return;
};

function decreaseQuantity(product) {
  pubsub.publish("removeItem", product);
}

function increaseQuantity(product) {
  pubsub.publish("addToCart", product);
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Roboto:400,400i,700");

.menu-module {
  font-family: "Arial", sans-serif;
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #333;
}

.product-list {
  list-style: none;
  padding: 0;
}

.product-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
}

.product-info {
  flex-grow: 1;
}

.add-to-cart-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 4px;
}
.quantity-controls {
  display: flex;
  align-items: center;
}
.quantity {
  margin: 0 10px;
  font-size: initial;
}
/* Style for disabled list item */
.disabled {
  pointer-events: none;
  opacity: 0.5; 
}
.increase-button {
  background-color: #718181;
  color: #fff;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 4px;
  margin-left: 5px;
}

.increase-button:hover {
  background-color: #54e1e1;
}

.decrease-button {
  background-color: #718181;
  color: #fff;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 4px;
  margin-left: 5px;
}

.decrease-button:hover {
  background-color: #54e1e1;
}

.add-to-cart-button:hover {
  background-color: #0056b3;
}
body {
  margin: 0;
  min-height: 100vh;
  font-size: 14px;
  font-family: Roboto, sans-serif;
  background: var(--warning-color);
}

:root {
  --danger-color: rgb(250, 83, 24);
  --danger-color-lighter: rgb(255, 247, 237);
  --warning-color: rgb(252, 213, 97);
  --warning-color-transparent: rgba(252, 213, 97, 0.1);
  --secondary-color: rgb(248, 248, 247);
  --secondary-color-darker: rgb(160, 160, 160);
  --secondary-color-lightest: rgb(253, 253, 251);
  --info-color: rgb(80, 62, 157);
}

.dashboard {
  display: flex;
  width: 1386px;
  margin: 8px;
  background: white;
  border-radius: 30px;
}

.restaurant-panel {
  display: grid;
  row-gap: 72px;
  padding: 60px 106px;
  border-right: 1px solid var;
}

.nav-bar {
  display: flex;
  align-items: center;
  line-height: 1;
}

.nav-class {
  background-color: rgb(180 195 207 / 60%);
  padding: 12px 14px 25px 16px;
  display: flex;
  color: currentColor;
  font-weight: 600;
}

.menu {
  margin-right: 28px;
}

.title {
  margin-right: 78px;
  font-size: 18px;
  font-weight: bold;
  color: black;
  text-decoration: none;
}

.search-bar {
  width: 100%;
}
.search-bar .form-control {
  --input-bg: var(--secondary-color-lighter);
  width: 100%;
  border-color: transparent;
  border-radius: 15px;
}
.search-bar .btn {
  --btn-bg: var(--secondary-color-lighter);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 18px 6px 18px 18px;
  border-color: transparent;
  border-radius: 15px;
}

.welcome-banner {
  position: relative;
  padding: 64px 180px 72px 324px;
  background: var(--danger-color-lighter);
  border-radius: 15px;
  white-space: nowrap;
}
.welcome-banner .delivery {
  position: absolute;
  top: -22px;
  left: 40px;
  width: 240px;
  height: 240px;
}
.welcome-banner h1 {
  margin: 0;
  font-size: 18px;
  color: var(--danger-color);
}
.welcome-banner p {
  margin: 14px 0 0 0;
  color: var(--secondary-color-darker);
}
.welcome-banner .learn-more {
  position: absolute;
  right: 36px;
  bottom: 36px;
  display: flex;
  align-items: center;
  color: var(--danger-color);
  text-decoration: none;
}
.welcome-banner .learn-more .arrow {
  margin-left: 12px;
  fill: currentColor;
}

#restaurants .section-titles {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 60px;
}
#restaurants .section-titles .section-title {
  font-size: 21px;
  font-weight: bold;
}

.date-select {
  display: flex;
  align-items: center;
  padding: 14px;
}
.date-select .clock {
  margin-right: 9px;
  fill: currentColor;
}
.date-select .chevron {
  margin-left: 15px;
  fill: currentColor;
}

.categories {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.category-list {
  display: flex;
  padding: 0;
  margin: 0;
  list-style-type: none;
}
.category-list__item {
  box-sizing: border-box;
  width: 72px;
  padding: 6px;
  border-radius: 36px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
  transition: 0.3s;
}
.category-list__item:not(:last-child) {
  margin-right: 18px;
}
.category-list__item a {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
}
.category-list__item .category-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 56px;
  height: 56px;
  background: white;
  border: 1px solid var(--secondary-color-lighter);
  border-radius: 50%;
}
.category-list__item .category-icon svg {
  fill: black;
  transform: scale(1.2);
}
.category-list__item .category-name {
  padding: 9px 18px 36px 18px;
  font-size: 10px;
  font-weight: bold;
  color: black;
}
.category-list__item:target {
  background: var(--warning-color);
}
.category-list__item:target .category-icon {
  border-color: transparent;
}

.category-more-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 15px;
}

.restaurant-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 32px 35px;
  padding: 0;
  margin: 0;
  list-style-type: none;
}
.btn {
  border: none;
  border: 2px solid black;
  border-radius: 12px;
  background-color: inherit;
  padding: 8px 18px;
  font-size: 16px;
  cursor: pointer;
  display: inline-block;
}
.info {
  color: dodgerblue;
}
.restaurant-list__item .restaurant-image {
  width: 250px;
  height: 125px;
  border-radius: 15px;
}
.restaurant-list__item .restaurant-name {
  margin-top: 27px;
}
.restaurant-list__item .restaurant-info {
  margin-top: 12px;
  font-size: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.restaurant-list__item .restaurant-rate {
  margin-right: 9px;
}
.restaurant-list__item .restaurant-rate > * {
  display: inline-flex;
  vertical-align: middle;
}
.restaurant-list__item .restaurant-rate svg {
  margin-right: 6px;
}
.restaurant-list__item .restaurant-category {
  color: var(--secondary-color-darker);
}

.order-panel {
  padding: 56px 50px 42px 48px;
  background: var(--secondary-color-lightest);
}

.user-info {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.user-info .buy-count {
  margin-left: 30px;
  width: 40px;
  height: 40px;
  padding: 10px;
  color: black;
  border-radius: 15px;
}

#order {
  margin-top: 64px;
}
#order .section-title {
  font-size: 18px;
  font-weight: bold;
}

.order-info {
  width: 240px;
  margin-top: 44px;
  padding: 27px 24px 24px 24px;
  color: white;
  background: var(--info-color);
  border-radius: 15px;
}
.order-info .address,
.order-info .delivery {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.order-info .address-edit {
  color: var(--warning-color);
  text-decoration: none;
}
.order-info .delivery {
  margin-top: 20px;
}
.order-info .delivery .delivery-time {
  display: flex;
  align-items: center;
}
.order-info .delivery .time-btn {
  width: 40px;
  height: 40px;
  padding: 10px;
  color: var(--warning-color);
  background: var(--warning-color-transparent);
  border-color: transparent;
  border-radius: 15px;
}
.order-info .delivery .time-btn svg {
  fill: currentColor;
}
.order-info .delivery .time {
  margin-left: 12px;
}
.order-info .delivery .delivery-choose-time {
  color: var(--warning-color);
  text-decoration: none;
}

.food-list {
  display: grid;
  row-gap: 33px;
  padding: 0;
  /* margin: 54px 0 0 0; */
  font-size: 10px;
  font-weight: bold;
  list-style-type: none;
}
.food-list__item {
  display: grid;
  align-items: center;
}
.food-list__item:not(:last-child) {
  grid-template-columns: 78px 20px 106px 1fr;
}
.food-list__item:last-child {
  grid-template-columns: 78px 20px 1fr;
}
.food-list__item .food-image {
  width: 57px;
  height: 32px;
  border-radius: 5px;
}
.food-list__item .food-price {
  color: var(--secondary-color-darker);
  justify-self: flex-end;
}

.total-price {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 115px;
  padding-bottom: 24px;
}
.total-price .price {
  font-size: 22px;
  font-weight: bold;
}

.buy-action {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 34px;
  border-top: 2px solid var(--secondary-color-lighter);
}
.buy-action .persons {
  font-size: 10px;
  font-weight: bold;
}
.buy-action .input-spinner {
  margin-top: 16px;
}
.buy-action .checkout-btn {
  display: flex;
  align-items: center;
  padding: 30px;
  color: black;
  border-radius: 10px;
}
.buy-action .checkout-btn .arrow {
  margin-left: 16px;
}

.input-spinner .btn {
  display: flex;
  justify-content: center;
  align-items: center;
  border-color: var(--secondary-color-lighter);
  padding: 12px;
  border-radius: 10px;
}
.input-spinner .btn:hover,
.input-spinner .btn:focus,
.input-spinner .btn:active {
  border-color: var(--secondary-color-lighter);
}
.input-spinner .form-control {
  --border-color: var(--secondary-color-lighter);
  box-sizing: border-box;
  max-width: 48px;
  text-align: center;
  border-left: none;
  border-right: none;
}
.input-spinner .plus {
  border-left: none;
  padding-left: 0;
}
.input-spinner .minus {
  padding-right: 0;
}
</style>