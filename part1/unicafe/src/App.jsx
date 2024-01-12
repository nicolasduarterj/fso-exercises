import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'


/**Objetivo: criar um site de feedback para um café
 * O site deve conter botões para feedback positivo, negativo e neutro
 * Deve haver um display que mostre quantas avaliações de cada tipo foram feitas
 * além disso, deve a média das avaliações e a porcentagem de avaliações boas
 * as estatísticas devem estar numa tabela, e só aparecerem após o feedback
 * tudo em componentes separados
 */

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [negative, setNegative] = useState(0)



  return (
    <>
      <h1>give feedback</h1>
      <ButtonFeed funcao={() => setGood(good + 1)} texto="good"/>
      <ButtonFeed funcao={() => setNeutral(neutral + 1)} texto="neutral"/>
      <ButtonFeed funcao={() => setNegative(negative + 1)} texto="negative"/>
      <Holder states={[good, neutral, negative]} fGood = {setGood} fNeut={setNeutral} fNega={setNegative}/>
    </>
  )
}

const Holder = ({states}) => {
  if (states[0] + states[1] + states[2] == 0) {
    return (
      <p>Please give feedback</p>
    )
  }
  else {
      return (
        <>
        <table>
          <tbody>
            <tr>
            <Stats texto="Positive" stat={states[0]}/>
            </tr>
            <tr>
            <Stats texto="Neutral" stat={states[1]}/>
            </tr>
            <tr>
            <Stats texto="Negative" stat={states[2]}/>
            </tr>
            <tr>
            <Stats texto="Average" stat={average(states)}/>
            </tr>
            <tr>
            <Stats texto="Percent Positive" stat={percent(states)}/>
            </tr>
          </tbody>
          
        </table>
        </>
        
      )
  }
  

}

function average(array) {
  const soma = array[0] + (array[2] * (-1))
  const divi = array[0] +array[1] + array[2]
  const avg = soma/divi
  return avg 
}

const percent = (array) => (array[0]/(array[0] + array[1] + array[2])) * 100

const ButtonFeed = ({funcao, texto}) => <button onClick={funcao}>{texto}</button>

const Stats = ({stat, texto}) =>  {
  return (
    <>
    <td>{texto}</td><td>{stat}</td>
    </>
  )
}

export default App
