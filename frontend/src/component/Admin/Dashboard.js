import { Fragment,useEffect } from "react"
import MetaData from "../Layout/MetaData"
import "./dashboard.css"
import Sidebar from "./SideBar"
import {  Typography } from "@mui/material"
import {Link} from "react-router-dom"
import {useDispatch,useSelector} from "react-redux"
import {
  clearErrors,
  getAdminProduct,
  

} from "../../actions/productAction";
import {useAlert}  from  "react-alert"
import { userList } from "../../actions/userAction"
import { allOrderList } from "../../actions/orderAction"



const Dashboard = ()=>{
  const dispatch = useDispatch();
  const alert = useAlert()
 const { error, adminProducts } = useSelector(state => state.adminProduct)
 const {order} = useSelector(state=>state.allOrders)
 const {allUser}=useSelector(state=>state.userList)
 
 let outOfStock = 0;
 adminProducts && adminProducts.forEach(item => {
      if(item.stock === 0){
          outOfStock += 1
      }
 });


  let deliviredAmount =  0

  order && order.forEach((item)=>{
    if(item.orderStatus === "Delivered"){
      deliviredAmount += item.totalPrice 
}
  })




 useEffect(()=>{
   if(error){
     alert.error(error)
     dispatch(clearErrors())
   }
   dispatch(getAdminProduct())
   dispatch(userList())
   dispatch(allOrderList())
 },[dispatch,alert,error])

    return(
        <Fragment>
            <div className="dashboard">
                <MetaData title="Dashboard -- AdminPanel"/>
            <Sidebar/>

            <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>

        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount sold <br /> {deliviredAmount}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>products</p>
              <p>{adminProducts &&  adminProducts ? adminProducts.length:0}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{order && order? order.length:0}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{allUser && allUser ? allUser.length:0}</p>
            </Link>
            <Link to="/admin/users">
              <p>Stock</p>
              <p>{adminProducts.length - outOfStock}</p>
            </Link>
            <Link to="/admin/users">
              <p>outOfStock</p>
              <p>{outOfStock}</p>
            </Link>
          </div>
        </div>


      </div> 
            </div>
        </Fragment>
    )
}


export default Dashboard