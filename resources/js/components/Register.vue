<script setup>
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useProductStore } from '@/stores/productStore';
const store = useProductStore();
</script>

<template>
  <div class="container d-flex justify-content-center align-items-center vh-100">
   
    <div class="card shadow-lg p-4" style="max-width: 500px; width: 100%;">
      
      <div class="card-body">
        
        <div class="mb-3">
          <label for="name" class="form-label">Full Name</label>
          <input
            type="text"
            class="form-control"
            id="name"
            v-model="store.form_data.name"
            placeholder="Enter your full name"
            required
          />
          <p v-if="store.errors.name" class="text-danger mt-2">
            <span v-for="(error, index) in store.errors.name" :key="index">{{ error }}<br /></span>
          </p>
        </div>

       
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input
            type="email"
            class="form-control"
            id="email"
            v-model="store.form_data.email"
            placeholder="Enter your email address"
            required
          />
          <p v-if="store.errors.email" class="text-danger mt-2">
            <span v-for="(error, index) in store.errors.email" :key="index">{{ error }}<br /></span>
          </p>
        </div>

       
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input
            type="password"
            class="form-control"
            id="password"
            v-model="store.form_data.password"
            placeholder="Enter your password"
            required
          />
          <p v-if="store.errors.password" class="text-danger mt-2">
            <span v-for="(error, index) in store.errors.password" :key="index">{{ error }}<br /></span>
          </p>
        </div>

        
        <div class="mb-3">
          <label for="password_confirmation" class="form-label">Confirm Password</label>
          <input
            type="password"
            class="form-control"
            id="password_confirmation"
            v-model="store.form_data.password_confirmation"
            placeholder="Confirm your password"
            required
          />
          <p v-if="store.errors.password_confirmation" class="text-danger mt-2">
            <span v-for="(error, index) in store.errors.password_confirmation" :key="index">{{ error }}<br /></span>
          </p>
        </div>

       
        <div class="d-grid gap-2 mb-3">
          <button class="btn btn-primary" @click.prevent="store.registerUser()">Register</button>
        </div>

       
        <div class="text-center">
          <router-link to="/login" class="text-decoration-none">
            <small>Already have an account? Login here</small>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card-header {
  background-color: #007bff;
  color: white;
  padding: 1rem;
  font-size: 1.25rem;
}

.form-control:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 0.25rem rgba(0, 123, 255, 0.25);
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.btn-primary:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}

.text-danger {
  font-size: 0.875rem;
}

.text-center {
  text-align: center;
}

.text-muted {
  color: #6c757d;
}

.text-decoration-none {
  text-decoration: none;
}

.text-decoration-none:hover {
  text-decoration: underline;
}
</style>
