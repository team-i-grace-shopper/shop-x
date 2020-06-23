const router = require('express').Router()
// const {Product} = require('../db/models')
const {Order, OrderDetail, Product} = require('../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    console.log('I GOT TO API ROUTE', req.body)

    const order = await Order.create()

    const product = await Product.findOne({
      where: {
        id: 2
      }
    })

    await OrderDetail.create({
      orderId: order.id,
      productId: product.id,
      productQty: req.body.products[0].quantity,
      price: req.body.products[0].product.price
    })

    // await order.addProduct(product, {through: OrderDetail})

    console.log('product added')

    // req.body.products.map((product) => {
    //   return order.addProduct(
    //     // product.product,
    //     {through: OrderDetail},
    //     // {productQty: Number(product.quantity)}
    //   )
    // })
    res.status(200).send('You order has been created')
  } catch (error) {
    console.log(error)
  }
})

// router.get('/', async (req, res, next) => {
//   try {
//     const products = await Product.findAll()
//     res.json(products)
//   } catch (err) {
//     next(err)
//   }
// })

// router.get('/:productId', async (req, res, next) => {
//   try {
//     const product = await Product.findByPk(req.params.productId)
//     if (!product) {
//       res.status(404).send('not found')
//     } else {
//       res.status(200).json(product)
//     }
//   } catch (err) {
//     next(err)
//   }
// })

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
    project: updatedOrder
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
