import {createStore} from 'redux';
import { reducer } from './../reducer/index'

const initialState = {
  cart: [],
  products: [],
  user:{
    firstName:'bg',
    email:'',
    phone:'',
    creditCard:''
  }
}


export default createStore(reducer, initialState);