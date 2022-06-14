import Appstore from '../../../images/Appstore.png'
import PlayStore from '../../../images/playstore.png'
import "./Footer.css"

const Footer =()=>{
    return(
       <footer id="footer">
           <div className="leftfooter">

            <h4>DOWNLOOD OUR APP</h4>
            <p>Downlood for both Andriod and IOS</p>
            <img src={PlayStore} alt="playstore"></img>
            <img src={Appstore} alt="playstore"></img>
           </div>
           <div className="midfooter">
            <h1>Sabaiko pasal</h1>
            <p>High quality service is our goal</p>
            <p>Copyrights 2022  Sabaikopasal. All Rights Reserved</p>
           </div>
           <div className="rightfooter">
            <h4>Follow Us</h4>
            <a>Instagram</a>
            <a>Facebook</a>
            <a>Youtube</a>
           </div> 

       </footer>
    )
}

export default Footer