const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {min: 1},
    set(dollars) {
      this.setDataValue('price', dollars * 100)
    },
    get() {
      return this.getDataValue('price') / 100
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://image.freepik.com/free-vector/useful-gold-label-black-background_1035-4814.jpg',
    validate: {isUrl: true}
  },
  category: {
    type: Sequelize.STRING
  }
})

module.exports = Product
