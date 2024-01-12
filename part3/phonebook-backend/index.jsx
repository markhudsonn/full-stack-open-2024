const express = require('express')
const app = express()
var morgan = require('morgan')
const cors = require('cors')

app.use(express.static('dist'))
app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())

morgan.token('data', (request) => {
  return request.method === 'POST' ? JSON.stringify(request.body) : ''
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

let people = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    },
    {
      "id": 5,
      "name": "Mark",
      "number": "123-456-7890"
    }
]
  
app.get('/', (request, response) => {
  response.send('Hello, this is the phonebook backend!')
})

app.get('/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${people.length} people</p>
    <p>${new Date()}</p>`)
}
)

app.get('/api/people', (request, response) => {
  response.json(people)
})

app.get('/api/people/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = people.find(note => note.id === id)
  if (person) {
      response.json(person)
  } else {
      response.status(404).end()
  }
})

app.delete('/api/people/:id', (request, response) => {
  const id = Number(request.params.id)
  people = people.filter(note => note.id !== id)

  response.status(204).end()
})

const generateId = () => {
  const randomInt = Math.floor(Math.random() * 999999) + 1

  return randomInt
}

app.post('/api/people', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'name or number is missing' 
    })
  }

  if (people.find(person => person.name === body.name)) {
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }

  while (people.find(person => person.id === generateId())) {
    id = generateId()
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  people = people.concat(person)

  response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`frontend running at http://localhost:${PORT}`)
})