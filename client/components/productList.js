import React from 'react'

class ProductList extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="list-ctn">
        <img src={this.props.products.imageUrl} />
        <h1>{this.props.products.name}</h1>
        <p>{this.props.products.description}</p>
        <p>{this.props.products.price}</p>
      </div>
    )
  }
}

export default ProductList
