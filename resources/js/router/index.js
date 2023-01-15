import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter)

import Home from '../components/pages/Home.vue'
import Category from '../components/pages/category';
import CreateCategory from '../components/pages/category/create';
import EditCategory from '../components/pages/category/edit';
import Product from '../components/pages/product';
import CreateProduct from '../components/pages/product/create';
import EditProduct from '../components/pages/product/edit';

const routes = new VueRouter({
    mode: 'history',
    linkExactActiveClass: 'active',
    routes: [
        {
            path: '/',
            component: Home,
            name: 'home'
        },
        {
            path: '/category',
            component: Category,
            name: 'category-list'
        },
        {
            path: '/category/create',
            component: CreateCategory,
            name: 'category-create'
        }
        ,
        {
            path: '/category/edit/:id',
            component: EditCategory,
            name: 'category-edit'
        },
        {
            path: '/product',
            component: Product,
            name: 'product-list'
        },
        {
            path: '/product/create',
            component: CreateProduct,
            name: 'product-create'
        }
        ,
        {
            path: '/product/edit/:id',
            component: EditProduct,
            name: 'product-edit'
        },
    ]
})

export default routes
