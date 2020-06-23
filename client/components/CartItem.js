import React, {Component} from 'react'

export class CartItem extends Component {
  constructor(props) {
    super(props)
    this.state = {quantity: 1}
  }
  render() {
    return (
      <div>
        {/* <table>
            <tbody>
              <tr>
                <td rowSpan="3">
                  <img src={this.props.product.imageUrl} />
                </td>
                <td>Name</td>
                <td></td>
                <td>Price</td>
              </tr>
              <tr>
                <td rowSpan="2">{this.props.product.name}</td>
                <td></td>
                <td>{this.props.product.price}</td>
              </tr>
              <tr>
                <td>
                  <button className="remove" type="remove-btn">Remove</button>
                </td>
              </tr>
            </tbody>
          </table> */}

        {/* <div className="collection-items">
          <div className="product-img">
          <img src={this.props.product.imageUrl} />
          </div>
          <div className="product-name">
            Name
          <div>
          {this.props.product.name}
          </div>
          </div>
        <div className="quantity">
          <button className="minus-btn" type="button">
            -
          </button>
          <input type="text" value="1" />
          <button className="plus-btn" type="button">
            +
          </button>
        </div>
      </div> */}
        <div className="collection-items">
          <div className="item-img">
            <img src={this.props.product.imageUrl} className="" />
          </div>
          <div className="item-desc">
            <span className="title">{this.props.product.name}</span>
            <p>
              <b>Price: {this.props.product.price}</b>
            </p>
            <p>
              <div className="quantity">
                <button className="minus-btn" type="button">
                  -
                </button>
                <input type="text" value="1" />
                <button className="plus-btn" type="button">
                  +
                </button>
              </div>
            </p>
            <button className="remove" type="button">
              Remove
            </button>
          </div>
        </div>
      </div>
    )
  }
}
