import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const Card = ({ title, content, onLike, onDislike }) => {
  return (
    <div className="card"> 
      <h2>{title}</h2>
      <div className="card-actions">
        <button onClick={onLike}>Like</button>
        <button onClick={onDislike}>Dislike</button>
      </div>
      <p>{content}</p>
    </div>
  )   
}
  
const App = () => {
  const [likes, setLikes] = useState(0)
  const [dislikes, setDislikes] = useState(0)

  const handleLike = () => {
    setLikes(likes + 1)
  }

  const handleDislike = () => {
    setDislikes(dislikes + 1)
  }

  return (
    <div className="card-container">
      <Card title="The lion king" content="Animated Movie" onLike={handleLike} onDislike={handleDislike} />
      <Card title="Avatar" content="Animated Movie" onLike={handleLike} onDislike={handleDislike} />
      <div>
        <p>Likes: {likes}</p>
        <p>Dislikes: {dislikes}</p>
      </div>
    </div>
  )
}

export default App
