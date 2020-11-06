import React,{Component} from 'react';
import './App.css';
import ProductList from './components/productList';
import { Route, Link } from 'react-router-dom';
import Header from './components/header';
import store from './app/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { Switch, Redirect } from 'react-router-dom';
//import { Routes } from './routes';
import ProductDetails from './components/productDetails';
import Cart from './components/cart';
import { loadProducts } from './reducer/actionCreators';

class App extends Component {

  constructor(props){
    super(props);
    store.dispatch(loadProducts());
  }

  render(){

  return (
      <React.StrictMode>
          <Provider store={store}>
            <Router>
              <React.Fragment >
                  <Header />
                  <Switch>
                    <Route exact path="/products" component={ProductList}  />
                    <Route exact path="/">
                      <Redirect to="/products" />
                    </Route>
                    <Route exact path="/products/:id" component={ProductDetails} />
                    <Route exact path="/cart" component={Cart} />
                  </Switch>
                </React.Fragment>
              </Router>
          </Provider>
        </React.StrictMode>
    );
  }
}

export default App;
