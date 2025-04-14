import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductDetail from '../views/ProductDetail.vue'

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
}
]
const router =createRouter ({
    history: createWebHistory(),
    routes,
});
export default router;