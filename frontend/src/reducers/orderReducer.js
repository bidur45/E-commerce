import { CONFIRM_ORDER_REQUEST,
    CONFIRM_ORDER_FAIL,
    CONFIRM_ORDER_SUCCESS,
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
    DELETE_ORDER_RESET,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_FAIL,
    UPDATE_ORDER_RESET,
    CLEAR_ERRORS
} from "../constants/orderConstant";

export const newOrderReducer= ((state={order:[]},action)=>{

   switch(action.type){
       case CONFIRM_ORDER_REQUEST:
           return{
               ...state,
               loading:true,
           }

        case CONFIRM_ORDER_SUCCESS:
            return{
                ...state,
                loading:false,
                order:action.payload
            }

        case CONFIRM_ORDER_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload
            }

            default:
                return state
   }


})


export const MyOrdersReducer = ((state={Orders:[]},action)=>{
    switch (action.type){
        case  MY_ORDERS_REQUEST:
            return{
                loading:true
            }

        case MY_ORDERS_SUCCESS:
            return{
                 loading:false,
                 Orders:action.payload
            }   

            case MY_ORDERS_FAIL:
                return{
                    loading: false,
                    error:action.payload
                }

                case CLEAR_ERRORS:
                    return{
                        ...state,
                        error:null
                    }

                default:
                return state
        
    }


})



export const allOrderReducer = ((state={},action)=>{
    switch(action.type){
    case ALL_ORDERS_REQUEST:
        return{
            ...state,
            loading:true
        }
    case ALL_ORDERS_SUCCESS:
        return{
            loading:false,
            order:action.payload
        }
    case ALL_ORDERS_FAIL:
        return{
            loading:false,
            error:action.payload
        }

    default:
        return state
        
     case CLEAR_ERRORS:
            return{
                ...state,
                error:null
            }

    
    }
})


export const orderDetailsReducer = ((state={order:{}},action)=>{
    switch(action.type){
    case ORDER_DETAILS_REQUEST:
        return{
            loading:true
        }
    case ORDER_DETAILS_SUCCESS:
        return{
            loading:false,
            order:action.payload
        }
    case ORDER_DETAILS_FAIL:
        return{
            loading:false,
            error:action.payload
        }

    default:
        return state
        
     case CLEAR_ERRORS:
            return{
                ...state,
                error:null
            }

    
    }
})
export const deleteOrderReducer = ((state={},action)=>{
    switch(action.type){
    case DELETE_ORDER_REQUEST:
        return{
            loading:true
        }
    case DELETE_ORDER_SUCCESS:
        return{
            loading:false,
            isDeleted:action.payload
        }

    case DELETE_ORDER_RESET:
        return{
            loading:false,
            isDeleted:false
        }
    case DELETE_ORDER_FAIL:
        return{
            loading:false,
            error:action.payload
        }

    default:
        return state
        
     case CLEAR_ERRORS:
            return{
                ...state,
                error:null
            }

    
    }
})

export const updateOrderReducer = ((state={},action)=>{
    switch(action.type){
    case UPDATE_ORDER_REQUEST:
        return{
            ...state,
            loading:true
        }
    case UPDATE_ORDER_SUCCESS:
        return{
            loading:false,
            isupdated:action.payload
        }

    case UPDATE_ORDER_RESET:
        return{
            loading:false,
            isupdated:false
        }
    case UPDATE_ORDER_FAIL:
        return{
            loading:false,
            error:action.payload
        }

    default:
        return state
        
     case CLEAR_ERRORS:
            return{
                ...state,
                error:null
            }

    
    }
})