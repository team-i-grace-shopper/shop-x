import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts, deleteProduct} from '../store/allProducts'
import ProductList from './productList'
import {Link} from 'react-router-dom'

class AllProducts extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchProducts()
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
                <button type="button">Add To Cart</button>
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
