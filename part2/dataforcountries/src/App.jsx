import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import apiservices from "./apiservices"

function App() {
  const [paises, setPaises] = useState([])
  const [filtro, setFiltro] = useState("")
  const [specEnough, setspecEnough] = useState(false)
  const [filtrados, setFiltrados] = useState([])

  const updateFiltro = event => {
    setFiltro(event.target.value)
    const filtroHolder = paises.filter(pais => pais.name.common.includes(event.target.value))
    if (filtroHolder.length < 11) {
      setspecEnough(true)
      setFiltrados(filtroHolder)
    }
    else {
      setspecEnough(false)
    }
  }

  useEffect(() => {
    apiservices().then(response => {
      setPaises(response)
      console.log(response)
    })
  }, [])

  return (
    <>
    <p>find countries</p>
    <input onChange={updateFiltro}></input>
    <Lista arr={filtrados} bool={specEnough}/>
    </>
  )
}

const Lista = ({arr, bool}) => {
  if (bool) {
    return (
      <>
        <ul>
          {arr.map(pais => <li key={pais.name.common}>{pais.name.common}</li>)}
        </ul>
      </>  
    )
  }
  return (
    <p>please be more specific</p>
  )
}

export default App
