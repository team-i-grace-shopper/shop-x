const router = require('express').Router()
const {Product} = require('../db/models')
const {verifyAdmin} = require('../auth/helpers')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId)
    if (!product) {
      res.status(404).send('not found')
    } else {
      res.status(200).json(product)
    }
  } catch (err) {
    next(err)
  }
})

// verifyAdmin middleware
router.use(verifyAdmin) // checks if user is has admin accountType
// protects all routes below

router.post('/', async (req, res, next) => {
  try {
    const createdProduct = await Product.create(req.body)
    res.status(200).json(createdProduct)
  } catch (error) {
    next(error)
  }
})

router.put('/:productId', async (req, res, next) => {
  try {
    const [numUpdatedRows, editedProduct] = await Product.update(req.body, {
      where: {id: req.params.productId},
      returning: true, // returns the affected row (in addition to number of affected rows)
      plain: true // returns just the instance object without meta data
    })
    res.status(200).json(editedProduct)
  } catch (error) {
    next(error)
  }
})

router.delete('/:productId', async (req, res, next) => {
  const productId = Number(req.params.productId)

  try {
    await Product.destroy({
      where: {id: req.params.productId}
    })
    res.status(200).json(productId)
  } catch (error) {
    next(error)
  }
})
