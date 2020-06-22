import React from 'react'

export default function CartItem(props) {
  let item = props.item
  return (
    <div className="cartItem">
      <div className="cartImage">
        <img src={item.imageUrl} />
      </div>
      <div className="cartDetails">
        <div className="cartDetailsBlock">
          <h1>{item.name}</h1>
        </div>
        <div>
          <h2>Price:{item.price}</h2>
          <button type="button">remove</button>
        </div>
      </div>
    </div>
  )
}
