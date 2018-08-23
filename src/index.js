// import dependencies
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const jwt = require('express-jwt')
const jwksRsa = require('jwks-rsa')

// define the Express app
const app = express()

// the in-memory database
const recipes = [
  {
    id: 1,
    title: 'Quick Tomato Sandwich',
    ingredients: 'Two slices of bread, ham, cheese, and butter.',
    directions: 'Spread the butter on both slices, add cheese and ham, and enjoy.'
  },
  {
    id: 2,
    title: 'Scrambled Eggs with Cheese',
    ingredients: 'Three eggs and cheese.',
    directions: 'Crack 3 eggs into a bowl. Beat with fork. Add a splash of water. Stir in desired amount of cheese. Pour egg/cheese mixture into pan. Stir constantly with spatula until done.'
  }
]

// enhance your app security with Helmet
app.use(helmet())

// use bodyParser to parse application/json content-type
app.use(bodyParser.json())

// enable all CORS requests
app.use(cors())

// log HTTP requests
app.use(morgan('combined'))

// retrieve recipes
app.get('/', (req, res) => {
  res.send(recipes)
})

app.get('/:id', (req, res) => {
  const recipe = recipes.filter((recipe) => (recipe.id === parseInt(req.params.id)))
  if (recipe.length === 0) return res.status(404).send()
  if (recipe.length > 1) return res.status(500).send()
  res.send(recipe[0])
})

const checkToken = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: process.env.AUTH0_CLIENT_ID,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256']
})

// insert a new recipe
app.post('/', (req, res) => {
  recipes.push(req.body)

  res.status(200).send()
})

// start the server
app.listen(8081, () => {
  console.log('listening on port 8081')
})
