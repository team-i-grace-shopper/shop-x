import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {fetchSingleProductThunk} from '../store/singleProduct'

// const selectedProduct = {
//   name: 'BOSTON NORTHERN LIGHTS JAZZ CRUISE',
//   description:
//     'Take a trip back in time and climb aboard a 1920s styled New England Yacht for a 90 minute Boston Harbor Cruise. Enjoy the relaxing sounds of jazz as you take in beautiful views of the City Skyline at night.',
//   price: 54,
//   imageUrl:
//     'https://www.xperiencedays.com/images/Boston-Jazz-Cruises-XD-124-041_700x410.jpg',
//   category: 'activity',
// }

class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      product: this.props.singleProduct,
      price: this.props.singleProduct.price,
      quantity: 0
    }
  }

  componentDidMount() {
    this.props.fetchSingleProducts(this.props.id)
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
            // onClick={
            //   props.addToCart()
            // }
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
