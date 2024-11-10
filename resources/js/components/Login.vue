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
                    <div class="card-header">Login</div>
                    <div class="card-body">
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="text" class="form-control" name="email" v-model="store.form_data.email"/>
                            <p v-if="store.errors.email" class="text-danger">
                                <span v-for="(error, index) in store.errors.email" :key="index" >
                                    {{ error }}<br/>
                                </span>
                            </p>
                            
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" class="form-control" name="password" v-model="store.form_data.password" />
                            <p v-if="store.errors.password" class="text-danger">
                                <span v-for="(error, index) in store.errors.password" :key="index" >
                                    {{ error }}<br/>
                                </span>
                            </p>
                        </div>

                        <div class="row mt-2">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <button  class="btn btn-primary" @click="store.login()">Login</button>
                                </div>
                            </div>
                            <div class="col-md-6 text-right">
                                <router-link to="/register">Create New Account!</router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
