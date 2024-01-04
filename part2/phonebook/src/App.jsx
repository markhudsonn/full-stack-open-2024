import { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123456', id: 'Arto Hellas' },
    { name: 'Ada Lovelace', phone: '39-44-5323523', id: 'Ada Lovelace' },
    { name: 'Dan Abramov', phone: '12-43-234345', id: 'Dan Abramov' },
    { name: 'Mary Poppendieck', phone: '39-23-6423122', id: 'Mary Poppendieck' }
  ])
  
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    const personObject = {
      name: newName,
      id: newName,
      phone: newPhone,
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewPhone('')
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewPhone = (event) => {
    setNewPhone(event.target.value)
  }

  const handleFilter = (event) => {
    setNewFilter(event.target.value)
  }

  const peopleToShow = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h1>Phonebook</h1>
      <div>
        <h2>Filter</h2>
        <form>
          include names with: <input value={newFilter} onChange={handleFilter} />
        </form>
      </div>
      <div>
        <h2>Add new</h2>
        <form onSubmit={addPerson}>
          <div>
            name: <input value={newName} onChange={handleNewName} />
          </div>
          <div>
            phone: <input value={newPhone} onChange={handleNewPhone} />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
      </div>
      <div>
        <h2>Numbers</h2>
        <ul>
          {peopleToShow.map(person =>
            <Person key={person.id} person={person} />
          )}
        </ul>
      </div>
    </div>
  )
}

export default App