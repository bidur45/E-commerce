import { Fragment } from "react"
import MetaData from "../Layout/MetaData"
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "./OrderSuccess.css";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";


const OrderSuccess = ()=>{
    return(
        <Fragment>
            <MetaData title="Sucess Order"/>
         <div className="orderSuccess">
      <CheckCircleIcon />

      <Typography>Your Order has been Placed successfully </Typography>
      <Link to="/orders/self">View Orders</Link>
    </div>

        </Fragment>
    )
}



export default OrderSuccess