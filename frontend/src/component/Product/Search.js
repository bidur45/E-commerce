import React,{useState} from 'react'
import SearchIcon from '@mui/icons-material/Search';
import './Search.css'
import { useHistory } from 'react-router-dom';


const Search = ()=>{
    const history = useHistory()
      const [Keyword, setKeyword] = useState("")


const searchSubmitHandler = (e)=>{
    e.preventDefault();
    if(Keyword.trim()){
        history.push(`/products/${Keyword}`);
    } else {
        history.push("/products")
    }
}

    return(
        <form className='SearchBox' onSubmit={searchSubmitHandler} >
        <input className='input'
        type="text"
        placeholder="Search a Product" 
        onChange={(e)=> setKeyword(e.target.value)}
        />
        <button  className="submit" type="submit" value="Search" >
            <div>
            <SearchIcon className='searchIcon'/>
            </div> 
        </button>
        </form>
    )
}

export default Search