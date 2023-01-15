<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <h5 class="mb-0">Create Category</h5>
                        <router-link class="btn btn-success btn-sm rounded-circle"
                            :to="{ name: 'category-list' }"><b-icon icon="arrow-bar-left"
                                aria-hidden="true"></b-icon></router-link>
                    </div>

                    <div class="card-body">
                        <div class="row">
                            <div class="col-8">
                                <form @submit.prevent="createCategory">
                                    <div class="form-group mb-3">
                                        <label for="">Category Name</label>
                                        <input type="text" v-model="categoryForm.name" class="form-control"
                                            placeholder="Category Name"
                                            :class="{ 'is-invalid': categoryForm.errors.has('name') }">
                                        <HasError :form="categoryForm" field="name" />


                                    </div>
                                    <div class="form-group">
                                        <button type="submit" class="btn btn-secondary btn-sm"><b-icon icon="save-fill"
                                                aria-hidden="true"></b-icon> Save</button>
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
export default {
    data() {
        return {
            message: 'Categoria Salva com sucesso!',
            categoryForm: new Form({
                name: ''
            })
        }
    },
    methods: {
        createCategory() {
            this.categoryForm.post('/api/category').then(({ data }) => {
                this.categoryForm.name = ''
                this.$toast.success(this.message);
            }).catch((error) => {
                console.log(error.response.data.errors.name)
            })
        }
    }
}
</script>
