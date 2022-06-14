import React, {Fragment, useState} from 'react';
import "./Header.css";
import { SpeedDial,SpeedDialAction } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListAltIcon from '@mui/icons-material/ListAlt';
import Backdrop from '@mui/material/Backdrop';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import{useAlert}  from "react-alert"
import { logout } from '../../../actions/userAction';





const UserOptions = ({user})=>{
    const dispatch = useDispatch();
    const history = useHistory();
    const alert = useAlert();

    const [open,setOpen] = useState(false)

    const options = [
        {id:2,icon:<ListAltIcon/>, name:"Orders", func:orders},
        {id:3,icon:<PersonIcon/>, name: "profile", func:account},
        {id:4,icon:<ExitToAppIcon/>, name:"logout", func:logoutUser}
    ]
    if(user.role === "admin"){
        options.unshift({
            id:1,
            icon:<DashboardIcon/>,
            name:"Dashboard",
            func:dashboard
        })
    }

    function dashboard(){
        history.push("/admin/dashboard")
    }

    function orders(){
        history.push("/orders/self")
    }

    function account(){
        history.push("/account")
    }

    function logoutUser(){
        dispatch(logout())
        alert.success("logout Sucessfully")
    }
    return(
        <div className='userOptions'>
            <Fragment>
                <Backdrop open={open} style={{zindex:"10"}} />
                <SpeedDial
                ariaLabel='="SpeedDial tooltip example'
                onClose={()=> setOpen(false)}
                onOpen={()=> setOpen(true)}
                open={open}
                direction="down"
                className='speedDial'
                icon={
                    <img
                    className='speedDialIcon'
                    src={user.avatar.url ? user.avatar.url:"/profile.png"}
                    alt="profile"
                    />
                }
                >
                    {options.map((item)=>{
                        return(
                            <SpeedDialAction key={item.id} icon={item.icon} tooltipTitle={item.name} onClick={item.func}/>
                        )
                    })}

                </SpeedDial>
            </Fragment>

            
        </div>
    )
} 
export default UserOptions