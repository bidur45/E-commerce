import { Fragment, useEffect } from "react"
import MetaData from "../Layout/MetaData";
import "./confirmorder.css"
import { useDispatch,useSelector } from "react-redux";
import { Typography } from "@mui/material";
import {Link} from "react-router-dom"
import { createOrder } from "../../actions/orderAction";
import { useAlert } from "react-alert";

const ConfirmOrder = ({history})=>{
  const alert = useAlert()

  const dispatch = useDispatch()
  const {cartItems,shippingInfo} = useSelector((state)=>state.cart)
  const {user} = useSelector((state)=>state.user)
  const {error} = useSelector((state)=>state.newOrder)

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;
  const subtotal =  cartItems.reduce((acc,item)=> acc + item.quantity * item.price,0)
  const shippingPrice = subtotal > 1000 ? 200 : 0;

  const taxPrice = subtotal * 0.15;

  const totalPrice = subtotal + taxPrice + shippingPrice;


  const confirmOrder = ()=>{
    const orderInfo = {
        shippingInfo,
        orderItems:cartItems,
        shippingPrice,
        taxPrice,
        totalPrice,
      };
      dispatch(createOrder(orderInfo))
      sessionStorage.setItem("orderInfo", JSON.stringify(orderInfo));
      history.push("/order/success");
      
  }

  useEffect(()=>{
    if(error){
      alert.error(error)
    }
  },[])
    return(
        <Fragment>
         <MetaData title="confirm Order"/>
         <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>
                      {item.name}
                    </Link>{" "}
                    <span>
                      {item.quantity} X ₹{item.price} ={" "}
                      <b>₹{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="orderSummary">
            <Typography>Order Summery</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>₹{subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>₹{shippingPrice}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>₹{taxPrice}</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>₹{totalPrice}</span>
            </div>

            <button onClick={confirmOrder}>confirm order</button>
          </div>
        </div>
      </div>
        </Fragment>
    )
}

export default ConfirmOrder;

