import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './Home.css'
import MetaData from '../Layout/MetaData'
import { getFeaturesProduct, clearErrors } from '../../actions/productAction'
import ProductCard from './ProductCard'
import Loader from '../Layout/Loader/loader'
import { useAlert } from "react-alert"



const Home = () => {
    const alert = useAlert()
    const dispatch = useDispatch()
    const { loading, error, products} = useSelector(state => state.products)
    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        dispatch(getFeaturesProduct())
    }, [dispatch, error, alert])
    return (
        <div>
            {loading ? <Loader /> :
                <div>
                    <MetaData title="sabaikoPasal" />
                    <div className="home">
                        <h1>
                            Featured Products
                        </h1>
                        <div className='container'>
                            {products && products.map((product) => (

                                <ProductCard key={product._id} product={product} />

                            ))}
                        </div>
                    </div>
                </div>
            }


        </div>
    )
}

export default Home