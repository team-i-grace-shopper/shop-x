const Sequelize = require('sequelize')
const db = require('../db')

// serves as Orders to Products join table
const OrderDetail = db.define(
  'orderDetail',
  {
    productQty: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {min: 1}
    }
  },
  {timestamps: false}
)

module.exports = OrderDetail
