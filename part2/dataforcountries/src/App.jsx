import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import apiservices from "./apiservices"

function App() {
  const [paises, setPaises] = useState([])
  const [filtro, setFiltro] = useState("")
  const [specEnough, setspecEnough] = useState(0)
  const [filtrados, setFiltrados] = useState([])

  const updateFiltro = event => {
    setFiltro(event.target.value)
    const filtroHolder = paises.filter(pais => pais.name.common.includes(event.target.value))
    console.log(filtroHolder.length)
    if (filtroHolder.length < 11 && filtroHolder.length > 1) {
      setspecEnough(1)
      setFiltrados(filtroHolder)
    }
    else if (filtroHolder.length < 2) {
      setFiltrados(filtroHolder)
      setspecEnough(2)
    }
    else {
      setFiltrados(filtroHolder)
      setspecEnough(0)
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
  if (bool == 1) {
    return (
      <>
        <ul>
          {arr.map(pais => <li key={pais.name.common}>{pais.name.common}</li>)}
        </ul>
      </>  
    )
  }
  else if (bool == 2) {
    return (
      <>
      <PaisCompleto pais={arr[0]}/>
      </>
    )
  }
  return (
    <p>please be more specific</p>
  )
}

const PaisCompleto  = ({pais}) => {
  const linguaprop = pais.languages
  const properties = Object.keys(linguaprop)
  const languages = properties.map(prope => linguaprop[`${prope}`])
  return (
    <>
      <h2>{pais.name.common}</h2>
      <p>capital {pais.capital}</p>
      <p>area {pais.area}</p>
      <p><b>languages:</b></p>
      <ul>
        {languages.map(lingua => <li key={lingua}>{lingua}</li>)}
      </ul>
      <img src={pais.flags.png}/>

    </>
  )
}


export default App
