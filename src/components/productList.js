import React, { Component } from 'react';
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

    incrementQuantity(item){
      console.log('incrementQuantity');
        item.quantity = item.quantity +1;
    }

    decrementQuantity(item)
    {
      console.log('decrementQuantity');
      item.quantity = item.quantity <= 0 ? 0: item.quantity -1;;

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
                            <div class="qty mt-5">
                            <span class="plus bg-dark" onClick={()=> this.incrementQuantity(item)} >+</span>
                            <span>{item.quantity } </span>
                            <span class="minus bg-dark" onClick={()=> this.decrementQuantity(item)}> -</span>
                            </div>

                            <button
                                onClick={() => {
                                    this.props.addToCart(item)
                                }}
                              className="btn btn-info" style={{marginTop: "20px"}}>Add to cart 
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
    products1: state.products,
    currentQuantity: state.currentQuantity
  }
}

const mapDispatchToProps = dispatch => {
  console.log('productDetails.js - mapDispatchToProps called');
    return {
      addToCart(product){
        product.totalPrice = product.quantity * product.price;
        dispatch(addToCart(product));
      }
    };
  }

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);