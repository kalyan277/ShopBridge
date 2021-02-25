import React, { Component } from 'react'
import {Link} from 'react-router-dom';

import {ButtonContainer} from "./Button";
import {NavWrapper} from './NavWrapper';

export default class Navbar extends Component {
    render() {
        return (
          <NavWrapper className="navbar navbar-expand-sm navbar-dark px-sm-5">
            <ul className="navbar-nav align-items-center">
              <li className="nav-item ml-5">
                <Link to="/" className="nav-link">
                  Products
                </Link>
              </li>
            </ul>
            <Link to="/cart" className="ml-auto">
              <ButtonContainer>
                <span className="mr-2">
                  <i className="fas fa-cart-plus" />
                </span>
                My Cart
              </ButtonContainer>
            </Link>
          </NavWrapper>
        );
    }
}


