import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'


function App() {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2= 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14  

  return (
    <div>
      <Header course={course}/>
      <Content part1={part1} exercises1={exercises1} part2={part2} exercises2={exercises2} part3={part3} exercises3={exercises3}/>
      <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
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
      <Part part={props.part1} exnum={props.exercises1}/>
      <Part part={props.part2} exnum={props.exercises2}/>
      <Part part={props.part3} exnum={props.exercises3}/>
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
