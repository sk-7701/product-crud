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
    <div class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <div>
          <h1 class="m-0">Products 
            <span class="badge bg-primary ms-2">{{ store.products.length }}</span>
          </h1>
        </div>
        
        <button 
          class="btn btn-success btn-sm" 
          @click="store.show_product_form = true;">
          <i class="fas fa-plus"></i> Create Product
        </button>
      </div>
      <div class="card-body">
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
  <div class="modal fade" tabindex="-1" :class="{'show': store.show_product_form}" style="display: block;" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Create Product</h5>
          <button type="button" class="btn-close" @click="toggleModal"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="handleSubmit">
            
            <div class="mb-3">
              <label for="name" class="form-label">Product Name</label>
              <input type="text" id="name"  class="form-control" required />
            </div>
            <div class="mb-3">
              <label for="description" class="form-label">Description</label>
              <textarea id="description"  class="form-control" required></textarea>
            </div>
            <div class="mb-3">
              <label for="price" class="form-label">Price</label>
              <input type="number" id="price"  class="form-control" required />
            </div>
            <div class="mb-3">
              <label for="image" class="form-label">Image URL</label>
              <input type="text" id="image"  class="form-control" />
            </div>
            <button type="submit" class="btn btn-success w-100">Create Product</button>
          </form>
        </div>
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
