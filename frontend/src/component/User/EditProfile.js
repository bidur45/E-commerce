import React, { Fragment, useState, useEffect } from "react";
import "./EditProfile.css";
import Loader from "../Layout/Loader/loader";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../Layout/MetaData";
import FaceIcon from "@mui/icons-material/Face";
import EmailIcon from '@mui/icons-material/Email';
import { updateProfile, clearErrors, loadUser} from "../../actions/userAction";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";




const EditProfile = ({history})=>{
    const dispatch = useDispatch();
    const alert = useAlert();

    const {user} = useSelector((state)=> state.user);
    const {error, isUpdated, loading} = useSelector((state)=> state.profile)
 
    const [name, setName]= useState("")
    const [email, setEmail]= useState("")
    const [avatar, setAvatar] = useState();

    const [avatarPreview, setAvatarPreview]= useState("./profile.png")


    const updateProfileSubmit = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("avatar", avatar);
        dispatch(updateProfile(myForm));
      };

    const updateProfileDataChange = (e) => {
        const reader = new FileReader();
    
        reader.onload = () => {
          if (reader.readyState === 2) {
            setAvatarPreview(reader.result);
            setAvatar(reader.result);
          }
        };
    
        reader.readAsDataURL(e.target.files[0]);
      };
    


    useEffect(()=>{
        if(user){
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url)
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
          }

          if(isUpdated){
              alert.success("profile update succesfully")
              dispatch(loadUser())
              history.push('/account')
          }
        dispatch({type: UPDATE_PROFILE_RESET})

    },[user,isUpdated,error,alert,dispatch,history])
    

    return(
        <Fragment>
            {loading ? (
                <Loader/>
            ):(
                <Fragment>
          <MetaData title="Update Profile" />
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Update Profile</h2>

              <form
                className="updateProfileForm"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="updateProfileName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="updateProfileEmail">
                  <EmailIcon/>
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div id="updateProfileImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="updateProfileBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
            )}

        </Fragment>
    )
}

export default EditProfile