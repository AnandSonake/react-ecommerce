import React, { Component } from 'react';

class ProductList extends Component
{
    constructor(props){
        super(props);
        this.state = {
            isError: false,
            error: '',
            isLoaded: false,
            products : []
        }
    }

    componentDidMount() {
        fetch("https://fakestoreapi.com/products")
          .then(res => res.json())
          .then(
            (result) => {
              console.log(result);

              this.setState({
                isLoaded: true,
                isError : false,
                products: result,
                error: ''
              });
              
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              this.setState({
                isLoaded: true,
                error,
                isError : true
              });
            }
          )
      }

      render() {
        const { isError, error, isLoaded, products  } = this.state;
        if (isError) {
          return <div>Error: {error}</div>;
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else {
          return (
            <div>
                {products.length > 0 && 
                  products.map((item,index) => (
                    <div class="row"> 
                      <div class="column">
                        <h2>{item.title}</h2> <p>[ {item.category} ]  </p>
                        <img key={index} src={item.image} style={{height: "100px" , width: "100px" }}/>
                        <p>{item.description}</p>
                        <h2>{item.price} $</h2>
                      </div>
                    </div>
                  ))
                } 
           </div>
          );
        }
      }


}

export default ProductList