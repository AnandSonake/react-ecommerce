import React, { Component } from 'react';
import { Link,Route  } from 'react-router-dom';
import { removeFromCart } from './../reducer/actionCreators';
import {connect} from 'react-redux';


const styles = {
    'margin-top': '100px'
}

class Cart extends Component
{
    inputCheck = (e) => {
        let filter = e.target.getAttribute('filter')   
        e.target.value = e.target.value.replace(new RegExp(filter, 'g'), '')   
        this.setState({[e.target.name]: e.target.value})
        
      }

      submitCheck = () => {
   
        if(!this.state.firstName || !this.state.lastName){
          alert("A name field is empty.")
        } else if(this.state.phone.length < 10 || !this.state.phone){
          alert("Phone number is not long enough.")
        } else if (!this.state.email.match(/@./g)) {
          alert("Email is in the wrong format.")
        } else {
          this.setState({display: true})
        }
     }

     resetForm = () => {
        this.setState({
          display: !this.state.display,
          firstName: '', 
          lastName: '', 
          phone: 0, 
          email: ''     
        })    
      }

      displayData() {
        return (
          <div className="form">
            <p>{this.state.lastName}, {this.state.firstName}</p>
            <p>{this.state.phone} | {this.state.email}</p>
            <button onClick={this.resetForm}>Reset</button>
          </div>
        )
      }

      displayForm() {

      }


    render(){
        return (
          <React.Fragment>
            <div style={{marginTop: "100px"}} >
              <table>
                <tbody>
                  {this.props.cartProducts.map(product =>
                    <tr key={product.id}>
                      <td>{product.title}</td>
                      <td className="text-right">${product.price}</td>
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
                    <td colSpan="4" >
                      Total: ${
                      //this.props.cart.reduce((sum, product) => sum + product.price, 0)
                      }
                    </td>
                  </tr>
                </tfoot>
              </table>

            </div>
            <div className="form">
              <div className="header">
                <h1>Checkout !</h1>
                <p>Please provide your information below.</p>
              </div>
              <div className="inputcontainer">
                <input filter="[^a-zA-Z ]" name="firstName" placeholder="First Name" onChange={this.inputCheck} />
                <input placeholder="Email Address" onChange={(e) => {this.setState({email:e.target.value})}} />
                <input filter="[^0-9]" maxLength="10" name="phone" placeholder="Phone Number" onChange={this.inputCheck} />
                <input filter="[^0-9]" maxLength="10" name="creditcard" placeholder="1111-2222-3333-4444" onChange={this.inputCheck} />
                
                <button onClick={this.submitCheck}>Buy</button>
              </div>
            </div>
          </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
  console.log('cart.js mapStateToProps');
  return {
    cartProducts: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    removeFromCart(product){
      dispatch(removeFromCart(product));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);