<script setup>
import { storeToRefs } from 'pinia';
import { ref,onMounted } from 'vue';
import { useProductStore } from '@/stores/productStore';
const store = useProductStore();

onMounted(async () => {
      
    await store.getProducts();
    });


</script>



<template>
    <div>
        <div>
             <h1>Product List</h1>

    <table v-if="store.products && store.products.length > 0">
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Price</th>
          <th>Image</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in store.products" :key="product.id">
          <td>{{ product.name }}</td>
          <td>{{ product.description }}</td>
          <td>${{ product.price }}</td>
          <td>
            <img  alt="Product Image" width="100" />
          </td>
          <td>
            <button @click="store.editProduct(product.id)">Edit</button>
            <button @click="store.deleteProduct(product.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- No Products Available -->
    <p v-else>No products available.</p>
  </div>
    </div>
</template>