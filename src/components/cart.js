import React, { Component } from 'react';
import {Redirect  } from 'react-router-dom';
import { removeFromCart, emptyCart,updateName } from './../reducer/actionCreators';
import {connect} from 'react-redux';

const styles = {
    'margin-top': '100px'
}

class Cart extends Component
{
  constructor(props)
  {
    super(props);
    this.state={
      display:false,
      firstName:'',
      phone:'',
      email:'',
      credit:'',
      redirect:false
    }
  }
  
      submitCheck = () => {
   
        if(!this.state.firstName){
          alert("A name field is empty.")
        } else if(this.state.phone.length < 10 || !this.state.phone){
          alert("Phone number is not long enough.")
        } else if (!this.state.email.match(/@./g)) {
          alert("Email is in the wrong format.")
        } else {
         alert("Order placed successfully !!");
         this.props.emptyCart();
         this.resetForm();
         this.setState({redirect:true});
        }
     }

     resetForm = () => {
        this.setState({
          display: !this.state.display,
          firstName: '', 
          phone: 0, 
          email: ''    ,
          credit:'' 
        })   
      }
      updateName(e){
        this.setState({firstName:e.target.value});
      }
      updateEmail(e){
        this.setState({email:e.target.value});
      }
      updatePhone(e){
        this.setState({phone:e.target.value});
      }
      updateCredit(e){
        this.setState({credit:e.target.value});
      }

    reducer(accumulator, currentValue){
      return accumulator + currentValue;
    }
    render(){
        return (
          <React.Fragment>
            {this.state.redirect && <Redirect to="/products" push={true} />}

            <div class="center" style={{marginTop: "100px"}} >
              <table>
                <thead>
                  <th>
                  Product Name
                  </th>
                  <th>
                    Quantity
                  </th>
                  <th>
                    Price
                  </th>
                  <th>
                    Remove
                  </th>
                </thead>
                <tbody>
                  {this.props.cartProducts.map(product =>
                    <tr key={product.id}>
                      <td>{product.title}</td>
                      <td style={{padding: "20px"}}>( {product.quantity} ) * {product.price}</td>
                      <td style={{padding: "20px"}} className="text-right">{ Number(product.totalPrice).toFixed(2) }</td>
                      <td className="text-right">
                      <button bsSize="xsmall" bsStyle="danger"
                       onClick={() => this.props.removeFromCart(product)}>
                         <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                          <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg>
                         </button></td>
                    </tr>
                  )}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="3" >
                      <b>
                      Total: ${
                      Number(this.props.cartProducts.reduce((sum, product) => sum + product.totalPrice, 0)).toFixed(2)
                      
                      }</b>
                    </td>

                    <td colSpan="4" >
                      <b>
                      <button
                                onClick={() => {
                                  this.props.emptyCart()
                                }}
                              className="btn btn-info" style={{marginTop: "20px"}}>Clear Cart 
                            </button>
                     </b>
                    </td>
                  </tr>
                </tfoot>
              </table>

            </div>
            <div className="form">
              <div className="header">
                <h1>Checkout !</h1>
              </div>
              <div className="inputcontainer">
                <input style={{margin:"10px"}} value={this.state.firstName} filter="[^a-zA-Z ]" name="firstName" placeholder="First Name" onChange={(e)=> this.updateName(e)}/>
                <input style={{margin:"10px"}} value={this.state.email} placeholder="Email Address"  onChange={(e)=> this.updateEmail(e)} />
                <input style={{margin:"10px"}} value={this.state.phone} filter="[^0-9]" maxLength="10" name="phone" placeholder="Phone Number"  onChange={(e)=> this.updatePhone(e)} />
                <input style={{margin:"10px"}} value={this.state.credit} filter="[^0-9]" maxLength="10" name="creditcard" placeholder="1111-2222-3333-4444"  onChange={(e)=> this.updateCredit(e)}/>
                
                <button onClick={this.submitCheck}>Buy</button>
              </div>
            </div>
          </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
  console.log('cart.js mapStateToProps');
  
  var persistedState = localStorage.getItem('cartState') 
                       ? JSON.parse(localStorage.getItem('cartState'))
                       : null
  var cartData = (persistedState == undefined || persistedState == null) ? state.cart : persistedState; 

  return {
    cartProducts: cartData ,
    user:state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    removeFromCart(product){
      dispatch(removeFromCart(product));
    },

    emptyCart(){
      dispatch(emptyCart());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);