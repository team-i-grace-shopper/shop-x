const router = require('express').Router()
// const {Product} = require('../db/models')
const {Order, OrderDetail, Product} = require('../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    console.log('I GOT TO API ROUTE', req.body)

    const userId = req.session.passport
      ? Number(req.session.passport.user)
      : null
    const order = await Order.create({userId})

    req.body.products.forEach(async product => {

      await OrderDetail.create({
        orderId: Number(order.id),
        productId: Number(product.id),
        productQty: Number(product.quantity),
        price: Number(product.price)
      })
    })

    console.log('product added')

    res.status(200).send('You order has been created')
  } catch (error) {
    console.log(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    await Order.update(
      {
        orderTotal: null,
        complete: true,
        userId: req.body.userId
      },
      {
        where: {
          id: Order.userId
        }
      }
    )
  } catch (error) {
    next(error)
  }
  const updatedOrder = await Order.findOne({
    where: {
      id: req.params.id
    }
  })
  res.json({
    message: 'update successful',
    product: updatedOrder
  })
})

router.get('/:id', async (req, res, next) => {
  try {
    let order = await Order.findByPk(req.params.id)
    console.log('order', order)
    res.json(order)
  } catch (error) {
    next(error)
  }
})
