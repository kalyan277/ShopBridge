import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {Switch,Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductList from './ProductList';
import Cart from './Cart';
import {ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import UpdateProduct from './UpdateProduct';


function App() {
  return (
    <React.Fragment>
      <Navbar />
       <ToastContainer/>
      <Switch>
        <Route path="/" exact component={ProductList}></Route>
        <Route path ="/cart" exact component ={Cart}></Route> 
         <Route path ="/product/:id" exact component ={UpdateProduct}></Route>   
      </Switch>
    </React.Fragment>
  );
}

export default App;