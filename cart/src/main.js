import { createApp, defineAsyncComponent } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'

const pinia = createPinia();
// const Menu = defineAsyncComponent(() => import("menu/Menu"));

createApp(App).use(pinia).mount('#app')
// const productsStore = useProductsStore();
// const menuList = ref(productsStore.getProducts);
