import React from 'react';
import {BrowserRouter,Switch,Route} from "react-router-dom"
import Home from './core/Home'
import Signup from './user/Signup';
import Signin from './user/Signin';
import AdminRoute from './auth/helper/AdminRoutes';
import PrivateRoute from './auth/helper/PrivateRoutes'
import UserDashboard from './user/UserDashBoard'
import ManageOrders from './user/ManageOrders';
import AddOrder from './user/AddOrder';
import OrderStatus from './user/OrderStatus';
import AdminDashboard from './user/AdminDashBoard'
import AddCategory from './admin/AddCategory';
import ManageCategories from './admin/ManageCategories';
import AddProduct from './admin/AddProduct';
import ManageProduct from './admin/ManageProducts';
import UpdateProduct from './admin/UpdateProduct';
import Cart from './core/Cart';
const  Routes=()=>{
    return(
        <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/signup" exact component={Signup}/>
            <Route path="/signin" exact component={Signin}/>
            <Route path="/cart" exact component={Cart}/>
            <PrivateRoute path="/user/dashboard" exact component={UserDashboard}/>
            <PrivateRoute path="/order/all/:userId" exact component={ManageOrders}/>
            <PrivateRoute path="/order/create/:userId" exact component={AddOrder}/>
            <PrivateRoute path="/order/status/:userId" exact component={OrderStatus}/>
            <AdminRoute path="/admin/dashboard" exact component={AdminDashboard}/>
            <AdminRoute path="/admin/create/category" exact component={AddCategory}/>
            <AdminRoute path="/admin/categories" exact component={ManageCategories}/>
            <AdminRoute path="/admin/create/product" exact component={AddProduct}/>
            <AdminRoute path="/admin/products" exact component={ManageProduct}/>
            <AdminRoute path="/admin/product/update/:productId" exact component={UpdateProduct}/>
            <AdminRoute path="/admin/categories" exact component={ManageCategories}/>
            {/* <AdminRoute path="/admin/orders" exact component={ManageCategories}/> */}

        </Switch>
        </BrowserRouter>
    )
}

export default Routes