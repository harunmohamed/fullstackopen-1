import React, { useState } from 'react'
import Person from './components/Person'

const App = (props) => {
  const [ persons, setPersons] = useState(props.persons) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const checkPersonName = persons.filter(person => person.name===newName);

  const addEntry = (event) => {
    event.preventDefault()

    const entryObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    if(newNumber && newName){
    checkPersonName.length
      ? alert(`${newName} is already in the phonebook`)
      : setPersons(persons.concat(entryObject));
    } else 
    alert('please complete the name and the number field')
    setNewName('')
    setNewNumber('')
    
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const entries = () => persons.map(person => 
  <Person   key={person.name} name={person.name} number={person.number}  /> )

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addEntry}>
        <div>
          name: <input  value={newName}
          onChange={handleNameChange}/>
        </div> 
        
        <div>
          number: <input  value={newNumber}
          onChange={handleNumberChange}/>
        </div>
        
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {entries()}
      
    </div>
  )
}

export default App