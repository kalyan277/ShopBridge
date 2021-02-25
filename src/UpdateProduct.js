import React,{useState,useEffect} from 'react'
import { getProduct,updateProduct } from './actions/functions/product';
import {toast} from 'react-toastify';
import { useHistory } from 'react-router-dom';
function UpdateProduct({match}) {
    const history = useHistory();
     const [product, setProduct] = useState({})
      const [image, setImage] = useState('')
     const {id} =match.params;
     useEffect(async() => {
         await getProduct(id).then((res)=> setProduct(res.data));
         
     }, [id])

const handleChange = (e, name) => {
   if(name === 'name'){
       let object = product;
       let name=e.target.value
       object = { ...object,name }
       setProduct(object);
      
   }
     if(name === 'description'){
         let object = product;
       let description=e.target.value
       object = { ...object,description }
       setProduct(object);
   }
     if(name === 'price'){
        let object = product;
       let price=e.target.value
       object = { ...object,price }
       setProduct(object);
   }
  };
console.log(image)
    
    const handleSubmit =async(e) => {
    e.preventDefault();
       var formData = new FormData();
       formData.append('name',product.name);
       formData.append('price',product.price);
       formData.append('description',product.description);
       
       if(image===""){
            toast.error("Please Select An Image Inorder to Update")
       }else{
            formData.append('image',image.image);
       }
         if(product.price===""){
           toast.error("Please Enter The Price");
           return
       }
         if(product.description===""){
           toast.error("Please Enter The Description");
           return
       }
        try {
            const response =await updateProduct(id,formData);
            console.log(response);
            if(response.error){
                toast.error("Please Try Again");
            }else{
                 history.push('/'); 
                 toast.success("Product Updated Sucessfully");
                 //history.push('/'); 
                 
            }
        } catch (error) {
           //console.error(error); 
        }
  
    }

  const profileUpdateForm = () => (
    <form onSubmit={(e)=>handleSubmit(e)}>
      
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          type="text"
          className="form-control"
          value={product.name}
          required
          onChange={e => handleChange(e, 'name')}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Price</label>
        <input
          type="text"
          className="form-control"
          value={product.price}
          required
          onChange={e => handleChange(e, 'price')}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Description</label>
        <textarea
          type="text"
          className="form-control"
          value={product.description}
          onChange={e => handleChange(e, 'description')}
        />
      </div>
          <div className="form-group">
                        <label className="btn btn-outline-info">
                        Product Image
                        <input
                            type="file"
                            accept="image/*"
                            onChange={e => setImage({image:e.target.files[0]})}
                            hidden
                        />
                        </label>
                    </div>  
  
                    <div>
                        <button type="submit"className="btn btn-primary">Update Product</button>
                    </div>
                    </form>
                );


                  return (
    <React.Fragment>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4">
            {product && (
              <img
                src={`${product.image}`}
                alt="Product Image"
                className="img img-thumbnail img-fluid mb-3"
                style={{ maxHeight: 'auto', maxWidth: '100%' }}
              />
            )}
          </div>
          <div className="col-md-8 mb-5">
            {profileUpdateForm()}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}



export default UpdateProduct;








