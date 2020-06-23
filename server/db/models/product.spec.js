const {expect} = require('chai')
const db = require('../index')
const Product = db.model('product')

describe('Product model', () => {
  //FIRST: clear the database and recreate the tables before beginning a run

  before(() => {
    return db.sync({force: true})
  })

  // SECOND: create an (un-saved!) product instance before every spec

  const productDescription =
    'Get into the pilot seat, learn the basics of aviation and take the controls of a single engine light aircraft during this half hour Introductory Flying Lesson. The adventure begins when you meet your Certified Flight Instructor at the Cross Keys Airport in Williamstown, New Jersey!'

  let product
  beforeEach(() => {
    product = Product.build({
      name: 'PHILADELPHIA DISCOVERY FLIGHT LESSON',
      description: productDescription,
      price: 125,
      imageUrl:
        'https://www.xperiencedays.com/images/Philadelphia-Introductory-Flight-Lessons-XD-1665-002_700x410.jpg',
      category: 'activity'
    })
  })

  // THIRD: erase all products after each spec

  afterEach(() => {
    return db.sync({force: true})
  })

  describe('attributes definition', () => {
    // Product model should have five fields (two of them required): `name` and `price`.

    it('includes `name`,`description`,`price`,`imageUrl` and `category` fields', async () => {
      const savedProduct = await product.save()
      expect(savedProduct.name).to.equal('PHILADELPHIA DISCOVERY FLIGHT LESSON')
      expect(savedProduct.description).to.equal(productDescription)
      expect(savedProduct.price).to.equal(125)
      expect(savedProduct.imageUrl).to.equal(
        'https://www.xperiencedays.com/images/Philadelphia-Introductory-Flight-Lessons-XD-1665-002_700x410.jpg'
      )
      expect(savedProduct.category).to.equal('activity')
    })

    it('requires `name`', async () => {
      product.name = null

      let result, error
      try {
        result = await product.validate()
      } catch (err) {
        error = err
      }

      if (result) throw Error('validation should fail when name is null')

      expect(error).to.be.an.instanceOf(Error)
    })

    it('requires `price`', async () => {
      product.price = null

      let result, error
      try {
        result = await product.validate()
      } catch (err) {
        error = err
      }

      if (result) throw Error('validation should fail when price is null')

      expect(error).to.be.an.instanceOf(Error)
    })

    it('sets and gets `price` correctly', () => {
      expect(product.dataValues.price).to.equal(12500)
      expect(product.price).to.equal(125)
    })

    it('can handle long `description`', async () => {
      let productContent =
        'Get into the pilot seat, learn the basics of aviation and take the controls of a single engine light aircraft during this half hour Introductory Flying Lesson. The adventure begins when you meet your Certified Flight Instructor at the Cross Keys Airport in Williamstown, New Jersey. Upon arrival, you’ll head out onto the tarmac where the Pilot will take you through the entire envelope of the aircraft during a fifteen minute ground briefing. Next, you will climb aboard the aircraft get strapped in and then sit back as the Pilot taxis the plane down the runway. Once in the air, you will take ahold of the controls and actually fly the plane! Picturesque views of the South Jersey skyline make this an unforgettable airborne adventure. At the end of the flight, you will receive a flight log book to keep. So whether you are looking to begin a new hobby or have simply always wondered what it was like to pilot a plane, this five-star rated Philadelphia Flight Lesson is the ticket - an unforgettable gift that you will continue to share and relish for years and years!'

      const result = await Product.create({
        name: 'Flight lesson',
        description: productContent,
        price: 125
      })

      expect(result).to.be.an('object')
      expect(result.name).to.equal('Flight lesson')
      expect(result.description).to.equal(productContent)
    })
  })
})
