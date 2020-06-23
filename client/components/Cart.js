import {addProductFromLocalStore} from '../store/cart'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {CartItem} from './CartItem'

// This component needs too, store state in our this.state
// It's going to be an array, this.props.shoppingCart
// added items is array
// render a smaller component (like cartItem)
// to pass info down 1 level
// let getItems = JSON.parse(localStorage.getItem("cart"));
export class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {products: [], total: 0}
  }
  // componentDidMount(){
  //     // this.props.getItem()
  //     // console.log(this.props)
  // }
  // totalItems(products, total){
  //     for(let i = 0; i <= products.length);
  // }

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
      return null
    }
    return (
      <div>
        {JSON.parse(localStorage.getItem('cart')).map(exp => {
          return (
            <div>
              <CartItem product={exp} />
            </div>
            // <table>
            //     <tr>
            //         <td>Total Items</td>
            //         <td>
            //             {}
            //         </td>
            //     </tr>
            // </table>
            // </div>
          )
        })}
        {/* <h1>hello</h1> */}
        {/* <CartItem /> */}
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
