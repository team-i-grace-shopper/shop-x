const router = require('express').Router()
const {User} = require('../db/models')
// const {isLoggedIn} = require("../api/helpers")
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email'],
      where: req.user.isAdmin() ? {} : {id: req.user.id}
      // the ternary above checks if user is an admin (using isAdmin instance method)
      // returns an empty object so that all users are displayed for Admin
      // returns only current user's account info
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})
