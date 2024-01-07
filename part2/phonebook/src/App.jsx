import { useState, useEffect } from 'react'
import personService from './services/person'

import PersonList from './components/PersonList'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [message, setMessage] = useState(null)

  const hook = () => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons)
    })
  }
  useEffect(hook, [])

  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      updatePhone(persons.find(person => person.name === newName).id, newPhone)
      return
    }
    const personObject = {
      name: newName,
      id: newName,
      phone: newPhone,
    }
    personService.create(personObject).then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setMessage(`Added ${returnedPerson.name}`)
      setNewName('')
      setNewPhone('')
    })
  }

  const deletePerson = (id) => {
    const person = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.remove(id).then(() => {
        setPersons(persons.filter(person => person.id !== id))
      }).catch(error => {
        setMessage(`Error: Information of ${person.name} has already been removed from server`)
        setPersons(persons.filter(p => p.id !== id))
      })
    }
  }

  const updatePhone = (id, newPhone) => {
    const person = persons.find(person => person.id === id)
    const changedPerson = {...person, phone: newPhone}
    if (window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)) {
      personService.update(id, changedPerson).then(returnedPerson => {
        setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
        setMessage(`Updated ${returnedPerson.name}`)
      }).catch(error => {
        setMessage(`Error: Information of ${person.name} has already been removed from server`)
        setPersons(persons.filter(p => p.id !== id))
      }
      )
    }
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
      <Notification message={message} />
      <Filter value={newFilter} onChange={handleFilter} />
      <PersonForm addPerson={addPerson} newName={newName} handleNewName={handleNewName} newPhone={newPhone} handleNewPhone={handleNewPhone} />
      <PersonList persons={peopleToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App