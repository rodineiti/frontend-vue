/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import { isLoggedIn } from '../services/auth';

import Home from '@/components/Home'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Category from '@/components/Category/Category'
import AddCategory from '@/components/Category/AddCategory'
import EditCategory from '@/components/Category/EditCategory'
import BillPay from '@/components/BillPay/BillPay'
import AddBillPay from '@/components/BillPay/AddBillPay'
import EditBillPay from '@/components/BillPay/EditBillPay'
import BillReceive from '@/components/BillReceive/BillReceive'
import AddBillReceive from '@/components/BillReceive/AddBillReceive'
import EditBillReceive from '@/components/BillReceive/EditBillReceive'
import Report from '@/components/Report/Report'
import Graphic from '@/components/Graphic/Graphic'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'Home', component: Home, },
    { path: '/login', name: 'Login', component: Login },
    { path: '/register', name: 'Register', component: Register },
    { path: '/category', name: 'Category', component: Category },
    { path: '/category/add', name: 'AddCategory', component: AddCategory },
    { path: '/category/edit/:id', name: 'EditCategory', component: EditCategory },
    { path: '/billpay', name: 'BillPay', component: BillPay },
    { path: '/billpay/add', name: 'AddBillPay', component: AddBillPay },
    { path: '/billpay/edit/:id', name: 'EditBillPay', component: EditBillPay },
    { path: '/billreceive', name: 'BillReceive', component: BillReceive },
    { path: '/billreceive/add', name: 'AddBillReceive', component: AddBillReceive },
    { path: '/billreceive/edit/:id', name: 'EditBillReceive', component: EditBillReceive },
    { path: '/report', name: 'Report', component: Report },
    { path: '/graphic', name: 'Graphic', component: Graphic },
    { path: '*', redirect: '/' }
  ]
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = isLoggedIn();

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
})

export default router;
