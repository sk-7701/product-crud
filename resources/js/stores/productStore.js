import { defineStore } from 'pinia';
import axios from 'axios';
import { useToast } from 'vue-toastification';
export const useProductStore = defineStore('product',{
    state : () => ({
        form_data : 
        {
            name : null,
            email : null,
            password : null,
            password_confirmation : null,
            device_name : null
        },  

        products : [],
         errors: [],
    }),

    getters : {

    },

    actions: {
        login()
        {
            const toast = useToast(); 
            this.form_data.device_name = 'browsers';
            axios.post('http://localhost:8000/api/login', this.form_data).then((response) => {
                this.form_data.email = this.form_data.password = null;
                localStorage.setItem('token',response.data)
                this.errors = [];
                toast.success('Login Successful!');
                this.router.push({name:'home'});
            }).catch((errors) => {
                this.errors = errors.response.data.errors
                
            });

        },

        registerUser()
        {

            const toast = useToast(); 
            axios.post('http://localhost:8000/api/register', this.form_data).then((response) => {
                this.form_data.name = this.form_data.email = this.form_data.password = this.form_data.password_confirmation = null;
                this.errors = [];
                toast.success('Account created successfully, now you can login!');
                this.router.push({name:'login'});
            }).catch((errors) => {
                this.errors = errors.response.data.errors
                
            });
    
        },

        getProducts()
        {
            const toast = useToast();
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('You must be logged in to view products!');
                return;
            }
            axios.get('http://localhost:8000/api/products', {
                headers: {
                    'Authorization': `Bearer ${token}` // Include the token here
                }
            }).then((response) => {
                this.products = response.data;
                console.log(this.products); 
            }).catch((errors) => {
                this.errors = errors.response.data.errors;
                toast.error('Error fetching products. Please try again.');
            });

        },

        createProduct()
        {

        },

        UpdateProduct()
        {

        },

        deleteProduct()
        {

        }


    }
})