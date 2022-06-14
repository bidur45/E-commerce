import { Fragment } from "react"
import CartItemCard from "./CartItemCard"
import "./cart.css"
import { useDispatch, useSelector } from "react-redux"
import { addItemsToCart } from "../../actions/cartAction"
import EmptyCart from "./EmptyCart"
import { useHistory } from "react-router-dom"
import MetaData from "../Layout/MetaData"


const Cart = () => {
    const dispatch = useDispatch();
    const history = useHistory()
    
    const { cartItems } = useSelector((state) => state.cart)


    const increaseQuantity = (id,stock,quantity)=>{
   
        const Qty = quantity + 1;
        if(stock<=quantity){
       return;
      }

     dispatch(addItemsToCart(id,Qty))
    }

    const decreaseQuantity=(id,stock,quantity)=>{
        const Qty = quantity-1

     if(quantity<=1){   
     return
    }

    dispatch(addItemsToCart(id,Qty))
    }

    const checkOutHandler=()=>{
      history.push('/loginsignup?redirect=shipping')
    }
    

    return (
        <Fragment>
            <MetaData title="cart"/>
            {cartItems.length === 0 ? <EmptyCart/>:
                    <div className="cartPage">
                <div className="cartHeader">
                    <p>Product</p>
                    <p>Quantity</p>
                    <p>Subtotal</p>

                </div>

                {cartItems && cartItems.map((item) => ( 
                    <div  key={item.product} className="cartContainer">
                        <CartItemCard item={item} />
                        <div className="cartInput">
                            <button onClick={()=>decreaseQuantity(item.product, item.stock,item.quantity)}>-</button>
                            <input type="number" value={item.quantity} readOnly />
                            <button onClick={()=>increaseQuantity(item.product, item.stock, item.quantity)}>+</button>

                        </div>
                        <p className="cartSubtotal">{item.price * item.quantity}</p>
                    </div>

                ))}
                <div className="cartGrossProfit">
                    <div></div>
                    <div className="cartGrossProfitBox">
                        <p>GrossTotal</p>
                        <p>{cartItems.reduce((acc,item)=> acc + item.quantity * item.price,0)}</p>
                    </div>
                    <div></div>
                    <div className="checkOutBtn">
                        <button onClick={checkOutHandler}>Check Out</button>
                    </div>

                </div>


            </div>

                }
        </Fragment>
    )
}

export default Cart