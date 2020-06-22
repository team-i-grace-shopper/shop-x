/* eslint-disable no-undef */
const User = require('./user')
const Product = require('./product')
const Order = require('./order')
const OrderDetail = require('./orderDetail')

// Users and Orders = one to many
User.hasMany(Order)
Order.belongsTo(User)

// Orders and Products = many to many
Order.belongsToMany(Product, {through: OrderDetail})
Product.belongsToMany(Order, {through: OrderDetail})

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Product,
  Order,
  OrderDetail
}
