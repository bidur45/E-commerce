import { createStore, combineReducers, applyMiddleware} from "redux"
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"
import { 
    adminProductReducer,
    deleteProductReducer,
    newProductReducer,
    productDetailsReducer,
    productReducer, 
    productReviewReducer,
    updateProductReducer,
} from "./reducers/productReducer"

import {
    profileUpdateReducer,
    userListReducer,
    userReducer,
    deleteUserReducer,
    updateUserReducer,
    userDetailsReducer
} from './reducers/userReducer'
import { cartReducer } from "./reducers/cartReducer"
import { MyOrdersReducer, newOrderReducer,orderDetailsReducer,allOrderReducer, deleteOrderReducer, updateOrderReducer } from "./reducers/orderReducer"


const reducer = combineReducers({
 products:productReducer,
 productDetails:productDetailsReducer,
 user:userReducer,
 profile:profileUpdateReducer,
 cart:cartReducer,
 newOrder:newOrderReducer,
 myOrder:MyOrdersReducer,
 orderDetails:orderDetailsReducer,
 productReview:productReviewReducer,
 adminProduct:adminProductReducer,
 deleteProduct:deleteProductReducer,
 newProduct:newProductReducer,
 userList:userListReducer,
 deleteUser:deleteUserReducer,
 updateUser:updateUserReducer,
 userDetails:userDetailsReducer,
 allOrders:allOrderReducer,
 deleteOrder:deleteOrderReducer,
 updateOrder:updateOrderReducer,
 updateProduct:updateProductReducer
})

let InitialState={
    cart: {
        cartItems: sessionStorage.getItem("cartItems")
          ? JSON.parse(sessionStorage.getItem("cartItems"))
          : [],
          shippingInfo:sessionStorage.getItem("shippingInfo")
          ? JSON.parse(sessionStorage.getItem("shippingInfo"))
          :{}
    }
}

const middleware = [thunk]

const store = createStore(
    reducer,
    InitialState,
    composeWithDevTools(applyMiddleware(...middleware))
    )

export default store