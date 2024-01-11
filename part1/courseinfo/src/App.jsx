import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'



function App() {
  const course = {
    name: 'Half stack application development',
    parts: [ 
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
  
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name:'State of a component',
        exercises: 14  
      }
    ]
  }
  
  return (
    <div>
      <Header course={course.name}/>
      <Content array={course.parts}/>
      <p>Number of exercises: {course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises}</p>
    </div>
  )
}


const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}


const Content = (props) => {
  return (
    <>
      <Part part={props.array[0].name} exnum={props.array[0].exercises} />
      <Part part={props.array[1].name} exnum={props.array[1].exercises} />
      <Part part={props.array[2].name} exnum={props.array[2].exercises} />
    </>
  )
}


const Part = (props) => {
  return (
    <>
      <h1>{props.part} {props.exnum}</h1>
    </>
  )
}

export default App
