import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {fetchSingleProductThunk} from '../store/singleProduct'

class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 1
    }
    this.addToCart = this.addToCart.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.fetchSingleProducts(this.props.id)
  }

  handleChange(event) {
    this.setState({
      quantity: event.target.value
    })
  }

  addToCart() {
    const productToAdd = {
      id: this.props.singleProduct.id,
      name: this.props.singleProduct.name,
      price: this.props.singleProduct.price,
      imageUrl: this.props.singleProduct.imageUrl,
      quantity: this.state.quantity
    }

    if (!localStorage.getItem('cart')) {
      localStorage.setItem('cart', JSON.stringify([productToAdd]))
    } else {
      const newCart = JSON.parse(localStorage.getItem('cart'))
      const product = newCart.filter(item => item.id !== this.props.id)[0]
      product.quantity = Number(product.quantity) + Number(this.state.quantity)
      localStorage.setItem('cart', JSON.stringify(newCart))
    }
    this.setState({
      qty: 1
    })
  }

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
          <input type="number" defaultValue="1" onChange={this.handleChange} />
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
