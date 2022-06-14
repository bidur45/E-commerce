import { Fragment, useState, useEffect } from "react"
import "./shipping.css"
import { useDispatch, useSelector } from "react-redux"
import { saveShippingInfo } from "../../actions/cartAction"
import { useAlert } from "react-alert"
import MetaData from "../Layout/MetaData"
import HomeIcon from "@mui/icons-material/Home"
import LocationCityIcon from "@mui/icons-material/LocationCity"
import PinDropIcon from "@mui/icons-material/PinDrop"
import PhoneIcon from "@mui/icons-material/Phone"
import PublicIcon from "@mui/icons-material/Public"
import TransferWithStationIcon from "@mui/icons-material/TransferWithinAStation"




const Shipping = ({history}) => {
    const dispatch = useDispatch()
    const alert = useAlert()
    const { shippingInfo } = useSelector((state) => state.cart)


    const [address, setAddress] = useState(shippingInfo.address);
    const [city, setCity] = useState(shippingInfo.city);
    const [state, setState] = useState(shippingInfo.state);
    const [country, setCountry] = useState(shippingInfo.country);
    const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

    const shippingSubmit=(e)=>{
        e.preventDefault()
        if(phoneNo.length<10 || phoneNo.length>10){
            alert.error("Phone number must be 10 digits")
            return;
        }

        dispatch(saveShippingInfo({address,city,state,country,pinCode,phoneNo}))
        history.push('/confirmOrder')

    }
    return (
        <Fragment>
            <MetaData title="shippingDetails" />
            <div className="shippingContainer">
                <div className="shippingBox">
                    <h2 className="shippingHeading">shippingDetails</h2>
                    <form className="shippingForm"
                        encType="multipart/form-data"
                        onSubmit={shippingSubmit}>
                        <div>
                            <HomeIcon />

                            <input
                                type="text"
                                placeholder="Address"
                                required
                                value={address}
                                onChange={(e) => setAddress(e.target.value)} />
                        </div>
                        <div>
                            <LocationCityIcon />
                            <input
                                type="text"
                                placeholder="City"
                                required
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>

                        <div>
                            <PinDropIcon />
                            <input
                                type="number"
                                placeholder="Pin Code"
                                required
                                value={pinCode}
                                onChange={(e) => setPinCode(e.target.value)}
                            />
                        </div>
                        <div>
                            <PhoneIcon />
                            <input
                                type="number"
                                placeholder="Phone Number"
                                required
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)}
                                size="10"
                            />
                        </div>
                        <div>
                            <PublicIcon />
                            <input
                               placeholder="country"
                                required
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                           />
                              
                        </div>
                        {country && (
                            <div>
                                <TransferWithStationIcon />
                                <input
                                    placeholder="state"
                                    value={state}
                                    requiredvalue={state}
                                    onChange={(e) => setState(e.target.value)}
                                 
                                />
                            </div>
                        )}

                        <input
                            type="submit"
                            value="Continue"
                            className="shippingBtn"
                            disabled={state ? false : true}
                        />




                    </form>

                </div>

            </div>

        </Fragment>
    )
}

export default Shipping