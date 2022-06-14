 import { Fragment } from "react"
 import { Link } from "react-router-dom"
 import "./cartItemCard.css"
 import { useDispatch } from "react-redux"
import { removeItemsFromCart } from "../../actions/cartAction"
 
 const CartItemCard=({item})=>{
     const dispatch = useDispatch()


    const removeFromCart= (id)=>{
       dispatch(removeItemsFromCart(id))
    }
     return(
         <Fragment>
             <div className="CartItemCard">
                 <img src={item.image} alt="ssa"/>
                 <div>
                     <Link to={`/product/${item.product}`}>{item.name}</Link>
                     <span>{`price: ${item.price}`}</span>
                     <p onClick={()=>removeFromCart(item.product)}>Remove</p>
                 </div>

             </div>

         </Fragment>
     )
 }

 export default CartItemCard