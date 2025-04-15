import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductDetail from '../views/ProductDetail.vue'
import AddProduct from '../views/AddProduct.vue';


const routes = [
{
    path:'/',
    name:'Home',
    component: HomeView,
},
{
    path:'/product/:id',
    name: 'ProductDetail',
    component:ProductDetail,
    props: true
},
{
    path:'/add/',
    name: 'AddProduct',
    component: AddProduct
},

]
const router =createRouter ({
    history: createWebHistory(),
    routes,
});
export default router;