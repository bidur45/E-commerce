import { Fragment, useEffect } from "react"
import "./createProduct.css"
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@mui/material"
import MetaData from "../Layout/MetaData"
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SideBar from "./SideBar"
import Loader from "../Layout/Loader/loader";
import { allOrderList, clearErrors ,deleteOrder} from "../../actions/orderAction"
import { DELETE_ORDER_RESET } from "../../constants/orderConstant";


const OrderList = ({history}) => {

    const dispatch = useDispatch()
    const alert = useAlert()
    const { error, loading, order } = useSelector(state => state.allOrders)
    const {error:deletedError, isDeleted} = useSelector(state=>state.deleteOrder)


    const deleteOrderHandler=(id)=>{
        dispatch(deleteOrder(id))
    }

const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.4,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteOrderHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    }, 
]


    const rows= [];
    order && order.forEach(item => {
        rows.push({
          id:item._id,
          itemsQty: item.orderItems.length,
          amount: item.totalPrice,
          status: item.orderStatus,
        })
    });


    useEffect(()=>{
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }

        if(deletedError){
            alert.error(deletedError)
            dispatch(clearErrors())
        }
    if(isDeleted){
        alert.success("order deleted successfully")
        history.push('/admin/orders')
        dispatch({type:DELETE_ORDER_RESET})
    }
     
     dispatch(allOrderList())
    },[error,deletedError,history,dispatch,alert,isDeleted])

    return (
        <Fragment>
            <MetaData title="orderList"/>
            {loading ? <Loader/>:(
                 <div className="dashboard">
                 <SideBar />
                 <div className="productListContainer">
                   {order &&  order.length !== 0 ?
                   <div>
                   <h1 id="productListHeading">ALL ORDERS</h1>
         
                   <DataGrid
                     rows={rows}
                     columns={columns}
                     pageSize={10}
                     disableSelectionOnClick
                     className="productListTable"
                     autoHeight
                   />
                   </div> :(
                     <div className="orderexist">
                    No any order placed

                     </div>

                   )
                  }
                 </div>
               </div>
            )}

        </Fragment>
    )
}

export default OrderList