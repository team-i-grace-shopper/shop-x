'use strict'

const db = require('../server/db')
const {User, Product} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      email: 'cody@email.com',
      password: '123',
      accountType: 'admin'
    }),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  const products = await Promise.all([
    Product.create({
      name: 'PHILADELPHIA DISCOVERY FLIGHT LESSON',
      description:
        'Get into the pilot seat, learn the basics of aviation and take the controls of a single engine light aircraft during this half hour Introductory Flying Lesson. The adventure begins when you meet your Certified Flight Instructor at the Cross Keys Airport in Williamstown, New Jersey!',
      price: 125,
      imageUrl:
        'https://www.xperiencedays.com/images/Philadelphia-Introductory-Flight-Lessons-XD-1665-002_700x410.jpg',
      category: 'activity'
    }),
    Product.create({
      name: 'FOOD TOUR',
      description:
        'Join us on an enticing tour of the oldest and largest everyday open-air market in the Country. During this two hour guided walking tour you will have the opportunity to explore the tantalizing shops and stalls of the 9th street Italian Market.',
      price: 35,
      imageUrl:
        'https://www.xperiencedays.com/images/Italian-Market-Tours-Philadelphia-XD-1768-006_700x410.jpg',
      category: 'food'
    }),
    Product.create({
      name: 'MUSIC TOUR',
      description:
        'Explore the City that gave birth to the smoothest genre of music during a two and a half hour Jazz and Music Tour of New Orleans. Learn about the history of jazz before heading out to some of the best live music locations in town featuring the City’s best local musicians.',
      price: 59,
      imageUrl:
        'https://www.xperiencedays.com/images/New-Orleans-Jazz-Tours-XD-1768-011_700x410.jpg',
      category: 'music'
    }),
    Product.create({
      name: 'BOSTON NORTHERN LIGHTS JAZZ CRUISE',
      description:
        'Take a trip back in time and climb aboard a 1920s styled New England Yacht for a 90 minute Boston Harbor Cruise. Enjoy the relaxing sounds of jazz as you take in beautiful views of the City Skyline at night.',
      price: 54,
      imageUrl:
        'https://www.xperiencedays.com/images/Boston-Jazz-Cruises-XD-124-041_700x410.jpg',
      category: 'activity'
    }),
    Product.create({
      name: 'EAST VILLAGE ROCK-N-PUNK TOUR',
      description:
        'Explore the East Village with Rock n roll historian Bobby Pinn during this exciting two-hour Sightseeing NYC Tour. The East Village, a neighborhood synonymous with music and art, helped introduce new music, fashion and a way of life to the world',
      price: 47,
      imageUrl:
        'https://www.xperiencedays.com/images/East-Village-Rock-N-Punk-Tour-XD-1284-001_700x410.jpg',
      category: 'music'
    }),
    Product.create({
      name: 'SUNSET SAIL ON THE AMERICAN ROVER',
      description:
        'Sit back, relax and enjoy a two-hour Sunset Cruise aboard the Tall Ship American Rover on the Elizabeth River. Departing from the Waterside Marketplace in Norfolk, this Schooner Sail is the perfect way for you to enjoy views of historic Norfolk, Virginia. ',
      price: 40,
      imageUrl:
        'https://www.xperiencedays.com/images/American-Rover-Norfolk-Sunset-Sails-XD-1374-002_700x410.jpg',
      category: 'activity'
    }),
    Product.create({
      name: 'INDIAN COOKING DEMO IN DALLAS',
      description:
        "Learn to create delicious vegetarian Indian meals during this two hour Dallas Cooking Demonstration and Indian Culinary Lesson with Master Chef - Manjuali Devi. Held at Kalachandijs, Dallas' premier Vegetarian Indian Restaurant, Chef Manjuali will teach you the art of Indian Cooking.",
      price: 32,
      imageUrl:
        'https://www.xperiencedays.com/images/Indian-Cooking-Class-Dallas-XD-126-002_700x410.jpg',
      category: 'food'
    })
  ])

  console.log(`seeded ${users.length} users, ${products.length} products`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
