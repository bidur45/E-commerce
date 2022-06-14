import React from "react"
import ReactStars from "react-rating-stars-component"
import './ReviewCard.css'

const ReviewCard = ({ review }) => {
    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomato",
        value: review.rating,
        isHalf: true,
        size: window.innerWidth < 600 ? 20 : 25,
    }
    return (
        <div className="reviewCard">
            <p>{review.name}</p>
            <ReactStars {...options} />
            <div className="comment">{review.comment}</div>
        </div>
    )
}

export default ReviewCard