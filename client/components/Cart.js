import React from 'react'
import CartItem from './CartItem'

let items = JSON.parse(localStorage.getItem('cart'))
let totalItems = items.reduce(function(accum, currV) {
  return accum + currV.quantity
}, 0)

export default class Cart extends React.component {
  constructor() {
    super(props)
  }

  render() {
    if (!items) {
      return <h1>There are no items in the cart</h1>
    }

    return (
      <div className="cart">
        <div className="cartAll">
          {items.map(item => {
            return <CartItem item={item} />
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
