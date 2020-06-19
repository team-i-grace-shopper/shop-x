import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {fetchSingleProductThunk} from '../store/singleProduct'

class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 0
    }
    this.addToCart = this.addToCart.bind(this)
  }

  componentDidMount() {
    this.props.fetchSingleProducts(this.props.id)
  }

  addToCart() {
    const productToAdd = {
      name: this.props.singleProduct.name,
      price: this.props.singleProduct.price,
      quantity: this.state.quantity
    }

    if (!localStorage.getItem('cart')) {
      localStorage.setItem('cart', JSON.stringify([productToAdd]))
    } else {
      const newCart = JSON.parse(localStorage.getItem('cart'))
      newCart.push(productToAdd)
      localStorage.setItem('cart', JSON.stringify(newCart))
    }
  }

  // function handleChange(event) {
  //   const value = event.target.value.replace(/\+|-/ig, '');
  //   this.setState({quantity: value});
  // }

  render() {
    console.log(this.props.singleProduct)

    if (!this.props.singleProduct) {
      return null
    }

    return (
      <div className="singleProduct">
        <div className="productImage">
          <img src={this.props.singleProduct.imageUrl} />
        </div>
        <div className="productInfo">
          <div className="productInfoBlock">
            <h2>{this.props.singleProduct.name}</h2>
          </div>
          <div className="productInfoBlock">
            <p>{this.props.singleProduct.description}</p>
          </div>
        </div>
        <div>
          <button
            type="button"
            className="addToCartButton"
            onClick={() => {
              this.addToCart()
            }}
          >
            ADD TO CART
          </button>
        </div>
      </div>
    )
  }
}

const mapState = (state, props) => ({
  singleProduct: state.singleProduct,
  id: props.match.params.productId
})

const mapDispatchToProps = dispatch => ({
  fetchSingleProducts: id => dispatch(fetchSingleProductThunk(id))
})

export default connect(mapState, mapDispatchToProps)(SingleProduct)
