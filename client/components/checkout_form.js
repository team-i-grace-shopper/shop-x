import React from 'react'
import {connect} from 'react-redux'
import CheckoutConfirmation from './checkout_confirmation'
import {me} from '../store/user'
import {fetchOrderThunk, postSingleOrderThunk} from '../store/order'
import {Link} from 'react-router-dom'
import history from '../history'
import axios from 'axios'

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: this.props.email,
      address: '',
      city: '',
      state: '',
      zipCode: '',
      step: 1
    }
    this.getItemsFromCart = this.getItemsFromCart.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handlePreview = this.handlePreview.bind(this)
    this.handleConfirm = this.handleConfirm.bind(this)
    this.handleSelectionChange = this.handleSelectionChange.bind(this)
    this.setUser = this.setUser.bind(this)
  }

  states = [
    'Alabama',
    'Alaska',
    'American Samoa',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'District of Columbia',
    'Federated States of Micronesia',
    'Florida',
    'Georgia',
    'Guam',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Marshall Islands',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Northern Mariana Islands',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Palau',
    'Pennsylvania',
    'Puerto Rico',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virgin Island',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming'
  ]

  componentDidMount() {
    this.props.getUser().then(this.setUser())
    this.getItemsFromCart()
    // this.props.getOrder(this.props.id)
  }

  getItemsFromCart() {
    if (window.localStorage.getItem('cart')) {
      const cart = JSON.parse(localStorage.getItem('cart'))
      return cart.map(item => {
        return (
          <p key={item.name}>
            {item.name} : {item.quantity}
          </p>
        )
      })
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSelectionChange(event) {
    this.setState({
      state: event.target.value
    })
  }

  handlePreview() {
    this.setState({
      step: 2
    })
  }

  handleConfirm() {
    this.setState({
      step: 3
    })
    window.localStorage.clear()
  }

  async setUser() {
    await this.setState({
      email: this.props.email
    })
  }

  // eslint-disable-next-line complexity
  render() {
    if (this.state.step === 1) {
      return (
        <div className="checkout-ctn">
          <div className="form-ctn">
            <form>
              <label htmlFor="firstName">
                First Name:{' '}
                <input
                  required="required"
                  name="firstName"
                  type="text"
                  value={this.state.firstName}
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="lastName">
                Last Name:
                <input
                  required="required"
                  name="lastName"
                  type="text"
                  value={this.state.lastName}
                  onChange={this.handleChange}
                />
              </label>
              {this.props.email ? (
                <label htmlFor="email">
                  Email:{' '}
                  <input
                    required="required"
                    name="email"
                    type="email"
                    defaultValue={this.props.email}
                    onChange={this.handleChange}
                  />
                </label>
              ) : (
                <label htmlFor="email">
                  Email:{' '}
                  <input
                    required="required"
                    name="email"
                    type="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                </label>
              )}
              <label htmlFor="address">
                Street Address:{' '}
                <input
                  required="required"
                  name="address"
                  type="text"
                  value={this.state.address}
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="city">
                City:{' '}
                <input
                  required="required"
                  type="text"
                  name="city"
                  value={this.state.city}
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="state">
                State:{' '}
                <select
                  required="required"
                  onChange={this.handleSelectionChange}
                >
                  {this.states.map((state, i) => {
                    return (
                      <option name="state" key={i} value={state}>
                        {state}
                      </option>
                    )
                  })}
                </select>
              </label>
              <label htmlFor="zipCode">
                Zip Code:
                <input
                  required
                  type="text"
                  name="zipCode"
                  value={this.state.zipCode}
                  onChange={this.handleChange}
                />
              </label>
              Continue Shopping{' '}
              <button
                type="button"
                onClick={() => {
                  this.props.history.push('/cart')
                }}
              >
                Back To Cart
              </button>
              {!this.state.firstName ||
              !this.state.lastName ||
              !this.state.address ||
              !this.state.state ||
              (!this.state.zipCode && this.state.step === 1) ? (
                <button type="button" disabled>
                  Preview Order Details
                </button>
              ) : (
                <button href="#" onClick={this.handlePreview} type="button">
                  Preview Order Details
                </button>
              )}
            </form>
          </div>
        </div>
      )
    } else if (this.state.step === 2) {
      // if(!this.state.firstName || !this.state.lastName || !this.state.email || !this.state.address || !this.state.state || this.state.zipCode && this.state.step === 1){
      //   return (
      //     <h1>*Please fill in all Fields*</h1>

      //   )
      // }
      return (
        <CheckoutConfirmation
          orderDetails={this.state}
          handleConfirm={this.handleConfirm}
          getItemsFromCart={this.getItemsFromCart}
          email={this.props.email}
          postOrder={this.props.postOrder}
        />
      )
    } else if (this.state.step === 3) {
      return (
        <div>
          <h1>Thank you! Your order is complete</h1>
          <p>
            <button
              type="button"
              onClick={() => {
                this.props.history.push('/products')
              }}
            >
              Continue Shopping
            </button>
          </p>
        </div>
      )
    }
  }
}

const mapState = state => {
  return {
    id: state.user.id,
    email: state.user.email
  }
}

const mapDispatch = dispatch => {
  return {
    getUser: () => dispatch(me()),
    // getOrder: id => dispatch(fetchOrderThunk(id)),
    postOrder: () => dispatch(postSingleOrderThunk())
  }
}

export default connect(mapState, mapDispatch)(CheckoutForm)
