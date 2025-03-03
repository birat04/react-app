import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const Card = ({ title, content }) => {
  return (
    <div class= "card" style={{
      border: '1px solid black', 
      padding: '20px', 
      margin: '10px',
      width: '300px',
      display: 'inline-block',
      backgroundColor: 'lightblue',
      borderRadius: '10px',
      minHeight: '200px',
      boxShadow: '5px 5px 5px 5px lightgrey'}}>

      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  )   
   
}
  

const App  = () => {
  return (
    <div className="card-container">
    


    <Card title="The lion king" content="Animated Movie" />
    <Card title="Avatar" content="Animated Movie" />
    
    </div>
  )
}

export default App
