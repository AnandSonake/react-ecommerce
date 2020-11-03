import React from 'react';
import ProductList  from './productList/productList';
import ProductDetails from './productDetails/productDetails';
import Cart from './cart/cart';
import { Route, Switch, Redirect } from 'react-router-dom';

export const Routes = () => {
  return (
    <div>
     
      <Switch>
        <Route exact path="/products" component={ProductList} />
        <Route exact path="/">
          <Redirect to="/products" />
        </Route>
        <Route exact path="/productDetails" component={ProductDetails} />
        <Route exact path="/cart" component={Cart} />
      </Switch>
    </div>
  );
};