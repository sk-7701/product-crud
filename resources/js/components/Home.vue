<script setup>
import { ref, onMounted } from 'vue';
import { useProductStore } from '@/stores/productStore';

const store = useProductStore();

const formTitle = ref('Create Product');
const formButtonText = ref('Create Product');

// Initialize product list
onMounted(async () => {
  await store.getProducts();
});

// Open form to create product
const toggleForm = () => {
  formTitle.value = 'Create Product';
  formButtonText.value = 'Create Product';
};

// Edit product
const editProduct = (product) => {
  formTitle.value = 'Edit Product';
  formButtonText.value = 'Save Changes';

  store.product_item = { ...product };
  store.preview_image = product.image;
};


const logout = () => {
  localStorage.removeItem('token');  
  window.location.href = '/login';  
};
</script>

<template>
  <div class="container">
    <!-- Header with Navbar -->
    <header class="bg-dark text-white p-3">
      <div class="container">
        <nav class="navbar navbar-expand-lg navbar-dark">
          <div class="container-fluid">
            <router-link to="/" class="navbar-brand">Home</router-link>
            <div class="d-flex justify-content-end">
              <!-- User Welcome Message -->
              <span class="navbar-text me-3">
                Welcome {{ store.user?.name || 'user' }}!
              </span>
              <!-- Logout Button -->
              <button @click="logout" class="btn btn-outline-light btn-sm">
                Logout
              </button>
            </div>
          </div>
        </nav>
      </div>
    </header>

    <div class="row mt-3">
      <!-- Product Table on the Left -->
      <div class="col-md-8">
        <div class="card">
          <div class="card-header d-flex justify-content-between align-items-center">
            <div>
              <h1 class="m-0">Products
                <span class="badge bg-primary ms-2">{{ store.products.length }}</span>
              </h1>
            </div>
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
                        v-if="product.image"
                        :src="`images/`+product.image"
                        alt="Product Image"
                        class="img-fluid"
                        style="max-width: 100px; object-fit: cover;"
                      />
                      <div v-else class="text-center text-muted">No Image</div>
                    </td>
                    <td>
                      <button class="btn btn-primary btn-sm" @click="editProduct(product)">
                        <i class="fas fa-edit"></i> Edit
                      </button>
                      <button class="btn btn-danger btn-sm ml-2" @click="store.deleteProduct(product)">
                        <i class="fas fa-trash-alt"></i> Delete
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

      <!-- Product Form on the Right -->
      <div class="col-md-4">
        <div class="card">
          <div class="card-header">
            <h5 class="modal-title">{{ formTitle }}</h5>
          </div>
          <div class="card-body">
            <form @submit.prevent="store.handleFormSubmit()" enctype="multipart/form-data">
              <div class="mb-3">
                <label for="name" class="form-label">Product Name</label>
                <input type="text" id="name" class="form-control" v-model="store.product_item.name" />
                <p v-if="store.errors.name" class="text-danger">
                  {{ store.errors.name[0] }}
                </p>
              </div>
              <div class="mb-3">
                <label for="description" class="form-label">Description</label>
                <textarea id="description" class="form-control" v-model="store.product_item.description"></textarea>
                <p v-if="store.errors.description" class="text-danger">
                  {{ store.errors.description[0] }}
                </p>
              </div>
              <div class="mb-3">
                <label for="price" class="form-label">Price</label>
                <input type="number" id="price" class="form-control" v-model="store.product_item.price" />
                <p v-if="store.errors.price" class="text-danger">
                  {{ store.errors.price[0] }}
                </p>
              </div>

              <div v-if="store.product_item.image && store.product_item.id" class="mb-3">
                <img 
                  :src="`images/` + store.preview_image" 
                  alt="Current Product Image" 
                  class="img-fluid" 
                  style="max-width: 100px; object-fit: cover;" 
                />
              </div>

              <div class="mb-3">
                <label for="image" class="form-label">Product Image</label>
                <input 
                  type="file"
                  id="image"
                  class="form-control"
                  @change="store.handleImageUpload($event)"
                />
              </div>

              <button type="submit" class="btn btn-success w-100">{{ formButtonText }}</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  header {
    background-color: #343a40;
    color: white;
    padding: 1rem;
  }

  .navbar-brand {
    font-weight: bold;
  }

  .navbar-text {
    font-size: 1.1rem;
  }

  .btn-logout {
    background-color: #dc3545;
    color: white;
  }

  .card-header {
    background-color: #f8f9fa;
  }

  .card-body {
    background-color: #ffffff;
  }

  .table th, .table td {
    vertical-align: middle;
  }
</style>
