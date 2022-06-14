import { Fragment, useState, useEffect } from "react"
import "./UpdatePassword.css"
import Loader from '../Layout/Loader/loader'
import MetaData from '../Layout/MetaData'
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import { useSelector, useDispatch } from "react-redux";
import { updateUserPassword,clearErrors, loadUser } from "../../actions/userAction";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import { useAlert } from "react-alert";


const UpdatePassword = ({ history }) => {
    const alert = useAlert();
    const dispatch = useDispatch()
    const { isUpdated, error, loading } = useSelector((state) => state.profile);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit=(e)=>{
   e.preventDefault()
    
   const myform = new FormData()

   myform.set("oldPassword",oldPassword)
   myform.set("newPassword",newPassword)
   myform.set("confirmPassword",confirmPassword)
   
   dispatch(updateUserPassword(myform))
  }

  useEffect(()=>{
      if(error){
          alert.error(clearErrors())
      }

      if(isUpdated){
        alert.success("Profile Updated Successfully");
          history.push('/account')
          dispatch(loadUser())
          dispatch({type:UPDATE_PASSWORD_RESET})
      }
  },[history,alert,error,dispatch,isUpdated])


    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title='Change Password' />
                    <div className="updatePasswordContainer">
                        <div className="updatePasswordBox">
                            <h2 className="updatePasswordHeading">
                                Update Profile
                            </h2>
                            <form className="updatePasswordForm"
                                onSubmit={updatePasswordSubmit}>
                                <div className="loginPassword">
                                    <VpnKeyIcon />
                                    <input
                                        type="password"
                                        placeholder="Old Password"
                                        required
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                    />
                                </div>

                                <div className="loginPassword">
                                    <LockOpenIcon />
                                    <input
                                        type="password"
                                        placeholder="New Password"
                                        required
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>
                                <div className="loginPassword">
                                    <LockIcon />
                                    <input
                                        type="password"
                                        placeholder="Confirm Password"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                                <input
                                    type="submit"
                                    value="Change"
                                    className="updatePasswordBtn"
                                />
                            </form>

                        </div>

                    </div>
                </Fragment>
            )}

        </Fragment>
    )
}

export default UpdatePassword