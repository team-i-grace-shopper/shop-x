import {addProductFromLocalStore} from '../store/cart'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {CartItem} from './CartItem'
import {Link} from 'react-router-dom'

// This component needs too, store state in our this.state
// It's going to be an array, this.props.shoppingCart
// added items is array
// render a smaller component (like cartItem)
// to pass info down 1 level
// let getItems = JSON.parse(localStorage.getItem("cart"));
export class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {products: [], cartTotal: 0}
  }

  componentDidMount() {
    const getCartItems = JSON.parse(localStorage.getItem('cart'))
    let sum = 0

    for (let i = 0; i < getCartItems.length; i++) {
      sum += getCartItems[i].price
    }

    this.setState({products: getCartItems, cartTotal: sum})
  }

  render() {
    // const { products, total } =  this.state;

    // {const getItems = JSON.parse(localStorage.getItem("cart"))}
    // if (!getItems) {
    //     return (
    //         <div>
    //             <h1>There are no items in cart</h1>
    //         </div>
    //     )
    // }
    if (!localStorage.getItem('cart')) {
      return (
        <div>
          <h1>There are no items in cart</h1>
        </div>
      )
    }
    return (
      <div className="cart-item">
        {JSON.parse(localStorage.getItem('cart')).map(exp => {
          return (
            <div key={exp.id}>
              <CartItem product={exp} />
            </div>
          )
        })}
        <div className="empty-cart">
          <button className="empty-btn" type="button">
            Empty Cart
          </button>
        </div>
        <div className="cartTotal">
          <p>Your Cart Total: ${this.state.cartTotal}</p>
        </div>
        <div className="checkout-btn">
          <Link to="/cart/checkout">
            <button className="checkout" type="button">
              Checkout
            </button>
          </Link>
        </div>
      </div>
    )
  }
}

// const mapStateToProps = (state) => {
//     return {shoppingCart: state.addedItems}
// }

// const mapDispatchToProps = (dispatch) => {
//     return {getItem: () => dispatch(addProductFromLocalStore())}
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Cart)
// export default Cart
