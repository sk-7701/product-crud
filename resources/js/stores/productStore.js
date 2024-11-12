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

        preview_image : null,

        products : [],
         errors: [],
         show_product_form : false,
         product_item :
         {
        
            name : null,
            descripton : null,
            price : null,
            image : null

         },
         file:null,
         errors : [],
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

        //----------------------------------------------

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

        //-------------------------------------------------

       async getProducts()
        {
            const toast = useToast();
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('You must be logged in to view products!');
                return;
            }
            axios.get('http://localhost:8000/api/products', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then((response) => {
                this.products = response.data;
                console.log(this.products); 
            }).catch((errors) => {
                this.errors = errors.response.data.errors;
                toast.error('Error fetching products. Please try again.');
            });

        },

        //--------------------------------------------------------

        async createProduct() {

            const toast = useToast();
            const { name, description, price, image } = this.product_item;
    
            const formData = new FormData();
            formData.append('name', name);
            formData.append('price', price);
            
            if (description) {
                formData.append('description', description);
              }
              
              if (image) {
                formData.append('image', image); 
              }

            const token = localStorage.getItem('token');
            if (!token) {
              toast.error('Authorization token not found');
              return; 
            }
      
            try {
              
              const response = await axios.post('http://localhost:8000/api/products', formData, {
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'multipart/form-data', 
                },
              });
      
              toast.success('Product created successfully');
              this.resetProductItem();
              this.getProducts();
              this.errors = [];
              if(this.$refs.file) {
                this.$refs.file.value = '';
            }
              return response.data; 
            } catch (error) {
              if (error.response && error.response.data.errors) {
                this.errors = error.response.data.errors;
            } 
            }
          },
      
      
            
        //-----------------------------------

       async  updateProduct()
        {

          const toast = useToast();

          const { name, description, price, image, id } = this.product_item;
          
        
        let formData = {

          name : name ,
          description : description,
          price : price,
          image : image

        }
        
      
      
          const token = localStorage.getItem('token');
          if (!token) {
            toast.error('Authorization token not found');
            return;
          }
          
          try {
            let response;
          
            if (id) {
              
              response = await axios.put(`http://localhost:8000/api/products/${id}`,formData, {
                headers: {
                  'Authorization': `Bearer ${token}`,
                  
                },
              });
              
              toast.success('Product updated successfully');
            } 
          
            this.resetProductItem();
            this.getProducts();
            this.errors = [];

            return response.data;
          } catch (error) {
            if (error.response && error.response.data.errors) {
              this.errors = error.response.data.errors;
          } 
          }

        },

        //----------------------------------------------


        deleteProduct(item)
        {
            const token = localStorage.getItem('token');
            const toast = useToast();
            // Check if the user is logged in
            if (!token) {
                toast.error('You must be logged in to delete products!');
                return;
            }

            // Show confirmation before deletion
            if (!confirm("Are you sure you want to delete this product?")) {
                return;
            }

            // Send DELETE request to delete the product
            axios.delete(`http://localhost:8000/api/products/${item.id}`, {
                headers: {
            'Authorization': `Bearer ${token}`
             }
        })
        .then((response) => {
        toast.success('Product deleted successfully!');
         this.getProducts(); 
    })
    .catch((errors) => {
            toast.error('Error deleting product. Please try again.');
    });

        },
        
        //------------------------------------

        resetProductItem() {

            this.product_item = {
              name: null,
              description:null,
              price:null,
              image: null,
            };
          },

          //------------------------------------
          handleFormSubmit() {
            if (this.product_item.id) {
              
              this.updateProduct();
            } else {
              
              this.createProduct();
            }

          },

          //---------------------------------------

          handleImageUpload(event) {
           
            const file = event.target.files[0];
            if (file) {
              this.product_item.image = file;
          
            }
          }


    }
})