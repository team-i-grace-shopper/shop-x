const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  orderTotal: {
    type: Sequelize.INTEGER,
    set(dollars) {
      this.setDataValue('orderTotal', dollars * 100)
    },
    get() {
      return this.getDataValue('orderTotal') / 100
    }
  },
  complete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = Order
