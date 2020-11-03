import React from 'react';
import './App.css';
import ProductList from './productList/productList';
import { Route, Link } from 'react-router-dom';

function App() {

  return (
    <div className="container">
    <Link to="/products">
      <h1> Home </h1>
    </Link>
    <div>
        <Route path="/products" component={ProductList}/>
    </div>
  </div>
  );
}

export default App;
