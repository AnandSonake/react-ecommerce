import React,{Component} from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';

class Header extends Component {

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <div className="container">
                    <NavLink className="navbar-brand" to="/">Ecommerce</NavLink>
                    <div>
                        <li className="nav-item">
                            <NavLink className="nav-link nav-link-margin-bottom" to={"/cart"}><i className="fa fa-shopping-cart mr-2"
                                                                            aria-hidden="true" />Cart {this.props.cartLength ? `(${this.props.cartLength})`: ''}</NavLink>
                        </li>
                    </div>
                </div>
            </nav>
        );
    }
}

const mapStateToProps = state => {
    console.log('header.js mapStateToProps');

    var persistedState = localStorage.getItem('cartState') 
                       ? JSON.parse(localStorage.getItem('cartState'))
                       : null
    var cartData = (persistedState == undefined || persistedState == null) ? state.cart : persistedState; 

    return {
        cartLength: cartData.length
    }
  }

export default connect(mapStateToProps)(Header);
