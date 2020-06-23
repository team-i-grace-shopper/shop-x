import React from 'react'
import CartItem from './CartItem'
import {Link} from 'react-router-dom'

let items = null
if (localStorage.getItem('cart')) {
  items = JSON.parse(localStorage.getItem('cart'))
}
console.log(localStorage.getItem('cart'))
let totalItems, totalDue

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items
    }

    this.remove = this.remove.bind(this)
    this.emptyCart = this.emptyCart.bind(this)
  }

  // componentDidMount() {
  //   totalItems = items.reduce(function (accum, currV) {
  //     return accum + currV.quantity
  //   }, 0)
  // }

  remove(id) {
    const cart = JSON.parse(localStorage.getItem('cart'))
    const newCart = cart.filter(product => product.id !== id)
    localStorage.setItem('cart', JSON.stringify(newCart))
    if (!newCart.length) {
      this.setState({items: null})
    } else {
      this.setState({items: newCart})
    }
  }

  emptyCart() {
    localStorage.removeItem('cart')
    this.setState({items: null})
  }

  render() {
    console.log('ITEMS IN RENDER', this.state.items)
    if (!this.state.items) {
      return <h1>There are no items in the cart</h1>
    }

    totalItems = this.state.items.reduce(function(accum, currV) {
      return accum + currV.quantity
    }, 0)

    totalDue = this.state.items.reduce(function(accum, currV) {
      return accum + currV.price * currV.quantity
    }, 0)

    return (
      <div className="cart">
        <div className="cartAll">
          {this.state.items.map((item, index) => {
            return (
              <CartItem
                item={item}
                key={index}
                remove={() => this.remove(item.id)}
              />
            )
          })}
          <button type="button" onClick={this.emptyCart}>
            EMPTY CART
          </button>
        </div>
        <div>
          <h1>Totals:</h1>
          <h2>Total items in cart: {totalItems}</h2>
          <h2>Total due: {totalDue} $</h2>
          <Link to="/cart/checkout">
            <button type="button">CHECKOUT</button>
          </Link>
        </div>
      </div>
    )
  }
}

export default Cart
