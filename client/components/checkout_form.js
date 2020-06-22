import React from 'react'
import {connect} from 'react-redux'
import CheckoutConfirmation from './checkout_confirmation'
import {me} from '../store/user'
import {Redirect} from 'react-router-dom'

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
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
    this.props.getUser()
    this.getItemsFromCart()
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
      [event.target.name]: event.target.value,
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
  }

  render() {
    if (this.state.step === 1) {
      return (
        <div className="checkout-ctn">
          <div className="form-ctn">
            <form>
              <label htmlFor="firstName">
                <input
                  name="firstName"
                  type="text"
                  value={this.state.firstName}
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="lastName">
                <input
                  name="lastName"
                  type="text"
                  value={this.state.lastName}
                  onChange={this.handleChange}
                />
              </label>
              {this.props.email ? (
                <label htmlFor="email">
                  <input
                    name="email"
                    type="email"
                    value={this.props.email}
                    onChange={this.handleChange}
                  />
                </label>
              ) : (
                <label htmlFor="email">
                  <input
                    name="email"
                    type="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                </label>
              )}
              <label htmlFor="address">
                <input
                  name="address"
                  type="text"
                  value={this.state.address}
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="city">
                <input
                  type="text"
                  name="city"
                  value={this.state.city}
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="state">
                <select onChange={this.handleChange} value={this.state.state}>
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
                <input
                  type="text"
                  name="zipCode"
                  value={this.state.zipCode}
                  onChange={this.handleChange}
                />
              </label>
              <button onClick={this.handlePreview} type="button">
                Preview Order Details
              </button>
            </form>
          </div>
        </div>
      )
    } else if (this.state.step === 2) {
      return (
        <CheckoutConfirmation
          orderDetails={this.state}
          handleConfirm={this.handleConfirm}
          getItemsFromCart={this.getItemsFromCart}
        />
      )
    } else if (this.state.step === 3) {
      return <h1>Thank you! Your order is complete</h1>
    }
  }
}

const mapState = state => {
  return {
    email: state.user.email
  }
}

const mapDispatch = dispatch => {
  return {
    getUser: () => dispatch(me())
  }
}

export default connect(mapState, mapDispatch)(CheckoutForm)
