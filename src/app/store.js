import {createStore} from 'redux';
import { reducer } from './../reducer/index'

const initialState = {
  cart: [],
  products: []
}

export default createStore(reducer, initialState);