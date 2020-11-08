const reducer = (state, action) => {
    switch(action.type){
      case 'LOAD_PRODUCTS':
        console.log('reducer index.js - LOAD_PRODUCTS called');
        return {
          ...state,
          products: action.products,
          cart: action.cart
        }
      case 'ADD_TO_CART':
        console.log('reducer index.js - ADD_TO_CART called');
        var persistedState = localStorage.getItem('cartState') 
        ? JSON.parse(localStorage.getItem('cartState'))
        : [];
        
          localStorage.setItem('cartState',JSON.stringify( persistedState.concat(action.product) ));

        return {
          ...state,
          cart: state.cart.concat(action.product),
          products: state.products.filter(p => p!==action.product)
        };
      case 'REMOVE_FROM_CART':
        console.log('reducer index.js - REMOVE_FROM_CART called');

        localStorage.removeItem('cartState');
        
        var updatedCart = state.cart.filter(product => product.id !== action.product.id);
        localStorage.setItem('cartState',JSON.stringify(updatedCart));

        return {
          ...state,
          cart: updatedCart,
          products: state.products.concat(action.product)
        }
        case 'EMPTY_FROM_CART':
          console.log('reducer index.js - REMOVE_FROM_CART called');
          
          localStorage.removeItem('cartState');
          return {
            ...state,
            cart: [],
            products: state.products
          }
      default:
        return state
    }
    return state;
  }
  
  export { reducer };