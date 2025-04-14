<template>
    <div v-if="loading"> Lade Prudoctdetails</div>
    <div v-else-if="error">Fehler beim Laden</div>
    <div v-else class="product-detail" >
        <h1>{{ product.title }}</h1>
        <img :src="product.image" :alt="product.title">
        <p><strong>Price : </strong>{{ product.price }}</p>
        <p><strong>Beschreibung:</strong> {{ product.description }}</p>
        <router-link to="/">← Zurück zur Liste</router-link>

    </div>
</template>

<script>
import {ref , onMounted} from "vue"
import { useRoute } from "vue-router";

export default {
    setup(){
        const route= useRoute()
        const product = ref(null)
        const loading= ref(true)
        const error = ref(false)

        onMounted (async ()=> {
            try{
                console.log(route.params.id);
                
            const res = await fetch (`https://fakestoreapi.com/products/${route.params.id}`)
            if(!res.ok) throw new Error(`Fehler beim laden`)
            product.value= await res.json()
        console.log(product);
        
        } catch (e) {
            console.log("huu");
            
            error.value=true
        } finally {
            loading.value= false
        }
        })
        return { product, loading, error };
    }
}
</script>

<style scoped>
.product-detail{
    max-width: 600px;
    margin: auto;
    text-align: center;
}
img{
    max-width: 200px;
    height: auto;
}

</style>