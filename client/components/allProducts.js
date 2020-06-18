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
    return (
      // <li>
      <div className="allProducts">
        {!this.props.products.length ? (
          <h2>There are no products registered in the database</h2>
        ) : (
          this.props.products[0] &&
          this.props.products.map(exp => {
            return <h1 key={exp.id}>{exp.name}</h1>
          })
        )}
      </div>
      // </li>
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
