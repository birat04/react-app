import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const Card = ({ title, content }) => {
  return (
    <div className= "card"> 
      

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
