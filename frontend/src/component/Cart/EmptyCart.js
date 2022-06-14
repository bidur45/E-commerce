import { Fragment } from "react"
import { Typography } from "@mui/material"
import { Link } from "react-router-dom"
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart"
import './cart.css'

const EmptyCart = () => {
    return (
        <Fragment>
            <div className="emptyCart">
                <RemoveShoppingCartIcon />

                <Typography>No Product in Your Cart</Typography>
                <Link to="/products">View Products</Link>
            </div>

        </Fragment>
    )
}

export default EmptyCart