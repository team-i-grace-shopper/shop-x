const router = require('express').Router()
const Order = require('../db/models')

router.put('/:id', async (req, res, next) => {
  try {
    const currentOrder = await Order.findById(req.params.id)
    await Order.update(req.body)
    res.json(currentOrder)
  } catch (error) {
    console.log(error)
  }
})
module.exports = router
