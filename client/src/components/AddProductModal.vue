<template>
  <div>
    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Add Product To Your Store"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
          <!-- name -->
        <b-form-group
          label="name"
          label-for="name-input"
          invalid-feedback="name is required"
        >
          <b-form-input
            id="name-input"
            v-model="name"
            type="text"
            required
          ></b-form-input>
        </b-form-group>

            <!-- quantity -->

        <b-form-group
          label="quantity"
          label-for="qty-input"
          invalid-feedback="qty is required"
        >
          <b-form-input
            id="qty-input"
            v-model="qty"
            type="number"
            required
          ></b-form-input>
        </b-form-group>

        <!-- category -->
        <b-form-group
          label="category"
          label-for="category-input"
          invalid-feedback="category is required"
        >
          <b-form-select
          id="category-input"
          v-model="category"
          :options="categories"
          required
        ></b-form-select>
        </b-form-group>

        <!-- price -->
        <b-form-group
          label="price"
          label-for="price-input"
          invalid-feedback="price is required"
        >
          <b-form-input
            id="price-input"
            v-model="price"
            required
            type="number"
          ></b-form-input>
        </b-form-group>

        <!--  image-->
        <b-form-group
          label="image"
          label-for="image-input"
          invalid-feedback="image is required"
        >
          <b-form-file
            v-model="image"
            :state="Boolean(image)"
            placeholder="Choose a file or drop it here..."
            drop-placeholder="Drop file here..."
            ></b-form-file>
        </b-form-group>


      </form>
    </b-modal>
  </div>
</template>

<script>
import FormData from 'form-data'
import axios from '@/api/server.js'

export default {
    created() {    
    },
    data () {
        return {
            name: '',
            qty: '',
            price: '',
            category: '',
            image : null,
            categories: [{ text: 'Select One', value: null }, 'food', 'fashion', 'electronics', 'books', 'homecare']
        }
    },
    methods: {
        checkFormValidity () {
            const valid = this.$refs.form.checkValidity()
            this.nameState = valid ? 'valid' : 'invalid'
            return valid
        },
        resetModal () {
            this.name = ''
            this.qty =''
            this.price = ''
            this.category = '',
            this.image = null
        },
        handleOk (bvModalEvt) {
        // Prevent modal from closing
            bvModalEvt.preventDefault()
            // Trigger submit handler
            this.handleSubmit()
        },
        handleSubmit () {
        // Exit when the form isn't valid
            if (!this.checkFormValidity()) {
                return
            }
            // Push the name to submitted names
            let data = new FormData();                
            data.append('name', this.name)
            data.append('qty', this.qty)
            data.append('image', this.image)
            data.append('price', this.price)
            data.append('category', this.category)           
            console.log(data.values(), 'ini data add product')
            axios.
                post('/products',data , {
                    headers : {
                        token : localStorage.getItem('token')
                    }
                })
                .then(({data}) => {
                    console.log(data)
                })
                .catch(err => {
                    console.log(err)
                })
            
            // Hide the modal manually
            this.$nextTick(() => {
                this.$refs.modal.hide()
            })
        }
    }
}
</script>
