import { Fragment,useState,useEffect } from "react"
import {useAlert} from "react-alert"
import "./createProduct.css"
import {useDispatch,useSelector} from "react-redux"
import { Button } from "@mui/material"
import Loader from "../Layout/Loader/loader"
import MetaData from "../Layout/MetaData"
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material//Description";
import StorageIcon from "@mui/icons-material//Storage";
import SpellcheckIcon from "@mui/icons-material//Spellcheck";
import AttachMoneyIcon from "@mui/icons-material//AttachMoney";
import SideBar from "./SideBar";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants"
import {clearErrors, updateProduct,getProductDetails}  from "../../actions/productAction"





const UpdateProduct = ({history,match})=>{


    const alert = useAlert()
    const dispatch = useDispatch()
    const {error,loading,product} = useSelector(state=>state.productDetails)
    const {error:updatedError,success}= useSelector(state=>state.updateProduct)

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "electronics",
    "kitchen",
    "sports",
    "clothes",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

  const productId = match.params.id

const updateProductSubmitHandler = ()=>{
   const myform = new FormData()
     myform.set("name",name)
     myform.set("price",price)
     myform.set("description",description)
     myform.set("category",category)
     myform.set("stock",Stock)

     images.forEach((image) => {
        myform.append("images", image);
      });
      dispatch(updateProduct(productId, myform));
}

const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

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
   if(product && product._id !== productId){
       dispatch(getProductDetails(productId))
   }else{
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price);
    setCategory(product.category);
    setStock(product.stock);
    setOldImages(product.images);
   }


     if(error){
         alert.error(error)
         dispatch(clearErrors())
     }
     if(updatedError){
         alert.error(updatedError)
         dispatch(clearErrors())
     }
     if(success){
         alert.success("product updated successfully")
         history.push("/admin/dashboard")
         dispatch({type:UPDATE_PRODUCT_RESET})
     }
   


  },[error,alert,updatedError,success,dispatch,history,product,productId])






    return(
        <Fragment>
            <MetaData title="update-product"/>
            {loading ? <Loader/>:(
       <div className="dashboard">
       <SideBar />
       <div className="newProductContainer">
         <form
           className="createProductForm"
           encType="multipart/form-data"
           onSubmit={updateProductSubmitHandler}
         >
           <h1>Update Product</h1>

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
               value={price}
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
             <select
               value={category}
               onChange={(e) => setCategory(e.target.value)}
             >
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
               value={Stock}
             />
           </div>

           <div id="createProductFormFile">
             <input
               type="file"
               name="avatar"
               accept="image/*"
               onChange={updateProductImagesChange}
               multiple
             />
           </div>

           <div id="createProductFormImage">
             {oldImages &&
               oldImages.map((image, index) => (
                 <img key={index} src={image.url} alt="Old Product Preview" />
               ))}
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
             Update
           </Button>
         </form>
       </div>
     </div>
            )}
        
        </Fragment>
    )
}

export default UpdateProduct