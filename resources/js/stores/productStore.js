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
            password_confirmation : null
        },  
        register_errors : [],
    }),
    getters : {

    },

    actions: {
        login()
        {

        },

        registerUser()
        {

            const toast = useToast(); 
            axios.post('http://localhost:8000/api/register', this.form_data).then((response) => {
                this.form_data.name = this.form_data.email = this.form_data.password = this.form_data.password_confirmation = null;
                toast.success('Account created successfully, now you can login!');
                this.router.push({name:'login'});
            }).catch((errors) => {
                this.register_errors = errors.response.data.errors
                
            });
    
        },

    }
})