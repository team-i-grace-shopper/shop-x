const {expect} = require('chai')
const db = require('../index')
const Order = db.model('order')

describe('Order model', function() {
  // clear the database before all tests
  before(function() {
    return db.sync({force: true})
  })

  // erase all orders after each spec
  after(() => {
    return db.sync({force: true})
  })

  describe('orderTotal', async () => {
    // create order instances
    // before(async () => {
    //   await Promise.all([
    //     Order.create({orderTotal: 250, complete: true}),
    //     Order.create({orderTotal: 1500}),
    //     Order.create({orderTotal: 85.75}),
    //     Order.create({orderTotal: 325.99})
    //   ])
    // })

    // beforeEach(async function () {
    // const allOrders = await Order.findAll()

    // // pull each order instance from allOrders
    // const [order1, order2, order3, order4] = allOrders
    // })

    it('sets correctly', () => {
      const order1 = Order.build({orderTotal: 250, complete: true})
      const order2 = Order.build({orderTotal: 1500})
      const order3 = Order.build({orderTotal: 85.75})
      const order4 = Order.build({orderTotal: 325.99})

      expect(order1.dataValues.orderTotal).to.equal(25000)
      expect(order2.dataValues.orderTotal).to.equal(150000)
      expect(order3.dataValues.orderTotal).to.equal(8575)
      expect(order4.dataValues.orderTotal).to.equal(32599)
    })

    it('gets correctly', () => {
      const order1 = Order.build({orderTotal: 250, complete: true})
      const order2 = Order.build({orderTotal: 1500})
      const order3 = Order.build({orderTotal: 85.75})
      const order4 = Order.build({orderTotal: 325.99})

      expect(order1.orderTotal).to.equal(250)
      expect(order2.orderTotal).to.equal(1500)
      expect(order3.orderTotal).to.equal(85.75)
      expect(order4.orderTotal).to.equal(325.99)
    })
  })
})
