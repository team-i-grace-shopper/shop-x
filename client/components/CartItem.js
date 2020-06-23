import React from 'react'

class CartItem extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    console.log('I got into handle change')
    const newCart = JSON.parse(localStorage.getItem('cart'))
    const selectedItem = newCart.find(
      product => product.id === this.props.item.id
    )
    selectedItem.quantity = event.target.value
    localStorage.setItem('cart', JSON.stringify(newCart))
  }

  render() {
    let item = this.props.item
    console.log(item.quantity)
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
            <h2>Qunatity:</h2>
            <input
              type="number"
              defaultValue={item.quantity}
              min="0"
              onChange={this.handleChange}
            />
            <button type="button">remove</button>
          </div>
        </div>
      </div>
    )
  }
}

export default CartItem
