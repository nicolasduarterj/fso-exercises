const Course = ({name, parts}) => {
    
    const exercicios = parts.map((part) => part.exercises)
    console.log(exercicios)
    return(
        <>
        <Header course={name}></Header>
        <Content array={parts}></Content>
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
  
  const NumEx = ({exArray}) => <p>Number of exercises {exArray.reduce((accumulator, currentValue) => accumulator + currentValue)}</p>

  const Content = ({array}) => {
    return (
      <>
        {array.map(parte => <Part title={parte.name} exnum={parte.exercises} key={parte.id}/>)}
      </>
    )
  }
  
  
  const Part = ({title, exnum}) => {
    return (
      <>
        <h1>{title} {exnum}</h1>
      </>
    )
  }

  export default Course