import { Fragment, useEffect } from "react"
import { DataGrid } from "@mui/x-data-grid"
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import {
    clearErrors,
    getAdminProduct,
    deleteProduct

} from "../../actions/productAction";
import {DELETE_PRODUCT_RESET} from "../../constants/productConstants"
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@mui/material"
import MetaData from "../Layout/MetaData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SideBar from "./SideBar";

import Loader from "../Layout/Loader/loader";

const ProductList = ({ history }) => {
    const { error, loading, adminProducts } = useSelector(state => state.adminProduct)
    const {error:deleteError, success}= useSelector(state=>state.deleteProduct)
    const dispatch = useDispatch()
    const alert = useAlert()

    const deleteProductHandler=(id)=>{
        dispatch(deleteProduct(id))
    }

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if(deleteError)
        {
            alert.error(deleteError)
            dispatch(clearErrors())
        }
        if(success){
            alert.success("Product delete Successfully")
            history.push("/admin/dashboard")
            dispatch({type:DELETE_PRODUCT_RESET})
        }


        dispatch(getAdminProduct())
    }, [error, alert, dispatch,deleteError,history,success])


    const columns = [
        { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

        {
          field: "name",
          headerName: "Name",
          minWidth: 350,
          flex: 1,
        },
        {
          field: "stock",
          headerName: "Stock",
          type: "number",
          minWidth: 150,
          flex: 0.3,
        },
    
        {
          field: "price",
          headerName: "Price",
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
                <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
                  <EditIcon />
                </Link>
    
                <Button
                  onClick={() =>
                    deleteProductHandler(params.getValue(params.id, "id"))
                  }
                >
                  <DeleteIcon />
                </Button>
              </Fragment>
            );
          },
        },
      ];
    
    const rows=[]

    adminProducts &&
    adminProducts.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.stock,
        price: item.price,
        name: item.name,
      });
    });
    return (
        <Fragment>
            <MetaData title="admin-Products"/>
            {loading ? <Loader /> : (
                <div className="dashboard">
                    <SideBar />
                    <div className="productListContainer">
                        <h1 id="productListHeading">ALL PRODUCTS</h1>

                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={10}
                            disableSelectionOnClick
                            className="productListTable"
                            autoHeight
                        />
                    </div>


                </div>
            )}

        </Fragment>
    )
}

export default ProductList