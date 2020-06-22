import React from 'react'
import CartItem from './CartItem'
let items = JSON.parse(localStorage.getItem('cart'))

export default function Cart(props) {
  if (!items) {
    return <h1>There are no items in the cart</h1>
  }

  return items.map(item => {
    return <CartItem item={item} />
  })
}
