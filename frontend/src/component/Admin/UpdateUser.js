import { Fragment, useState, useEffect } from "react"
import "./createProduct.css"
import MetaData from "../Layout/MetaData"
import Loader from "../Layout/Loader/loader"
import { useDispatch, useSelector } from "react-redux"
import { useAlert } from "react-alert"
import { Button } from "@mui/material"
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PersonIcon from "@mui/icons-material/Person";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { updateUser, clearErrors, getUserDetails } from "../../actions/userAction"
import SideBar from "./SideBar"
import { UPDATE_USER_RESET } from "../../constants/userConstants"




const UpdateUser = ({ match, history }) => {
    const dispatch = useDispatch()
    const alert = useAlert()

    const { error:updatedError, isUpdated } = useSelector(state => state.updateUser)
    const { error,loading,user } = useSelector(state => state.userDetails)
    console.log()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [role, setRole] = useState("")

    const userid = match.params.id

    const updateUserSubmitHandler = (e) => {
        e.preventDefault()

        const myform = new FormData()
        myform.set("name", name)
        myform.set("email", email)
        myform.set("role", role)

        dispatch(updateUser(myform, userid))
    }

    useEffect(() => {
        if (  user && user._id !== userid) {
            dispatch(getUserDetails(userid))
        } else {
            setName(user.name)
            setEmail(user.email)
            setRole(user.role)
        }

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
     
        if(updatedError){
            alert.error(updatedError)
        }

        if (isUpdated) {
            alert.success("user updated successfully")
            history.push('/admin/users')
            dispatch({ type: UPDATE_USER_RESET })
        }

    }, [alert, dispatch, isUpdated, history, match, error,user,userid,updatedError])
    return (
        <Fragment>
            <MetaData title="update-user" />
            {loading ? <loader /> : (
                <div className="dashboard">
                    <SideBar />
                    <div className="newProductContainer">
                        {loading ? (
                            <Loader />
                        ) : (
                            <form
                                className="createProductForm"
                                onSubmit={updateUserSubmitHandler}
                            >
                                <h1>Update User</h1>
                                <div>
                                    <PersonIcon />
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <MailOutlineIcon />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>


                                <div>
                                    <VerifiedUserIcon />
                                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                                        <option value="">Choose Role</option>
                                        <option value="admin">Admin</option>
                                        <option value="user">User</option>
                                    </select>
                                </div>

                                <Button
                                    id="createProductBtn"
                                    type="submit"
                             
                                >
                                    Update
                                </Button>
                            </form>
                        )}
                    </div>
                </div>

            )}

        </Fragment>
    )
}


export default UpdateUser