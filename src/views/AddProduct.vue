<template>
<div class="add-container">
    <h1>➕ Neues Produkt hinzufügen</h1>

    <form @submit.prevent="submitProduct">
      <label>Titel:</label>
      <input v-model="title" required />

      <label>Preis (€):</label>
      <input type="number" v-model.number="price" required />

      <label>Beschreibung:</label>
      <textarea v-model="description" required />

      <label>Bild-URL:</label>
      <input v-model="image" required />

      <label>Kategorie:</label>
      <select v-model="category" required>
        <option value="men's clothing">Men's Clothing</option>
        <option value="women's clothing">Women's Clothing</option>
        <option value="jewelery">Jewelery</option>
        <option value="electronics">Electronics</option>
      </select>

      <button type="submit">Produkt speichern</button>
    </form>
  </div>


</template>

<script setup>

import {ref} from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter()

const title = ref('')
const price= ref('')
const description = ref('')
const image= ref('')
const category= ref('')

async function submitProduct(){
    const newProdukt= {
        title:title.value,
        price:price.value,
        description: description.value,
        image: image.value,
        category: category.value,
    }
    try{
        const res= await fetch ('https://fakestoreapi.com/products',
            {
                method:'POST',
                headers: {'content-Type': 'application/json'},
                body: JSON.stringify(newProdukt),
            })
        const result= await res.json()
        console.log('Produkt gespeichert', result);
        router.push('/')
        
    } catch(e){
        console.log('Fehler beim hizufügen', e);
        
    }
}
</script>
<style scoped>
.add-container {
  max-width: 500px;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
input,
textarea,
select {
  width: 100%;
  padding: 0.5rem;
}
button {
  padding: 0.5rem 1rem;
  background: #3b82f6;
  color: white;
  border: none;
  cursor: pointer;
}
</style>