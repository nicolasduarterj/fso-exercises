import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Course from './components/course'


function App() {
  const course = {
    name: 'Half stack application development',
    parts: [ 
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
  
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name:'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  const course2 = {
    name: 'Curso teste',
    parts: [
      {
        name: 'Teste 1',
        exercises: 20,
        id: 1
      },
      {
        name: 'Teste 2',
        exercises: 21,
        id: 2
      }
    ]
  }
  
  return (
    <div>
      <Course name={course.name} parts={course.parts}/>
      <Course name={course2.name} parts={course2.parts}/>
    </div>
  )
}



export default App
