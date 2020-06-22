import React from 'react'

const CheckoutConfirmation = props => {
  console.log('props', props)
  return (
    <div>
      <ul>
        <div>
          Name:{' '}
          <span>
            {props.orderDetails.firstName + ' ' + props.orderDetails.lastName}
          </span>
        </div>

        <div>
          Email: <span>{props.orderDetails.email}</span>
        </div>

        <div>
          Address:
          <p>{props.orderDetails.address}</p>
          <p>{props.orderDetails.city}</p>
          <p>{props.orderDetails.state}</p>
          <p>{props.orderDetails.zipCode}</p>
        </div>
      </ul>
      {props.getItemsFromCart()}
      <button onClick={props.handleConfirm} type="button">
        Confirm
      </button>
    </div>
  )
}

export default CheckoutConfirmation
