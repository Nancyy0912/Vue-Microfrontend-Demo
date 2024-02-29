<template>
  <div>
    <article class="order-panel">
      <div class="section">
        <div class="section-title"><h1>My Order</h1></div>

        <div v-if="cartList.length === 0" class="empty-cart">Cart is empty</div>
        <ul v-else class="food-list">
          <li
            v-for="(item, index) in cartList"
            :key="index"
            class="food-list__item"
          >
            <img class="food-image" :src="item.imgSrc" />
            <!-- <div class="food-buy-amount">{{ item.price }}</div> -->
            <div class="food-name">{{ item.name }}</div>
            <div class="quantity-controls">
              <button @click="decreaseQuantity(item)" class="decrease-button">
                -
              </button>
              <span class="quantity">{{ item.quantity }}</span>
              <button
                @click="increaseQuantity(item)"
                :class="{ 'disabled': item.quantity >= 5 }"
                class="increase-button"
              >
                +
              </button>
            </div>
            <div class="food-price">{{ item.price }}</div>
          </li>
        </ul>
        <div class="total-price">
          <div class="total">Total:</div>
          <div class="price">₹{{ calculateTotal() }}</div>
        </div>
      </div>
    </article>
  </div>
</template>
<script setup>
import { computed } from "vue";
import { useCartStore } from "../store/cartStore";
import { pubsub } from "../pubsub";

const cartStore = useCartStore();
const cartList = computed(() => cartStore.getCartItems);

function decreaseQuantity(product) {
  pubsub.publish("removeItem", product);
}

function increaseQuantity(product) {
  pubsub.publish("addToCart", product);
}

function calculateTotal() {
  return cartList.value.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
}
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css?family=Roboto:400,400i,700");

h1 {
  text-align: center;
  color: #333;
}

.empty-cart {
  text-align: center;
  color: #888;
  margin-top: 20px;
}

ul {
  list-style: none;
  padding: 0;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
}

.item-name {
  margin-bottom: 5px;
}

.item-price {
  color: #888;
}

/* Style for disabled list item */
.disabled {
  pointer-events: none;
  opacity: 0.5; 
}

.quantity-controls {
  display: flex;
  align-items: center;
}

.quantity {
  margin: 0 10px;
}

.total-price {
  margin-left: 10px;
}

.item-info {
  flex-grow: 1;
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

.total-row {
  font-weight: bold;
}

.total-label {
  flex-grow: 1;
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
.order-panel {
  padding: 56px 50px 42px 48px;
  margin-right: -20px;
  background: var(--secondary-color-lightest);
}

#order .section-title {
  font-size: 18px;
  font-weight: bold;
}

.food-list {
  display: grid;
  row-gap: 33px;
  padding: 8px;
  margin: 60px 40px 9px;
  font-size: 15px;
  font-weight: 600;
  list-style-type: none;
}
.food-list__item {
  display: inline-grid;
  align-items: center;
}
.food-list__item:not(:last-child) {
  grid-template-columns: 100px 60px 106px 2fr;
}
.food-list__item:last-child {
  grid-template-columns: 100px 60px 106px 2fr;
}
.food-list__item .food-image {
  width: 75px;
  height: 55px;
  border-radius: 0px;
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
</style>
