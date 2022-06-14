import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Header from './component/Layout/Header/Header'
import Footer from './component/Layout/Footer/Footer'
import Home from './component/Home/Home'
import webFont from "webfontloader"
import React, { useEffect} from 'react';
import ProductDetails from './component/Product/ProductDetails';
import Product from './component/Product/Product';
import loginSignup from './component/User/loginSignup';
import Store from './store'
import { loadUser } from './actions/userAction';
import UserOptions from '../src/component/Layout/Header/UserOptions';
import { useSelector } from 'react-redux';
import profile from "./component/User/Profile"
import ProtectedRoute from './component/Route/ProtectedRoute';
import updatedProfile from './component/User/EditProfile'
import updatedPassword from './component/User/UpdatePassword';
import Cart from  './component/Cart/Cart'
import Shipping from './component/Cart/Shipping';
import ConfirmOrder from './component/Cart/ConfirmOrder';
import OrderSuccess from './component/Cart/OrderSuccess';
import Orders from './component/order/Orders';
import OrderDetails from "./component/order/OrderDetails"
import Dashboard from "./component/Admin/Dashboard"
import ProductList from './component/Admin/ProductList.js';
import UserList from './component/Admin/UserList';
 import OrderList from './component/Admin/OrderList';
 import CreateProduct from './component/Admin/CreateProduct';
import UpdateUser from './component/Admin/UpdateUser';
import ProcessOrder from './component/Admin/ProcessOrder';
import UpdateProduct from './component/Admin/UpdateProduct';

function App() {
 
  const {isAuthenticated, user } = useSelector(
    (state) => state.user

  ); 
  
  useEffect(() => {
    webFont.load({
      google: {
        families: ["Roboto"]
      }
    })
    Store.dispatch(loadUser())
  }, [])
  return (
    <Router >
      <Header />
      {isAuthenticated && <UserOptions user={user}/>}
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/product/:id' component={ProductDetails} />
        <Route exact path='/products' component={Product} />
        <Route exact path='/products/:keyword' component={Product} />
        <Route exact path='/loginsignup' component={loginSignup}/>
        <ProtectedRoute exact path='/account' component={profile}/>
        <ProtectedRoute exact path='/changeProfile' component={updatedProfile}/>
        <ProtectedRoute exact path='/changePassword' component={updatedPassword}/>
        <ProtectedRoute exact path='/shipping' component={Shipping}/>
        <ProtectedRoute exact path='/confirmOrder' component={ConfirmOrder}/>
        <ProtectedRoute exact path='/order/success' component={OrderSuccess}/>
        <ProtectedRoute exact path='/orders/self' component={Orders}/>
        <ProtectedRoute exact path="/order/:id" component={OrderDetails}/>
        <ProtectedRoute exact isAdmin={true} path="/admin/dashboard" component={Dashboard}/>
        <ProtectedRoute exact isAdmin={true} path="/admin/Products" component={ProductList}/>
        <ProtectedRoute exact isAdmin={true} path="/admin/Product/:id" component={UpdateProduct}/>
        <ProtectedRoute exact isAdmin={true} path="/admin/orders" component={OrderList}/>
        <ProtectedRoute exact isAdmin={true} path="/admin/users" component={UserList}/>
        <ProtectedRoute exact isAdmin={true} path="/admin/user/:id" component={UpdateUser}/>
        <ProtectedRoute exact isAdmin={true} path="/admin/Product" component={CreateProduct}/>
        <ProtectedRoute exact isAdmin={true} path="/admin/order/:id" component={ProcessOrder}/>
        <Route exact path='/cart' component={Cart}/>
      </Switch>
      <Footer />
    </Router>

  );
}

export default App;
