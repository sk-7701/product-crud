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
                this.register_errors = errors.response.data.errors
                
            });
    
        },

    }
})