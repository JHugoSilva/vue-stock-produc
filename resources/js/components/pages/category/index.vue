<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <h5 class="mb-0">Categories</h5>
                        <router-link class="btn btn-success btn-sm rounded-circle" :to="{name: 'category-create'}"><b-icon icon="plus" aria-hidden="true"></b-icon></router-link>
                    </div>
                    <div class="card-body">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Slug</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody v-if="categories.length">
                                <tr v-for="category in categories" :key="category.id">
                                    <th scope="row">{{ category.id }}</th>
                                    <td>{{ category.name }}</td>
                                    <td>{{ category.slug }}</td>
                                    <td>
                                        <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                                            <router-link type="button" class="btn btn-warning btn-sm" :to="{name: 'category-edit', params: { id: category.id }}" ><b-icon icon="pencil-square" aria-hidden="true"></b-icon></router-link>
                                            <button type="button" class="btn btn-danger btn-sm" @click="deleteCategory(category)"><b-icon icon="trash2-fill" aria-hidden="true"></b-icon></button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                            <tbody v-else>
                                <tr>
                                    <td colspan="4">
                                        <h5 class="text-center mt-4">No Categories Found</h5>
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
            message: 'Categoria Excluída com sucesso!',
            categories: [],
        }
    },
    methods: {
        loadCategories() {
            axios.get('/api/category').then(response => {
                this.categories = response.data
            })
        },
        deleteCategory(category) {
            axios.delete(`/api/category/${category.id}`).then(()=>{
                this.$toast.success(this.message);
            })
            //this.loadCategories()
            let index = this.categories.indexOf(category)
            this.categories.splice(index, 1)
        }
    },
    mounted() {
        this.loadCategories()
    }
}
</script>
