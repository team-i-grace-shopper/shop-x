// /* global describe beforeEach it */

// const {expect} = require('chai')
// const request = require('supertest')
// const db = require('../db')
// const app = require('../index')
// const User = db.model('user')

// describe('User routes', () => {
//   beforeEach(() => {
//     return db.sync({force: true})
//   })

//   describe('/api/users/', () => {
//     describe('GET /api/users ', () => {
//       let newCustomer
//       let newAdmin

//       const customerEmail = 'cody@puppybook.com'
//       const customerPassword = '321'

//       const adminEmail = 'admin@email.com'
//       const adminPassword = 'admin'

//       beforeEach(async () => {
//         newCustomer = await User.create({
//           email: customerEmail,
//           password: customerPassword
//         })

//         newAdmin = await User.create({
//           email: adminEmail,
//           password: adminPassword,
//           accountType: 'admin'
//         })
//       })

//       it('only admin can access all users', async () => {
//         const res = await request(app)
//           .post("/auth/login")
//           .send(newAdmin)
//           .get('/api/users')
//           .send({email: adminEmail, password: adminPassword})
//           .expect(200)
//         console.log(res.body)
//         // expect(res.body).to.be.an('array')
//         // expect(res.body[0].email).to.be.equal(codysEmail)
//       })
//     })
//   }) // end describe('/api/users')
// }) // end describe('User routes')
