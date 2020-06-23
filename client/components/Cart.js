import React from 'react'
import CartItem from './CartItem'

let items = null
if (localStorage.getItem('cart')) {
  items = JSON.parse(localStorage.getItem('cart'))
}
console.log(localStorage.getItem('cart'))
let totalItems, totalDue

class Cart extends React.Component {
  constructor(props) {
    super(props)
  }

  // componentDidMount() {
  //   totalItems = items.reduce(function (accum, currV) {
  //     return accum + currV.quantity
  //   }, 0)
  // }

  render() {
    // console.log(items)
    if (!items) {
      return <h1>There are no items in the cart</h1>
    }

    totalItems = items.reduce(function(accum, currV) {
      return accum + currV.quantity
    }, 0)

    totalDue = items.reduce(function(accum, currV) {
      return accum + currV.price * currV.quantity
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
          <h2>Total due: {totalDue} $</h2>
        </div>
      </div>
    )
  }
}

export default Cart
