import React from 'react'

class ProductList extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="list-ctn">
        <span className="img-ctn">
          <img src={this.props.image} alt="" />
        </span>
        <span className="product-details">
          <p>{this.props.name}</p>
          <p>{this.props.description}</p>
        </span>
      </div>
    )
  }
}

export default ProductList
