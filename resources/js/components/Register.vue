<script setup> 
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useProductStore } from '@/stores/productStore';
const store = useProductStore();
</script>
<template>
    <div>
        <div class="row justify-content-center">
            <div class="col-md-6 mt-2">
                <div class="card">
                    <div class="card-header">Register</div>
                    <div class="card-body">
                        <div class="form-group">
                            <label for="name">Name</label>
                            <input type="text" class="form-control" name="name" v-model="store.form_data.name">
                            <p v-if="store.register_errors.name" class="text-danger">
                                <span v-for="(error, index) in store.register_errors.name" :key="index" >
                                    {{ error }}<br/>
                                </span>
                            </p>
                        </div>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="text" class="form-control" name="email" v-model="store.form_data.email">
                            <p v-if="store.register_errors.email" class="text-danger">
                                <span v-for="(error, index) in store.register_errors.email" :key="index" >
                                    {{ error }}<br/>
                                </span>
                            </p>
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" class="form-control" name="password" v-model="store.form_data.password">
                            <p v-if="store.register_errors.password" class="text-danger">
                                <span v-for="(error, index) in store.register_errors.password" :key="index" >
                                    {{ error }}<br/>
                                </span>
                            </p>
                        </div>
                        <div class="form-group">
                            <label for="password_confirmation">Confirm Password</label>
                            <input type="password" class="form-control" name="password_confirmation" v-model="store.form_data.password_confirmation" >
                            <p v-if="store.register_errors.password_confirmation" class="text-danger">
                                <span v-for="(error, index) in store.register_errors.password_confirmation" :key="index" >
                                    {{ error }}<br/>
                                </span>
                            </p>
                        </div>

                        <div class="row mt-2">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <button @click.prevent="store.registerUser()" class="btn btn-primary">Register</button>

                                </div>
                            </div>
                            <div class="col-md-6 text-right">
                                <router-link to="/login">Already have an account!</router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
