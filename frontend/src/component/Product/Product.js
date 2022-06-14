import React, { useEffect,useState } from 'react'
import './Product.css'
import { useSelector, useDispatch } from 'react-redux'
import { getProduct, clearErrors } from '../../actions/productAction'
import Loader from '../Layout/Loader/loader'
import ProductCard from '../Home/ProductCard'
import { useAlert } from 'react-alert'
import Pagination from 'react-js-pagination'
import Slider from '@mui/material/Slider';
import { Typography } from '@mui/material'
import MetaData from '../Layout/MetaData'

const categories = [
    
    "electronics",
    "clothes",
    "smartPhones",
    "sports"  
  ];

const Product = ({match}) => {

    const alert = useAlert()
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0,100000])
    const [category,setCategory]= useState('')
    const [rating,setRating] = useState(0)
    const { loading, products, error, productsCount, resultPerPage, filteredProductCount} = useSelector(state => state.products)
     const keyword = match.params.keyword;
    const setCurrentPageNo=(e)=>{
        setCurrentPage(e)
    }

    const priceHandler = ( newPrice)=>{
        setPrice(newPrice);
    }

    useEffect(() => {
        if (error){
            alert.error();
            dispatch(clearErrors())
        }
        dispatch(getProduct(keyword,currentPage,price,category,rating))
    }, [keyword,dispatch,alert,error,currentPage,price,category,rating])
    return (
        <div>
            {loading ? <Loader /> :
            
                <div className='product'>
                   <MetaData title="products" />

                    <div className='productsHeading'>
                        products
                    </div>
                    <div className='container'>
                        {products && products.length !== 0 ? products.map((product) => (

                            <ProductCard key={product._id} product={product} />

                        )): 
                        <div className='notFound'>
                            product not found
                        </div>}
                     

                    </div>
                 {products && products.length !== 0 ?

                    <div className='filterbox'>
                        <Typography>Price</Typography>
                        <Slider
                        value={price}
                        onChange={priceHandler}
                        valueLabelDisplay="auto"
                        size="small"
                        aria-labelledby='range-slider'
                        min={0}
                        max={100000} />
                        <Typography>Categeory</Typography>
                        <ul className='categeorybox'>
                        {
                            categories.map((category)=>(
                                <li className='categeory-link'
                                key={category}
                                onClick={()=>setCategory(category)}
                                >{category}</li>
                            ))
                        }
                        </ul>
                        <fieldset> 
                            <Typography component="legend">Ratings Above</Typography>
                            <Slider
                            size='small'
                            valueLabelDisplay="auto"
                            value={rating}
                            onChange={(e, newRating)=>{
                                setRating(newRating)
                            }}
                             aria-labelledby="continuous-slider"
                             min={0}
                             max={5}
                            />
                        </fieldset>
                        
                    </div>:(
                        <div>
                        </div>
                    )}

           {resultPerPage < filteredProductCount &&
             <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>

            }
            </div>
            }
        </div>
    )
}

export default Product