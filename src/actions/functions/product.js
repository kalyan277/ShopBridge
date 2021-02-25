import axios from 'axios';

export const createProduct =async(product)=>{
    return await axios.post(`http://127.0.0.1:8000/api/product/`,
        product
   );
};

export const removeProduct =async(id)=>{
    return await axios.delete(`http://127.0.0.1:8000/api/product/${id}/`,
   );
};

export const getProduct =async(id)=>{
    return await axios.get(`http://127.0.0.1:8000/api/product/${id}/`);
};


export const updateProduct =async(id,product)=>{
    return await axios.put(`http://127.0.0.1:8000/api/product/${id}/`,
        product,
   );
};


export const getProducts =async()=>{
    return await axios.get(`http://127.0.0.1:8000/api/product/`
   );
};


