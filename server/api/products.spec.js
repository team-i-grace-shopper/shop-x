/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

/**
 *
 * product Route Tests
 *
 * Do these after you finish the product Model tests
 *
 */
describe('Product routes', () => {
  before(() => {
    return db.sync({force: true})
  })

  afterEach(() => {
    return db.sync({force: true})
  })

  describe('GET /api/products', () => {
    /**
     * We'll run a GET request to /products
     */
    it('responds with an array via JSON', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect('Content-Type', /json/)
        .expect(200)

      // res.body is the JSON return object
      expect(res.body).to.be.an.instanceOf(Array)
      expect(res.body).to.have.length(0)
    })
    /**
     * Search for products by ID
     */
    describe('GET /api/products/:productId', () => {
      let product

      beforeEach(async () => {
        const creatingProducts = [
          {
            name: 'PHILADELPHIA DISCOVERY FLIGHT LESSON',
            description:
              'Get into the pilot seat, learn the basics of aviation and take the controls of a single engine light aircraft during this half hour Introductory Flying Lesson. The adventure begins when you meet your Certified Flight Instructor at the Cross Keys Airport in Williamstown, New Jersey!',
            price: 125,
            imageUrl:
              'https://www.xperiencedays.com/images/Philadelphia-Introductory-Flight-Lessons-XD-1665-002_700x410.jpg',
            category: 'activity'
          },
          {
            name: 'FOOD TOUR',
            description:
              'Join us on an enticing tour of the oldest and largest everyday open-air market in the Country. During this two hour guided walking tour you will have the opportunity to explore the tantalizing shops and stalls of the 9th street Italian Market.',
            price: 35,
            imageUrl:
              'https://www.xperiencedays.com/images/Italian-Market-Tours-Philadelphia-XD-1768-006_700x410.jpg',
            category: 'food'
          },
          {
            name: 'MUSIC TOUR',
            description:
              'Explore the City that gave birth to the smoothest genre of music during a two and a half hour Jazz and Music Tour of New Orleans. Learn about the history of jazz before heading out to some of the best live music locations in town featuring the City’s best local musicians.',
            price: 59,
            imageUrl:
              'https://www.xperiencedays.com/images/New-Orleans-Jazz-Tours-XD-1768-011_700x410.jpg',
            category: 'music'
          }
        ].map(data => Product.create(data))

        const createdProducts = await Promise.all(creatingProducts)
        product = createdProducts[1]
      })

      /**
       * This is a proper GET /products/:productId request
       * where we search by the ID of the product created above
       */
      it('returns the JSON of the product based on the id', async () => {
        const res = await request(app)
          .get('/api/products/' + product.id)
          .expect(200)
        if (typeof res.body === 'string') {
          res.body = JSON.parse(res.body)
        }
        expect(res.body.name).to.equal('FOOD TOUR')
      })
      /**
       * Here we pass in a bad ID to the URL, we should get a 404 error
       */
      it('returns a 404 error if the ID is not correct', () => {
        return request(app)
          .get('/api/products/76142896')
          .expect(404)
      })
    })
  })
})
