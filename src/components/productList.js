import React, { Component } from 'react';
import ProductDetails from './productDetails';
import { Link,Route  } from 'react-router-dom';
import {connect} from 'react-redux';
import { addToCart } from './../reducer/actionCreators';


class ProductList extends Component
{
    changeRoutePath(item){
        console.log('changeRoutePath');
        this.setState({showDetails: true, productDetailsData : item});
    }

    handleNavigateToproductList()
    {
      console.log('handleNavigateToproductList');
      this.setState({showDetails : false});
    }

      render() {
            return (
              <div className="wrapper">
                <ul>
                  {
                  this.props.products1.length > 0 && 
                  this.props.products1.map((item,index) => (
                      <li>
                        <div class="row" onClick={() => this.changeRoutePath(item)}> 
                          <div class="col-md-6">
                            <h2>{item.title}</h2> <p>[ {item.category} ]  </p>
                            <img key={index} src={item.image} style={{height: "100px" , width: "100px" }}/>
                            <p>{item.description}</p>
                            <h2>{item.price} $</h2>

                            <button
                          onClick={() => {
                              this.props.addToCart(item)
                          }}
                          className="btn btn-info">Add to cart
                        </button>
                          </div>
                          
                        </div>
                      </li>
                    ))                  
                  }                   
                  </ul>
            </div>
            );
      }


}


const mapStateToProps = state => {

  console.log('productlist.js - mapStateToProps called');

  return {
    products1: state.products
  }
}

const mapDispatchToProps = dispatch => {
  console.log('productDetails.js - mapDispatchToProps called');

    return {
      addToCart(product){
        dispatch(addToCart(product));
      }
    };
  }

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);