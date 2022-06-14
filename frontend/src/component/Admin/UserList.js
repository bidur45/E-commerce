import { Fragment,useEffect } from "react"
import {DataGrid} from "@mui/x-data-grid"
import "./productList.css"
import {useDispatch,useSelector} from "react-redux"
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import {Button} from "@mui/material"
import MetaData from "../Layout/MetaData"
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SideBar from "./SideBar"
import {userList,clearErrors,deleteUser} from "../../actions/userAction"
import { DELETE_USER_RESET } from "../../constants/userConstants";


const UserList = ({history})=>{
   const alert = useAlert()
    const dispatch = useDispatch()
    const {error,allUser}=  useSelector(state=>state.userList)
    const {error:deleteError,isDeleted} = useSelector(state=>state.deleteUser)

    const deleteUserHandler=(id)=>{
      dispatch(deleteUser(id))
    }
    const columns = [
        { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },
    
        {
          field: "email",
          headerName: "Email",
          minWidth: 200,
          flex: 1,
        },
        {
          field: "name",
          headerName: "Name",
          minWidth: 150,
          flex: 0.5,
        },
    
        {
          field: "role",
          headerName: "Role",
          type: "number",
          minWidth: 150,
          flex: 0.3,
          cellClassName: (params) => {
            return params.getValue(params.id, "role") === "admin"
              ? "greenColor"
              : "redColor";
          },
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
                <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
                  <EditIcon />
                </Link>
    
                <Button
                  onClick={() =>
                    deleteUserHandler(params.getValue(params.id, "id"))
                  }
                >
                  <DeleteIcon />
                </Button>
              </Fragment>
            );
          },
        },
      ]



    const rows =[]

    allUser && allUser.forEach((item)=>{
        rows.push({
            id:item._id,
            email:item.email,
            name:item.name,
            role:item.role

        })
    })



    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearErrors())
        }

        if(deleteError){
            alert.error(deleteError)
            dispatch(clearErrors())
        }

        if(isDeleted){
            alert.success('user deleted successfully')
             history.push('/admin/dashboard')
             dispatch({type:DELETE_USER_RESET})

        }


   dispatch(userList())
    },[dispatch,alert,error,deleteError,isDeleted,history])


    return(
        <Fragment>
            <MetaData title="user-list"/>
            <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL USERS</h1>

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
        </Fragment>
    )
}


export default UserList