import { Fragment, useState, useEffect } from "react"
import "./createProduct.css"
import { useDispatch, useSelector } from "react-redux"
import { useAlert } from "react-alert"
import { clearErrors, createProduct } from "../../actions/productAction"
import { NEW_PRODUCT_RESET } from "../../constants/productConstants"
import { Button } from "@mui/material"
import MetaData from "../Layout/MetaData"
import Loader from "../Layout/Loader/loader"
import Sidebar from "./SideBar"
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";



const CreateProduct = (
    {history}
) => {

    const dispatch = useDispatch()
    const alert = useAlert()
    const { loading, error, success } = useSelector(state => state.newProduct)
    console.log(success)

    const categories = [
        "Electronics",
        "sports",
        "clothes",
        "SmartPhones",
    ];

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [Stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);


    const createProductHandler = (e)=>{
   e.preventDefault()

   const myform = new FormData()

  myform.set("name",name);
  myform.set("price",price);
  myform.set("description",description)
  myform.set("category",category);
  myform.set("Stock",Stock)

  images.forEach((image)=>{
      myform.append("images",image)
  })
   
  dispatch(createProduct(myform))

    }

    const createProductImagesChange = (e) => {
        const files = Array.from(e.target.files);
    
        setImages([]);
        setImagesPreview([]);
    
        files.forEach((file) => {
          const reader = new FileReader();
    
          reader.onload = () => {
            if (reader.readyState === 2) {
              setImagesPreview((old) => [...old, reader.result]);
              setImages((old) => [...old, reader.result]);
            }
          };
    
          reader.readAsDataURL(file);
        });
      };

    useEffect(()=>{
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
  
        if(success){
            alert.success("Product created successfully")
            history.push('/admin/dashboard')
            dispatch(
                {type:NEW_PRODUCT_RESET}
            )
        }
    },[alert,error,dispatch,history,success])
  

    return (
        <Fragment>
            <MetaData title="create-product" />
            {loading ? <Loader /> : (
                <div className="dashboard">
                    <Sidebar />
                    <div className="newProductContainer">
                        <form className="createProductForm"
                            encType="multipart/form-data"
                            onSubmit={createProductHandler}
                        >
                            <h1>Create Product</h1>
                            <div>
                                <SpellcheckIcon />
                                <input
                                    type="text"
                                    placeholder="Product Name"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div>
                                <AttachMoneyIcon />
                                <input
                                    type="number"
                                    placeholder="Price"
                                    required
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>

                            <div>
                                <DescriptionIcon />

                                <textarea
                                    placeholder="Product Description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    cols="30"
                                    rows="1"
                                ></textarea>
                            </div>
                            <div>
                                <AccountTreeIcon />
                                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                                    <option value="">Choose Category</option>
                                    {categories.map((cate) => (
                                        <option key={cate} value={cate}>
                                            {cate}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <StorageIcon />
                                <input
                                    type="number"
                                    placeholder="Stock"
                                    required
                                    onChange={(e) => setStock(e.target.value)}
                                />
                            </div>
                            <div id="createProductFormFile">
                                <input
                                    type="file"
                                    name="avatar"
                                    accept="image/*"
                                    onChange={createProductImagesChange}
                                    multiple
                                />
                            </div>

                            <div id="createProductFormImage">
                                {imagesPreview.map((image, index) => (
                                    <img key={index} src={image} alt="Product Preview" />
                                ))}
                            </div>

                            <Button
                                id="createProductBtn"
                                type="submit"
                                disabled={loading ? true : false}
                            >
                                Create
                            </Button>


                        </form>

                    </div>

                </div>
            )}

        </Fragment>
    )
}

export default CreateProduct