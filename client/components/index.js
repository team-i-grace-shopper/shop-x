/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as AllProducts} from './allProducts'
export {default as SingleProduct} from './SingleProduct'
export {default as UserHome} from './user-home'
export {default as CheckoutForm} from './checkout_form'
export {Cart} from './Cart'
export {Login, Signup} from './auth-form'
export {default as AllUsers} from './AllUsers'
