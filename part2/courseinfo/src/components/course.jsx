const Course = ({name, parts}) => {
  
  /** Isso acessa a array de objetos (parts) e mapeia cada indíce da array a exercícios
   * a um número de exercícios de um objeto da array (parts)*/
  const exercicios = parts.map((part) => part.exercises)
  console.log(exercicios)
  return(
      <>
      <Header course={name}/>
      <Content array={parts}/>
      <NumEx exArray={exercicios}/>
      </>
    )
}

const Header = ({course}) => {
    return (
      <>
        <h1>{course}</h1>
      </>
    )
  }
  
const Content = ({array}) => {
    return (
      <>
      {array.map(parte => <Part title={parte.name} exnum={parte.exercises} key={parte.id}/>)}
      </>
    )
  }
  
  
const Part = ({title, exnum}) => <h1>{title} {exnum}</h1>


const NumEx = ({exArray}) => <p>Number of exercises {somaArray(exArray)}</p>

//Esse reduce soma todos os numeros na array recebida como parâmetro
const somaArray = (arr) => arr.reduce((accumulator, currentValue) => accumulator + currentValue)


  export default Course