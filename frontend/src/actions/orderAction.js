import axios from "axios"
import {CONFIRM_ORDER_REQUEST,
    CONFIRM_ORDER_SUCCESS,
    CONFIRM_ORDER_FAIL,
    CLEAR_ERRORS,
    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    MY_ORDERS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ALL_ORDERS_REQUEST,
    ALL_ORDERS_SUCCESS,
    ALL_ORDERS_FAIL,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_FAIL,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_FAIL


} from "../constants/orderConstant"




export const createOrder = (orderInfo)=>async(dispatch)=>{
    
    
    try{
    dispatch({type:CONFIRM_ORDER_REQUEST})
    const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

    const {data} = await axios.post(`/api/v1/order/new`,orderInfo,config)

    dispatch({type:CONFIRM_ORDER_SUCCESS,payload:data.order})
    }catch(error){
        dispatch({type:CONFIRM_ORDER_FAIL,payload:error.response.data.message})
    }



}


export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,

    })
}



export const myOrders=()=>async(dispatch)=>{
    try{
        dispatch({type:MY_ORDERS_REQUEST})

        const {data} = await axios.get(`/api/v1/orders/self`)

        dispatch({type:MY_ORDERS_SUCCESS,payload:data.orders})

    }catch(error){
        dispatch({type:MY_ORDERS_FAIL,payload:error.response.data.message})
    }
}


export const orderDetails=(id)=>async(dispatch)=>{
    try{
        dispatch({type:ORDER_DETAILS_REQUEST})

        const {data} = await axios.get(`/api/v1/order/${id}`)
        dispatch({type:ORDER_DETAILS_SUCCESS,payload:data.order})

    }catch(error){
        dispatch({type:ORDER_DETAILS_FAIL,payload:error.response.data.message})
    }
}

export const allOrderList =()=>async(dispatch)=>{
    try{
        dispatch({type:ALL_ORDERS_REQUEST})
        const { data } = await axios.get("/api/v1/admin/orders");
        dispatch({type:ALL_ORDERS_SUCCESS,payload:data.orders})

    }catch(error){
        dispatch({type:ALL_ORDERS_FAIL,payload:error.response.data.message})

    }
}

export const deleteOrder =(id)=>async(dispatch)=>{
    try{
        dispatch({type:DELETE_ORDER_REQUEST})
        const {data} = await axios.delete(`/api/v1/admin/order/${id}`)
        dispatch({type:DELETE_ORDER_SUCCESS,payload:data.success})

    }catch(error){
        dispatch({type:DELETE_ORDER_FAIL,payload:error.response.data.message})

    }
}


//Update Order
export const updateOrder = (id, order) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ORDER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      `/api/v1/admin/order/${id}`,
      order,
      config
    );

    dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
}
