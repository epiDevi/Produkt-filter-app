<template>
    <div>
        <h1>🛍 Produktliste</h1>
        <div v-if="loading">Lade Producte . . .</div>
        <div v-else-if="error"> Fehler beim laden :(</div>
        <div v-else class="product-grid">
            <div v-for="product in products" :key="product.id" class="product-card">
                <img :src="product.image" :alt="product.descripton">
                <h3>{{ product.title }}</h3>
                <p>{{ product.price }}</p>
                <router-link :to="`/product/${product.id}`">Details ansehen</router-link>

            </div>
        </div>

    </div>
</template>

<script>
import {ref, onMounted} from 'vue'
export default {
    setup(){
        const products= ref([])
        const loading= ref(true)
        const error= ref(false)

        onMounted(async ()=> {
            try{
                const resp= await fetch ('https://fakestoreapi.com/products')
                products.value = await resp.json()
                console.log(products);
                

            } catch (e){
                error.value = true
            } finally {
                loading.value= false
            }
        })
        return {products, loading, error}
    }
}
</script>

<style scoped>
    .product-grid{
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 1rem;
    }
    .product-card{
        border: 1px solid black;
        padding: 1rem;
        border-radius: 8px;
        text-align: center;
    }
    img{
        max-width: 100px;
        height: 100px;
    }
    h3{
        height: 50px;
        overflow: hidden;
    }

</style>