const Sequelize = require('sequelize')
const db = require('../db')

// serves as Orders to Products join table
const OrderDetail = db.define(
  'order_detail',
  {
    productQty: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {min: 1}
    },
    price: {
      type: Sequelize.INTEGER
    }
  },
  {timestamps: false}
)

module.exports = OrderDetail
