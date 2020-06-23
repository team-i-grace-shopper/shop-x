import React, {Component} from 'react'

export class CartItem extends Component {
  constructor(props) {
    super(props)
    this.state = {quantity: 1}
  }
  render() {
    // const { product } = this.props;
    console.log(this.props.product)
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
                  <button>Remove From Cart</button>
                </td>
              </tr>
            </tbody>
          </table> */}
        <div>
          <table style={{float: 'left'}}>
            <tr>
              <td>
                <table>
                  <td />
                </table>
              </td>
            </tr>
          </table>
          <table style={{float: 'left'}}>
            <tr>
              <td>..</td>
            </tr>
          </table>
        </div>

        <div className="quantity">
          <button className="minus-btn" type="button" name="button">
            -
          </button>
          <input type="text" value="1" />
          <button className="plus-btn" type="button" name="button">
            +
          </button>
        </div>
      </div>
    )
  }
}

// const MapStateToProps = (state) => ({

// })

// const MapDispatchToProps = (dispatch) =>{}
