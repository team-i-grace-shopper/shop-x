import React, {Component} from 'react'
import {CartItem} from './CartItem'
import {Link} from 'react-router-dom'

// let items = null
// if (localStorage.getItem('cart')) {
//   items = JSON.parse(localStorage.getItem('cart'))
// }
let totalItems, totalDue

export class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {products: [], cartTotal: 0}
  }

  componentDidMount() {
    const getCartItems = JSON.parse(localStorage.getItem('cart'))
    let sum = 0

    for (let i = 0; i < getCartItems.length; i++) {
      sum += getCartItems[i].price * getCartItems[i].quantity
    }

    this.setState({products: getCartItems, cartTotal: sum})
  }

  emptyCart() {
    localStorage.removeItem('cart')
    this.setState({products: null})
  }

  render() {
    if (!localStorage.getItem('cart')) {
      return (
        <div>
          <h1>There are no items in cart</h1>
        </div>
      )
    }
    return (
      <div className="cart">
        <div className="cartAll">
          {this.state.products.map((exp, index) => {
            return (
              <div key={exp.id}>
                <CartItem
                  product={exp}
                  key={index}
                  remove={() => this.remove(item.id)}
                />
              </div>
            )
          })}
          <div className="empty-cart">
            <button
              className="empty-btn"
              type="button"
              onClick={this.emptyCart}
            >
              Empty Cart
            </button>
          </div>
        </div>

        <div className="cartTotal">
          <h2>Your Cart Total: ${this.state.cartTotal}</h2>
          <div className="checkout-btn">
            <Link to="/cart/checkout">
              <button className="checkout" type="button">
                Checkout
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}
