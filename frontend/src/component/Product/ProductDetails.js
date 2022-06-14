import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getProductDetails, clearErrors,productReview } from "../../actions/productAction"
// import Carousel from 'react-material-ui-carousel'
import './ProductDetails.css'
import ReactStars from "react-rating-stars-component"
import ReviewCard from './ReviewCard'
import Loader from '../Layout/Loader/loader'
import { useAlert } from "react-alert"
import MetaData from "../Layout/MetaData"
import { addItemsToCart } from "../../actions/cartAction"
import  {Dialog,DialogActions,DialogContent,DialogTitle,Button} from "@mui/material"
import {Rating} from "@material-ui/lab"

import { NEW_REVIEW_RESET } from "../../constants/productConstants"


const ProductDetails = ({ match,history }) => {

    const [quantity, setQuantity] = useState(1)
    const [open,setOpen] = useState(false)
    const [comment,setComment]= useState("")
    const [rating,setRating]= useState(0)

    const { product, loading, error } = useSelector(state => state.productDetails)
    const {Review,error:reviewerror} = useSelector(state=>state.productReview)



    const alert = useAlert()
    const dispatch = useDispatch()

    const increaseQuantity = () => {
        
        if(product.stock <= quantity) return
        const qty = quantity + 1
        setQuantity(qty)
    }
    const decreaseQuantity = () => {
        if(quantity <= 1) return
        const qty = quantity -1
        setQuantity(qty)

    }

    const addToCartHandler=(e)=>{
        
         dispatch(addItemsToCart(match.params.id,quantity))
         alert.success("Item Added To Cart")
         history.push('/Cart')

    }
   

    

    const submitReviewToggle = ()=>{
        open ? setOpen(false):setOpen(true);
    }

    const submitReviewHandler=()=>{
     const myForm = new FormData()
     myForm.set("rating", rating);
     myForm.set("comment", comment)
     myForm.set("productId", match.params.id)


     
      dispatch(productReview(myForm))
      setOpen(false)
    }


    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomato",
        value: product.ratings,
        isHalf: true,
        size: window.innerWidth < 600 ? 20 : 25,
    }
    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }


        if(reviewerror){
            alert.error(reviewerror)
            dispatch(clearErrors())
        }

        if(Review){
            alert.success("Review submitted successfully")
            dispatch({type:NEW_REVIEW_RESET})
        }
        dispatch(getProductDetails(match.params.id))
    }, [dispatch, alert, error, match.params.id,Review,reviewerror])
    return (
        <div>
            {loading ? <Loader /> :
                <div>
                    <MetaData title="ProductDetails" />

                    <div className="productDetails">
                        <div>
                            {product.images && product.images.map((item, i) => {
                                return (
                                    <img className="carouselImage"
                                        key={item.url}
                                        src={item.url}
                                        alt={`${i} Slide`}></img>
                                )
                            })}

                        </div>
                        <div>
                            <div className="block-1">
                                <h2>{product.name}</h2>
                                <p>{product._id}</p>
                            </div>
                            <div className="block-2">
                                <ReactStars {...options} />
                                <span >({product.numOfReviews} Reviews)</span>
                            </div>
                            <div className="block-3">
                                <h1>{product.price}</h1>

                                <div className="block-4">
                                    <div className="block-5">
                                        <button onClick={decreaseQuantity}>-</button>
                                        <input readOnly value={quantity} />
                                        <button onClick={increaseQuantity}>+</button>
                                    </div>

                                    <button disabled={product.stock < 1 ? true:false} onClick={addToCartHandler}>Add to cart</button>
                                </div>
                                <p>
                                    Status:
                                    <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                                        {product.stock < 1 ? "OutOfStock" : "InStock"}
                                    </b>
                                </p>
                            </div>
                            <div className="block-6">
                                Description: <p>{product.description}</p>
                            </div>
                            <div className="submitreview">
                                <button onClick={submitReviewToggle}>Submit review</button>
                            </div>

                        </div>
                    </div>
                    <h2 className="reviewsHeading">REVIEWS</h2>
                    <Dialog
                    aria-labelledby="simple-dialog-title"
                    open={open}
                    onClose={submitReviewToggle}
                    >
                        <DialogTitle>
                            Submit Review
                        </DialogTitle>
                        <DialogContent className="submitDialog">
                         <Rating
                         onChange={(e)=> setRating(e.target.value)}
                         value={rating}
                         size="Large"
                         >

                         </Rating>
                         <textarea className="submitDialogTextArea"
                         cols="30"
                         rows="5"
                         value={comment}
                         onChange={(e)=>setComment(e.target.value)}
                         >
                         </textarea>
                        </DialogContent>
                        <DialogActions>
                            <Button color="secondary" onClick={submitReviewToggle}>Cancel</Button>
                            <Button color="primary" onClick={submitReviewHandler}>Submit</Button>
                        </DialogActions>

                    </Dialog>
                    <div className="reviews">
                        {product.reviews && product.reviews[0] ? (
                            product.reviews.map((review) => <ReviewCard review={review} />)
                        ) : (
                            <p className="noReviews">No Reviews Yet</p>
                        )}
                    </div>

                </div>
            }

        </div>
    )
}



export default ProductDetails