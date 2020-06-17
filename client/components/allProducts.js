import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts, deleteProduct} from '../store/allProducts'

class AllProducts extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.fetchProducts()
  }
  render() {
    return <h1>PRODUCTS</h1>
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
