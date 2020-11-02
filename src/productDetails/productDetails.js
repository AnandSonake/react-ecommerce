import React, { Component } from 'react';

class ProductDetails extends Component
{

    constructor(props){
        super(props);
        console.log("ProductDetails constrcutor");
    }

    render()
    {

        return (
                this.props.ProductDetails != null && "Got the details"
        );
    }

}


export default ProductDetails