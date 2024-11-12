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

const editProduct = (product) => {
  
  formTitle.value = 'Edit Product';
  formButtonText.value = 'Save Changes';

  store.product_item = { ...product };
  store.preview_image = product.image; 
};


</script>




<template>
  <div class="container mt-5">
    <div class="row">
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

      <!-- Product Form on the Right -->
      <div class="col-md-4">
        <div class="card">
          <div class="card-header">
            <h5 class="modal-title">{{ formTitle }}</h5>
          </div>
          <div class="card-body">
            <form @submit.prevent="store.handleFormSubmit()">
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

              <div v-if="store.product_item.image" class="mb-3">
              <img 
              :src="`images/` + store.preview_image" 
              alt="Current Product Image" 
              class="img-fluid" 
              style="max-width: 100px; object-fit: cover;" 
              />
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



