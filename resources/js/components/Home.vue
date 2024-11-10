<script setup>
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { useProductStore } from '@/stores/productStore';

const store = useProductStore();

onMounted(async () => {
  await store.getProducts();
});
</script>

<template>
  <div class="container mt-5">
    <!-- Main Content Card -->
    <div class="card">
      <div class="card-header text-center">
        <h1>Product List</h1>
      </div>
      <div class="card-body">
        <!-- DataTable without Pagination -->
        <div v-if="store.products.length > 0">
          <table class="table table-striped table-bordered table-hover">
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
                  <img
                    v-if="product.image_path"
                    
                    alt="Product Image"
                    class="img-fluid"
                    style="max-width: 100px; object-fit: cover;"
                  />
                  <div v-else class="text-center text-muted">No Image</div>
                </td>
                <td>
                  <button class="btn btn-primary btn-sm" @click="store.editProduct(product.id)">
                    <i class="fas fa-edit"></i>
                </button>
                  <button class="btn btn-danger btn-sm ml-2" @click="store.deleteProduct(product)">
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p v-else class="text-center text-muted">No products available.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  margin-top: 20px;
}

.card-header {
  background-color: #f8f9fa;
}

.card-body {
  padding: 20px;
}

.pagination {
  display: flex;
  justify-content: center;
}

.page-item.disabled .page-link {
  background-color: #e9ecef;
  border-color: #e9ecef;
  color: #6c757d;
  pointer-events: none;
}

.page-item.active .page-link {
  background-color: #007bff;
  border-color: #007bff;
  color: white;
}

.page-link {
  cursor: pointer;
}
</style>
