import { Fragment ,useEffect} from "react"
import { Link } from "react-router-dom"
import MetaData from "../Layout/MetaData"
import Loader from "../Layout/Loader/loader"
import { Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { useAlert } from "react-alert"
import { orderDetails, clearErrors } from "../../actions/orderAction"
import "./orderDetails.css"

const OrderDetails = ({match}) => {
    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, error, order } = useSelector((state) => state.orderDetails)
  useEffect(()=>{
      if(error){
          alert.error(error)
          dispatch(clearErrors())
      }
      dispatch(orderDetails(match.params.id))
  },[alert,error,dispatch,match.params.id])

    return (
        <Fragment>
            {loading ? <Loader /> : (
           <Fragment>
           <MetaData title='orderDetails'/>
           <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <Typography component="h1">
                Order #{order && order._id}
              </Typography>
              <Typography>Shipping Info</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Name:</p>
                  <span>{order.user && order.user.name}</span>
                </div>
                <div>
                  <p>Phone:</p>
                  <span>
                    {order.shippingInfo && order.shippingInfo.phoneNo}
                  </span>
                </div>
                <div>
                  <p>Address:</p>
                  <span>
                    {order.shippingInfo &&
                      `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                  </span>
                </div>
              </div>
              <Typography>Payment</Typography>
              <div className="orderDetailsContainerBox">
            
                <div>
                  <p>Amount:</p>
                  <span>{order.totalPrice && order.totalPrice}</span>
                </div>
              </div>

              <Typography>Order Status</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.orderStatus && order.orderStatus === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.orderStatus && order.orderStatus}
                  </p>
                </div>
              </div>
            </div>

            <div className="orderDetailsCartItems">
              <Typography>Order Items:</Typography>
              <div className="orderDetailsCartItemsContainer">
                {order.orderItems &&
                  order.orderItems.map((item) => (
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
           </Fragment>

            )}

        </Fragment>
    )
}



export default OrderDetails