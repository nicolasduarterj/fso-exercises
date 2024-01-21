import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
import bookServices from './services/bookServices'

function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("") 
  const [newNum, setNewNum] = useState("")

  const addName = event => {
    const num = persons.length + 1
    event.preventDefault()
    let notaObj = {
      name: newName,
      number: newNum,
      id: num.toString()
    }
    console.log("NotaObj antes do if: ", notaObj)
    
    //Se não há um objeto na array tal que o seu nome seja igual ao nome na notaObj
    if (!persons.some(person => person.name === notaObj.name)) { 
        bookServices.postPerson(notaObj).then(retorno => {
          setPersons(persons.concat(retorno))
          console.log("Persons concateneda: ", persons.concat(retorno))
          setNewName("")
       
      })
        
    }
    else {
      if (window.confirm("This person is already present on the phonebook. Do you wish to alter their information nonetheless?")) {
        notaObj.id = persons.find(person => person.name === notaObj.name).id
        console.log("NotaObj.id =", notaObj.id)
        bookServices.updatePerson(notaObj).then(retorno => {
          setPersons(persons.filter(person => person.name !== notaObj.name).concat(retorno))
          console.log("Persons concatenada: ", "Persons concatenada: ", persons.concat(retorno))
          setNewName("")
        })
      }
    }
  }
  const noteChange = event => {
    setNewName(event.target.value)
  }

  const numChange = event => {
    setNewNum(event.target.value)
  }

  const deletePerson = name => {
    const id = persons.find(person => person.name === name).id
    bookServices.deletePerson(id).then(() => 
      setPersons(persons.filter(person => person.id !== id)))
  }
  
  useEffect(() => {
    console.log("Starting effect")
    bookServices.getAll().then(resposta => {
      console.log("Effect conluded")
      setPersons(resposta)}) 
  }, [])
  
  return (
    <div> 
     <h2>Phonebook</h2>
      <Search arr={persons}/>
      <h3>Add someone to the phonebook</h3>
      <FormPhB states={[newName, newNum]} funcs={[addName, noteChange, numChange]}/>
      <h2>All numbers</h2>
      <Lista arr={persons} func={deletePerson}/>
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

const Lista = ({arr, func}) => {
  return (
    <>
    <ul> 
      {arr.map(person => <ItemLista person={person} func={func} key={person.id}/>)}
    </ul>
    </>
  )
}

const ItemLista = ({person, func}) => {
  const str = "Are you sure you want to delete this person"
  return(
    <>
      <li> {person.name}: {person.number} {'\u00A0'}
        <button onClick={() => {if (window.confirm(str)) {func(person.name)}}}>Delete</button> 
      </li> 
    </>
  )
}

const Search = ({arr}) => {
  const [filtro, setFiltro] = useState("")
  const [filtrados, setFiltrados] = useState([])
  function changeFiltro(event) {
    setFiltro(event.target.value)
    const valid = arr.filter(person => person.name.includes(event.target.value))
    console.log("valid: ", valid)
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

    </>
  )

}

export default App