<template>
    <div>
        <h1>🛍 Produktliste</h1>
        <router-link to="/add">Add new produkt</router-link>
        <!-- Filter & Suche -->
         <div class="filter-var">
            <input type="text" v-model="search" placeholder="Nach Product suchen">
            <select v-model="selectedCategory" name="" id="">
                <option value="">Alle Kategorien</option>
                <option v-for="cat in categories" :key="cat.id" :value="cat">
                    {{ cat }}
                </option>
            </select>
         </div>

        <div v-if="loading">Lade Producte . . .</div>
        <div v-else-if="error"> Fehler beim laden :(</div>
        <div v-else class="product-grid">
            <div v-for="product in filteredProducts" :key="product.id" class="product-card">
                <img :src="product.image" :alt="product.descripton">
                <h3>{{ product.title }}</h3>
                <p>{{ product.price }}</p>
                <router-link :to="`/product/${product.id}`">Details ansehen</router-link>
                <button @click="deleteProdukt(product.id)">🚮 Löschen </button>

            </div>
        </div>

    </div>
</template>

<script setup>
import {ref,computed, onMounted} from 'vue'

        const products= ref([])
        const categories = ref([])
        const loading= ref(true)
        const error= ref(false)

        const search= ref('')
        const selectedCategory= ref('')

        onMounted(async ()=> {
            try{
                // Producte laden
                const resp= await fetch ('https://fakestoreapi.com/products')
                products.value = await resp.json()
                console.log(products);

                // kategorie laden
                const resc= await fetch ('https://fakestoreapi.com/products/categories')
                categories.value= await resc.json()
                

            } catch (e){
                error.value = true
            } finally {
                loading.value= false
            }
        })
        const filteredProducts= computed(()=> {
            return products.value.filter((product) => {
                const matchessearch = product.title.toLowerCase().includes(search.value.toLowerCase())
                const matchCategory = selectedCategory.value === '' || product.category === selectedCategory.value
                return matchessearch && matchCategory
            })
        }) 

      async function deleteProdukt(id) {
        try{
            await fetch(`https://fakestoreapi.com/products/${id}`, {
                method: 'DELETE',
            })
            products.value=products.value.filter(p => p.id !== id)
            
        } catch(e){
            console.log("Fehler beim Löschen", error);
            
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