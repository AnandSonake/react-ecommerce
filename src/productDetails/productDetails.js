import React, { Component } from 'react';
import { Link,Route  } from 'react-router-dom';

class ProductDetails extends Component
{

    constructor(props){
        super(props);
        this.state={
            count:0,
            totalProductPrice:0,
            data: this.props.data,
            cart:0
        }
        console.log("ProductDetails constrcutor");
    }

    navigateToProductList(){
            this.props.navigateToproductList();
    }

    incrementCount(){
        this.setState({
          count: this.state.count + 1,
          totalProductPrice: (Number(this.state.totalProductPrice) + this.props.data.price).toFixed(2)
        });
      }
      
    DecrementCount(){
        var value= (this.state.count - 1) <=0 ? 0: (this.state.count - 1);
        var totalProductPrice= (Number(this.state.totalProductPrice).toFixed(2) - this.props.data.price) <= 0 ? 0:
        (Number(this.state.totalProductPrice).toFixed(2) - this.props.data.price).toFixed(2);
          this.setState({
              count: value,
              totalProductPrice: totalProductPrice
          });
    }


    render()
    {

        return (
            <div clas="wrapper">
                <div clas="row" >
                    <div class="col col-md-offset-2 col-md-2">
                        <Link to="/cart">
                            <label >Cart </label>
                        </Link>
                        <label> { this.state.cart }</label>
                    </div>
                </div>
                <Link to="/products">
                     <h1 onClick={()=> this.navigateToProductList()}> Home </h1>
                </Link>

               <li>
                {this.state.data !=null && 
                <div class="row" > 
                <div class="column">
                    <h5>{this.state.data.title}</h5> <p>[ {this.state.data.category} ]  </p>
                    <img key={this.state.data.id} src={this.state.data.image} style={{height: "100px" , width: "100px" }}/>
                    <p>{this.state.data.description}</p>
                    <h2>{this.state.data.price} $</h2>
                </div>
                </div>
                }
                </li>

                
                    <div >
                        <h1>Quantity : {this.state.count}</h1>
                        <h1>Price : { Number(this.state.totalProductPrice).toFixed(2)}</h1>
                        <button class="hand" type="button" onClick={()=> this.incrementCount()}>Add</button>
                        <button class="hand" type="button" onClick={()=> this.DecrementCount()}>Remove</button>
                    </div>
                    <button clas="hand"> Add to Cart</button>
               
            </div>

            //this.props.ProductDetails != null && "Got the details"
        );
    }

}


export default ProductDetails