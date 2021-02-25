import React,{useEffect,useState} from 'react'
import { getProducts ,removeProduct} from './actions/functions/product';
import {toast} from 'react-toastify';
import { Link } from 'react-router-dom';

const  ProductList= ({history}) =>{
     const [values, setValues] = useState()
   useEffect(() => {
       loadData()
    
    }, [])
    const loadData =async()=>{
           try {
            const response =await getProducts();
            if(response.error){
                setValues({values:response.error})
            }else{
                 setValues({values:response.data})                 
            }
        } catch (error) {
           //console.error(error); 
        }
    }

        const handleRemove = async(id)=>{
        if (window.confirm("Delete?")){
            removeProduct(id)
            .then(res=>{
                toast.error(`Deleted Successfully`)
                loadData()
            })
            .catch((err)=>{
                if(err.response.status === 400){
                    toast.error(err.response.data);
                }
            })
        }
      }
    
    
      const loadDataInTable = () => {
    return values.values.map((t, i) => (
       <tr key={i}>
      <th scope="col">{i+1}</th>
      <th scope="col">{t.name}</th>
       <th scope="col">{t.price}</th>
      <th scope="col">{t.description}</th>
      <th scope="col"><img src={t.image} className="img-rounded" style={{height:"70px",width:"70px"}}/></th>
      <th scope="col"> 
      <Link to={`/product/${t.id}`} >
       <button title="Edit Product " className="but btn-outline-warning mr-1 mt-1 mt-3">
         <i class="fa fa-edit" aria-hidden="true"></i> edit
       </button>
       </Link>
      
      
       {""}


       <button onClick={()=>handleRemove(t.id)} title="Delete Product " className="but btn-outline-danger mr-1 mt-1 mt-3">
         <i className="fa fa-trash" aria-hidden="true"></i> Remove
       </button>
         </th>
    </tr>
    ));
  };
   const loadDataForNoTable=()=>{
    return  (
       <tr key="1">
        <th colSpan="6" className="text-center">No Data Found</th>
    </tr>
    );
  };
   
    return (
        <div className="container mt-5">
            <table className="table">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Description</th>
                <th scope="col">Image</th>
                 <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
            {values && values.values.length !== undefined && loadDataInTable()}
            {values && values.values.length === 0 && loadDataForNoTable()}
            </tbody>
            </table>
        </div>
    );
}


export default ProductList;