import { useState, useEffect } from 'react'
import axios from 'axios'

import PersonList from './components/PersonList'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([])
  const hook = () => {
    axios.get('http://localhost:3001/persons').then(response => {
      setPersons(response.data)
    })
  }
  useEffect(hook, [])

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
      <Filter value={newFilter} onChange={handleFilter} />
      <PersonForm addPerson={addPerson} newName={newName} handleNewName={handleNewName} newPhone={newPhone} handleNewPhone={handleNewPhone} />
      <PersonList persons={peopleToShow} />
    </div>
  )
}

export default App