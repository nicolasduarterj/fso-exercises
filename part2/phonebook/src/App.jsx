import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
function App() {
  const [persons, setPersons] = useState([
    {name: "Arto Hellas" }
  ])
  const [newName, setNewName] = useState("") 

  const addName = event => {
    event.preventDefault()
    const notaObj = {
      name: newName
    }
    console.log(notaObj)
    
    if (!persons.some(person => person.name === notaObj.name)) { 
      setPersons(persons.concat(notaObj))
      console.log(persons.concat(notaObj))
      setNewName("")
  
    }
    else {
      alert(`${notaObj.name} is already present in the phonebook.`)
    }
  }
  const noteChange = event => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <>
      <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input  value={newName} onChange={noteChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Lista arr={persons}/>
    </div>
    </>
  )
}

export default App

const Lista = ({arr}) => {
  return (
    <>
    <ul>
      {arr.map(person => <li key={person.name}>{person.name}</li>)}
    </ul>
    </>
  )
}