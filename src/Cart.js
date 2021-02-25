import React,{useState} from 'react'
import { createProduct } from './actions/functions/product';
import {Field,reduxForm} from 'redux-form';
import {toast} from 'react-toastify';
import { useHistory } from 'react-router-dom';


function Cart(props) {
      const history = useHistory();
    const [values, setValues] = useState({
        error:'',
        loading:false,
        message:"",
        showForm:true,
        image:""
    })

    
   const {error,loading,message,image}=values
   const onSubmit = async(formValues)=>{
       console.log(formValues.name)
       var formData = new FormData();
       formData.append('name',formValues.name);
       formData.append('price',formValues.price);
       formData.append('description',formValues.description);
       formData.append('image',image);
       if(image===""){
           toast.error("Please Upload A Image");
           return
       }
        setValues({loading:true,error:false})
        try {
            const response =await createProduct(formData);
            console.log(response);
            if(response.error){
             toast.error(response.error)
            }else{
                 props.reset()
                 setValues({loading:false})
                 toast.success("Product Created Sucessfully");
                 history.push('/'); 
                 
            }
        } catch (error) {
           //console.error(error); 
        }
  
    }
    const showLoading = ()=>(loading ? <div className="alert alert-info">Loading...</div>:'');
    const showError = ()=>(error ? <div className="alert alert-danger">{error}</div>:'');
    const showMessage = ()=>(message ? <div className="alert alert-info">{message}</div>:'');

    const productForm=()=>{
        return(
            <form onSubmit={props.handleSubmit(onSubmit)} >
                 <Field name ="name" component = {renderInput} label ="Enter Name" className="form-control" type="text"/>
                <Field name ="price" label="Enter Price" component = {renderInput} className="form-control" type="number"/>
                <Field name ="description" label="Enter Description" component = {renderInput} className="form-control" type="textarea"/>
                 <div className="form-group">
                        <label className="btn btn-outline-info">
                        Product Image
                        <input
                            type="file"
                            accept="image/*"
                            onChange={e => setValues({image:e.target.files[0]})}
                            hidden
                        />
                        </label>
                    </div>        
                <div className="text-center">
                    <button className="btn btn-primary">Add Product</button>
                </div>
            </form>
        )
    }
    return (
        
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-md-12 mb-5 mt-5">
            {showError()}
            {showLoading()}
            {showMessage()}
            {productForm()}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
 const validate = (formValue)=>{
        const errors={};
        if(!formValue.name){
            errors.name= 'Name Is Complusory'
        }
            if(!formValue.price){
            errors.price= 'Price Is Complusory'
        }
             if(!formValue.description){
            errors.description= 'Description Is Complusory'
        }
        return errors;
    }

    const renderInput=({input,label,className,meta,type})=>{
        return (
            <div className="field form-group">
                <label>{label}</label>
                <input{...input} className={className} type={type} autoComplete="off" />
            {meta.touched && meta.error &&(
            <div className="form-label">
                <div style={{color:"red"}}>{meta.error}</div>
            </div>
            )}
            </div>
        )    }

export default reduxForm({
    form:'productForm',
    validate
})(Cart);

