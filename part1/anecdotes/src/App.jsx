import { useState } from 'react'

/**
 * Objetivo: criar um botão que exiba uma anedota aleatória
 * além disso, um botão que vota na anedota atual 
 * e um display que mostre a anedota mais votada
 */

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const voteinit = new Uint8Array(anecdotes.length)
  const [votes, setVotes] = useState([...voteinit])
  
  const mudarVotos = () => {
    const cambio = plusOneArr([...votes], selected)
    console.log(cambio)
    setVotes(cambio)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br/>
      <br/>
      <button onClick={mudarVotos}>vote</button>
      <button onClick={() => setSelected(getRanDiff(anecdotes.length, selected))}>next anecdote</button>
      <TextoPreferido anedotas={anecdotes} votos={[...votes]}/>
    </div>
  )
}

function getRanDiff(len, old) {
  let retorno = random(len)
  while (retorno == old) {
    retorno = random(len)
  }
  return(retorno)
}

const TextoPreferido = ({anedotas, votos}) => {
  console.log("Votos:", votos)
  console.log("Maximo votos", Math.max(...votos))
  if (Math.max(votos) == 0) {
    return (
      <>
      <h1>Anecdote with the most votes</h1>
      <p>No anecdotes have received any votes yet, please vote on your favorite one!</p>
      </>
    )
  }
  else {
    const pos = votos.indexOf(Math.max(...votos))
    console.log("Pos:", pos)
    return (
      <>
      <h1>Anecdote with the most votes</h1>
      <p>{anedotas[pos]}</p>
      </>
    )
  }


}

const random = len => { 
  let result = Math.floor(Math.random() * len)
  console.log(result)
  return result
}

function plusOneArr(arr, target) {
  arr[target] += 1
  return arr
}

export default App
