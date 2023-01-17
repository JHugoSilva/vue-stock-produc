<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <h5 class="mb-0">Products</h5>
                        <router-link class="btn btn-success btn-sm rounded-circle" :to="{name: 'product-create'}"><b-icon icon="plus" aria-hidden="true"></b-icon></router-link>
                    </div>
                    <div class="card-body">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col" style="width: 100px;">Id</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Image</th>
                                    <th scope="col">Slug</th>
                                    <th scope="col" style="width: 170px;">Action</th>
                                </tr>
                            </thead>
                            <tbody v-if="products.length">
                                <tr v-for="product in products" :key="product.id">
                                    <th scope="row" style="width: 100px;">{{ product.id }}</th>
                                    <td>{{ product.title }}</td>
                                    <td>{{ product.price }}</td>
                                    <td>
                                        <div style="max-width: 100px; max-height: 100px; overflow: hidden;">
                                            <img :src="product.image" class="img-fluid" alt="" srcset="">
                                        </div>
                                    </td>
                                    <td>{{ product.slug }}</td>
                                    <td style="width: 170px;">
                                        <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                                            <router-link type="button" class="btn btn-warning btn-sm" :to="{name: 'product-edit', params: { id: product.id }}" ><b-icon icon="pencil-square" aria-hidden="true"></b-icon></router-link>
                                            <button type="button" class="btn btn-danger btn-sm" @click="deleteProduct(product)"><b-icon icon="trash2-fill" aria-hidden="true"></b-icon></button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                            <tbody v-else>
                                <tr>
                                    <td colspan="4">
                                        <h5 class="text-center mt-4">No Products Found</h5>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            message: 'Produto Excluído com sucesso!',
            products: [],
        }
    },
    methods: {
        loadProducts() {
            axios.get('/api/product').then(response => {
                this.products = response.data
            })
        },
        async deleteProduct(product) {
            await axios.delete(`/api/product/${product.id}`).then(()=>{
                this.$toast.success(this.message);
            })
            let index = this.products.indexOf(product)
            this.products.splice(index, 1)
        }
    },
    mounted() {
        this.loadProducts()
    }
}
</script>
