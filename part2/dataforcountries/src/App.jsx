import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import apiservices from "./apiservices"
import weatherApi from './weatherapi'

function App() {
  const [paises, setPaises] = useState([])
  const [filtro, setFiltro] = useState("")
  const [specEnough, setspecEnough] = useState(0)
  const [filtrados, setFiltrados] = useState([])
  const [loaded, setLoaded] = useState(false)
  const updateFiltro = event => {
    setFiltro(event.target.value)
    const filtroHolder = paises.filter(pais => pais.name.common.includes(event.target.value))
    console.log(filtroHolder.length)
    if (filtroHolder.length < 11 && filtroHolder.length > 1) {
      setFiltrados(filtroHolder)
      setspecEnough(1)
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
      setLoaded(true)
    })
  }, [])

  if (!loaded) {
    return <p>Loading...</p>
  }

  return (
    <>
    <p>find countries</p>
    <input onChange={updateFiltro}></input>
    <Lista arr={filtrados} bool={specEnough}/>
    </>
  )
}


//Isso é uma abominação; boa sorte, eu do futuro, em entender essas chaves :)
const Lista = ({arr, bool}) => {
  const [visiveis, setVisiveis] = useState(Array(10).fill(false))
  if (bool == 1) {
    return (
      <>
        <ul>
          {arr.map((pais, i) => <ItemLista pais={pais} i={i} func={() => {
           const newarr = [...visiveis]
           newarr[i] = !newarr[i]
           setVisiveis(newarr) 
           console.log(visiveis)
          }} bool={visiveis[i]}/>)}
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

const ItemLista = ({pais, i, func, bool}) => {
  if (bool) {
    return (
      <>
      <li id={i}>{pais.name.common} <button onClick={func}>show</button></li>
      <PaisCompleto pais={pais}/>
      </>
    )
  }
  return (
    <>
      <li id={i}>{pais.name.common} <button onClick={func}>show</button></li>
    </>
  )
}

const PaisCompleto  = ({pais}) => {
  const linguaprop = pais.languages
  const properties = Object.keys(linguaprop)
  const languages = properties.map(prope => linguaprop[`${prope}`])
  const [weather, setWeather] = useState(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    weatherApi(pais.name.common).then(response => {
      setWeather(response)
      console.log(response)
      setLoaded(true)
    })
  } ,[])
  if (!loaded) {
    return <p>loading...</p>
  }
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
      <h3>Weather</h3>
      <p>Current temperature {weather.current.temp_c}</p>
      <p>Condition: {weather.current.condition.text}</p>
      <img src={`http:${weather.current.condition.icon}`}/>
    </>
  )
}


export default App
