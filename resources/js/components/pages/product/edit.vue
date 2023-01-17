<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <h5 class="mb-0">Edit Product - {{ productForm.title }}</h5>
                        <router-link class="btn btn-success btn-sm rounded-circle"
                            :to="{ name: 'product-list' }"><b-icon icon="arrow-bar-left"
                                aria-hidden="true"></b-icon></router-link>
                    </div>

                    <div class="card-body">
                        <div class="row">
                            <div class="col-12">
                                <form @submit.prevent="saveProduct">
                                    <div class="form-group mb-3">
                                        <label for="">Product Title</label>
                                        <input type="text" v-model="productForm.title" class="form-control"
                                            placeholder="Product Title"
                                            :class="{ 'is-invalid': productForm.errors.has('title') }">
                                        <HasError :form="productForm" field="title" />
                                    </div>
                                    <div class="form-group mb-3">
                                        <label for="">Product Price</label>
                                        <input type="price" v-model="productForm.price" class="form-control"
                                            placeholder="Product Price" name="price"
                                            :class="{ 'is-invalid': productForm.errors.has('price') }">
                                        <HasError :form="productForm" field="price" />
                                    </div>
                                    <div class="row">
                                        <div class="col-8">
                                            <div class="form-group mb-3">
                                                <label for="">Product Image</label>
                                                <input type="file" class="form-control" name="image" @change="onImageChange"
                                                    :class="{ 'is-invalid': productForm.errors.has('image') }">
                                                <HasError :form="productForm" field="image" />
                                            </div>
                                        </div>
                                        <div class="col-4">
                                            <div style="width: 100%; max-height: 200px; overflow: hidden;">
                                                <img :src="image" alt="" srcset="" class="img-fluid">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group mb-3">
                                        <label for="">Product Description</label>
                                        <textarea v-model="productForm.description" class="form-control"
                                            placeholder="Description" name="description" rows="3"
                                            :class="{ 'is-invalid': productForm.errors.has('description') }"> </textarea>
                                        <HasError :form="productForm" field="description" />
                                    </div>
                                    <div class="form-group">
                                        <button type="submit" class="btn btn-secondary btn-sm"><b-icon icon="save-fill"
                                                aria-hidden="true"></b-icon> Update</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Form } from 'vform';
import { objectToFormData } from 'object-to-formdata'

export default {
    data() {
        return {
            message: 'Produto Atualizado com sucesso!',
            id: this.$route.params.id,
            productForm: new Form({
                title: '',
                price: '',
                image: '',
                description: '',
                _method: 'PUT'
            }),
            image: ''
        }
    },
    methods: {
        loadProductData() {
            axios.get(`/api/product/${this.id}/edit`).then(response => {
                let product = response.data
                this.productForm.title = product.title
                this.productForm.price = product.price
                this.productForm.description = product.description
                this.image = product.image
            })
        },
        saveProduct() {

           this.productForm.post('/api/product/'+this.id,{

               transformRequest:[function(data, headers){
                   return objectToFormData(data)
               }],
               onUploadProgress: e => {
                console.log(e)
               }
           }).then(({ data }) => {
                this.$toast.success(this.message);
                this.image = data.image
                // this.productForm.title = ''
                // this.productForm.price = ''
                // this.productForm.description = ''
            }).catch((error) => {
                console.log(error)
            })
        },
        onImageChange(e) {
            const file = e.target.files[0]
            this.productForm.image = file
        }
    },
    mounted() {
        this.loadProductData()
    }
}
</script>
