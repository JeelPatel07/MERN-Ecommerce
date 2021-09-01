import React , {useEffect,useState}from "react";
import "../styles.css"
import Base from "./Base"
import Card from "./Card";
import getProducts from "./helper/coreapicalls";
import ImageHelper from "./helper/Imagehelper";

export default function Home(){

    const [ products,setProducts] = useState([])
    const [ errpr , setError] = useState(false)
    const loadAllProducts = () => {
        getProducts().then(data=>{
            if(data.error){
                setError(data.error)
            }else{
                setProducts(data)
            }
        })
    } 
    useEffect(()=>{
        loadAllProducts();
    },[])
//   console.log("API IS ",process.env.REACT_APP_BACKEND)
    return (
        <Base title="Home Page" description="Welcome to T-shirt Store!"> 
            <div className="row text-center">
                <h1 className="text-white">All of T-shirts</h1>
                <div className="row">
                {products.map((product,index)=>{
                    return(
                        <div key={index} className="col-4 mb-4">
                            <Card/>

                        </div>
                    )
                })}


                </div>
            </div>
        </Base>
    )
}