  
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')

const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

const Person = require('./models/person')

app.use(cors())

morgan.token('person', (req) => {
  return JSON.stringify(req.body)
})

app.use(bodyParser.json())
app.use(morgan(':method :url :status :res[content-length] :response-time ms :person'))


app.use(express.static('build'))


app.post('/api/persons', (request, response, next) => {
  const body = request.body
  
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number is missing'
    })
  } 
  
  
  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save()
  .then(savedPerson  => savedPerson.toJSON())
  .then(savedAndFormattedPerson => {
    response.json(savedAndFormattedPerson)
  })
   .catch(error => next(error))

})

app.get('/api/persons', (request, response, next) => {
  Person.find({}).then(persons => {
    response.json(persons.map(person => person.toJSON() ))
  }).catch(error => next(error))
})

app.get('/info', (request, response) => {
   
  Person.count({}, function( err, count){
    console.log( "Number of con:", count );
    response.send(`<h1>Phonebook has info for ${count} people</h1>
    ${Date(Date.now()).toString() }
    `)
})
  
})

app.get('/api/persons/:id', (request, response, next) => {

  Person.findById(request.params.id)
  .then(person => {
    if (person) {
      response.json(person.toJSON())
    } else {
      response.status(404).end() 
    }
  }).catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {

// console.log('--------------------------------')
// console.log(request.params)
// console.log('request :',request.params.articleId)

  Person.findByIdAndRemove(request.params.id)
  .then(result => {
    response.status(204).end()
  })
  .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body;

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id, person, {new: true, runValidators: true, context: 'query' })
  .then((updatedPerson) => {
    response.json(updatedPerson.toJSON())
    }).catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}
app.use(errorHandler)


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})