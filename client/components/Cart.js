import React from 'react'
import CartItem from './CartItem'

let items = JSON.parse(localStorage.getItem('cart'))
let totalItems

class Cart extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    totalItems = items.reduce(function(accum, currV) {
      return accum + currV.quantity
    }, 0)
  }

  render() {
    if (!items) {
      return <h1>There are no items in the cart</h1>
    }

    totalItems = items.reduce(function(accum, currV) {
      return accum + currV.quantity
    }, 0)

    return (
      <div className="cart">
        <div className="cartAll">
          {items.map((item, index) => {
            return <CartItem item={item} key={index} />
          })}
        </div>
        <div>
          <h1>Totals:</h1>
          <h2>Total items in cart: {totalItems}</h2>
        </div>
      </div>
    )
  }
}

export default Cart
