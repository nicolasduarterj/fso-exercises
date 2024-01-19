import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'

function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("") 
  const [newNum, setNewNum] = useState("")

  const addName = event => {
    event.preventDefault()
    const notaObj = {
      name: newName,
      number: newNum
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

  const numChange = event => {
    console.log(event.target.value)
    setNewNum(event.target.value)
  }
  
  useEffect(() => {
    console.log("Starting effect")
    axios
      .get('http://localhost:3001/persons').then(response => {
        console.log("Promise fulfilled")
        setPersons(response.data)
      })
  }, [])
  
  return (
    <div> 
     <h2>Phonebook</h2>
      <Search arr={persons}/>
      <h3>Add someone to the phonebook</h3>
      <FormPhB states={[newName, newNum]} funcs={[addName, noteChange, numChange]}/>
      <h2>All numbers</h2>
      <Lista arr={persons}/>
    </div>
  )
}
//states = [estado do nome, estado do número]
//funcs = [onSubmit, mudança do nome, mudança do número]
const FormPhB = ({states, funcs}) => {
  return (
    <>
      <form onSubmit={funcs[0]}>
        <div>
          name: <input  value={states[0]} onChange={funcs[1]}/>
          <br/>
          number: <input value={states[1]} onChange={funcs[2]}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

const Lista = ({arr}) => {
  return (
    <>
    <ul> 
      {arr.map(person => <li key={person.name}> {person.name}: {person.number}</li>)}
    </ul>
    </>
  )
}

const Search = ({arr}) => {
  const [filtro, setFiltro] = useState("")
  const [filtrados, setFiltrados] = useState([])
  function changeFiltro(event) {
    console.log(event.target.value)
    setFiltro(event.target.value)
    const valid = arr.filter(person => person.name.includes(event.target.value))
    console.log(valid)
    setFiltrados(valid)
  }

  return (
    <>
      <h3>Search for a person</h3>
      <input value={filtro} onChange={changeFiltro}/>
      <ul>
        {filtrados.map(person => <li key={person.name}>{person.name}</li>)}
      </ul>
      <br/>
      <br/>

    </>
  )

}

export default App