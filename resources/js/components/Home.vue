<script setup>
import { ref, onMounted } from 'vue';
import { useProductStore } from '@/stores/productStore';

const store = useProductStore();

const formTitle = ref('Create Product');
const formButtonText = ref('Create Product');


onMounted(async () => {
  await store.getProducts();
});

const toggleForm = () => {
  formTitle.value = 'Create Product';
  formButtonText.value = 'Create Product';
};

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
  <div class="container-fluid">
   
    <header class="bg-dark text-white p-3 mb-4">
      <div class="container d-flex justify-content-between align-items-center">
        <router-link to="/" class="navbar-brand fs-4 fw-bold text-white">
          Home
        </router-link>
        <div class="d-flex align-items-center">
          <span class="navbar-text text-white me-4 fs-5">
            Welcome user !
          </span>
          
          <button @click="logout" class="btn btn-outline-light btn-sm">
            Logout
          </button>
        </div>
      </div>
    </header>

    <div class="row">
     
      <div class="col-lg-8 col-md-12 mb-4">
        <div class="card shadow-sm">
          <div class="card-header d-flex justify-content-between align-items-center">
            <div class="d-flex justify-content-between align-items-center">
              <h1 class="m-2">Products</h1>
              <span class="badge bg-primary">{{ store.products.length }}</span>
            </div>
          </div>
          <div class="card-body">
            <div v-if="store.products.length > 0">
              <table class="table table-striped table-hover">
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
                        :src="`images/` + product.image"
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

     
      <div class="col-lg-4 col-md-12">
        <div class="card shadow-sm">
          <div class="card-header bg-light">
            <h5 class="modal-title">{{ formTitle }}</h5>
          </div>
          <div class="card-body">
            <form @submit.prevent="store.handleFormSubmit()" enctype="multipart/form-data">
              
              <div class="mb-3">
                <label for="name" class="form-label">Product Name</label>
                <input type="text" id="name" class="form-control" v-model="store.product_item.name" required />
                <p v-if="store.errors.name" class="text-danger mt-2">{{ store.errors.name[0] }}</p>
              </div>

             
              <div class="mb-3">
                <label for="description" class="form-label">Description</label>
                <textarea id="description" class="form-control" v-model="store.product_item.description"></textarea>
                <p v-if="store.errors.description" class="text-danger mt-2">{{ store.errors.description[0] }}</p>
              </div>

             
              <div class="mb-3">
                <label for="price" class="form-label">Price</label>
                <input type="number" id="price" class="form-control" v-model="store.product_item.price" />
                <p v-if="store.errors.price" class="text-danger mt-2">{{ store.errors.price[0] }}</p>
              </div>

              
              <div v-if="store.product_item.image && store.product_item.id" class="mb-3">
                <img :src="`images/` + store.preview_image" alt="Current Product Image" class="img-fluid" style="max-width: 100px; object-fit: cover;" />
              </div>

            
              <div class="mb-3">
                <label for="image" class="form-label">Product Image</label>
                <input type="file" id="image" class="form-control" @change="store.handleImageUpload($event)" />
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
  }

  .navbar-brand {
    font-weight: bold;
  }

  .navbar-text {
    font-size: 1.2rem;
  }

  .btn-outline-light {
    border-color: #fff;
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

  .btn-sm {
    padding: 5px 10px;
    font-size: 0.9rem;
  }

  .card {
    border-radius: 8px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  }

  .card-header {
    background-color: #f1f1f1;
    font-weight: bold;
  }

  .btn-primary, .btn-danger, .btn-success {
    transition: background-color 0.3s;
  }

  .btn-primary:hover {
    background-color: #0056b3;
  }

  .btn-danger:hover {
    background-color: #c82333;
  }

  .btn-success:hover {
    background-color: #218838;
  }
</style>
