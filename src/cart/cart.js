import React, { Component } from 'react';
import { Link,Route  } from 'react-router-dom';


class Cart extends Component
{

    constructor(props){
        super(props);
        console.log("CART LOG");
    }

    render(){

        

        return (

            <div> 
                <Link to="/products">
                    <h1> Home </h1>
                </Link>
                
                CART
            </div>
        );
    }
}

export default Cart;