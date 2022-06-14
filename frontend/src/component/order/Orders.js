import { Fragment, useEffect } from "react"
import { DataGrid } from "@mui/x-data-grid"
import MetaData from "../Layout/MetaData"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { useAlert } from "react-alert"
import "./order.css"
import { Typography } from "@mui/material"
import LaunchIcon from '@mui/icons-material/Launch';
import { clearErrors, myOrders } from "../../actions/orderAction"
import Loader from "../Layout/Loader/loader"




const Orders = () => {
    const dispatch = useDispatch()
    const alert = useAlert()



    const { loading, error, Orders } = useSelector((state) => state.myOrder)
    const { user } = useSelector((state) => state.user)


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
            flex: 0.3,
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
                    <Link to={`/order/${params.getValue(params.id, "id")}`}>
                        <LaunchIcon />
                    </Link>
                );
            },
        },
    ];
    const rows = [];

    Orders &&
        Orders.forEach((item, index) => {
            rows.push({
                itemsQty: item.orderItems.length,
                id: item._id,
                status: item.orderStatus,
                amount: item.totalPrice,
            });
        });


    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        dispatch(myOrders())
    }, [dispatch, alert, error])
    return (
        <Fragment>
            <MetaData title={`${user.name}= orders`} />

            {loading ? <Loader /> : (
                <div className="orderPage">
                    <div className="myOrdersPage">
                        {Orders && Orders.length !== 0 ? 
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={10}
                            disableSelectionOnClick
                            className="myOrdersTable"
                            autoHeight
                        /> : (
                            <div className="orderExist">
                                No any order placed
                            </div>
                        )}
                        
                        <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
                    </div>
                </div>
            )}
        </Fragment>
    )
}

export default Orders