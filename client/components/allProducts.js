import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts, deleteProduct} from '../store/allProducts'
import ProductList from './productList'
import {Link} from 'react-router-dom'

const fakeExp = [
  {
    name: 'NYC Landmark Tours',
    description: 'Take a tour of NYC landmarks',
    price: 125,
    imageUrl:
      'https://www.xperiencedays.com/images/Philadelphia-Introductory-Flight-Lessons-XD-1665-002_700x410.jpg',
    category: 'activity'
  },
  {
    name: 'PHILADELPHIA DISCOVERY FLIGHT LESSON',
    description: 'Exciting travel plans',
    price: 300,
    imageUrl:
      'https://www.xperiencedays.com/images/Philadelphia-Introductory-Flight-Lessons-XD-1665-002_700x410.jpg',
    category: 'activity'
  }
]
class AllProducts extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.fetchProducts()
  }
  render() {
    return (
      <Link>
        {fakeExp.map(exp => {
          return (
            <ProductList
              name={exp.name}
              description={exp.description}
              image={exp.imageUrl}
            />
          )
        })}
      </Link>
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
