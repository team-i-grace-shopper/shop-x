import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts, deleteProduct} from '../store/allProducts'
import ProductList from './productList'
import {Link} from 'react-router-dom'

class AllProducts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      qty: 1
    }
    this.addToCart = this.addToCart.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.fetchProducts()
  }

  addToCart(event) {
    const productToAdd = {
      name: this.props.products[event.target.id - 1].name,
      price: this.props.products[event.target.id - 1].price,
      quantity: Number(this.state.qty),
      imageUrl: this.props.products[event.target.id - 1].imageUrl
    }

    if (!localStorage.getItem('cart')) {
      localStorage.setItem('cart', JSON.stringify([productToAdd]))
    } else {
      const newCart = JSON.parse(localStorage.getItem('cart'))
      newCart.push(productToAdd)
      localStorage.setItem('cart', JSON.stringify(newCart))
    }
    this.setState({
      qty: 1
    })
  }

  handleChange(event) {
    this.setState({
      qty: event.target.value
    })
  }
  render() {
    return (
      <div className="allProducts">
        {!this.props.products.length ? (
          <h2>There are no products registered in the database</h2>
        ) : (
          this.props.products === [] ||
          this.props.products.map(exp => {
            return (
              <div key={exp.id}>
                <Link to={`/shop/${exp.id}`}>
                  <ProductList products={exp} />
                </Link>

                <input
                  type="number"
                  defaultValue="1"
                  onChange={this.handleChange}
                />
                <button onClick={this.addToCart} id={exp.id} type="button">
                  Add To Cart
                </button>
              </div>
            )
          })
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {products: state.products}
}

const mapDispatchToProps = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts()),
  deleteProduct: id => dispatch(deleteProduct(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
