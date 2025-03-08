import { useState } from 'react'
import './App.css'

const Card = ({ title, content, onLike, onDislike }) => {
  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)

  const handleLike = () => {
    if (!liked) {
      onLike()
    }
    setLiked(!liked)
    setDisliked(false) 
  }

  const handleDislike = () => {
    if (!disliked) {
      onDislike()
    }
    setDisliked(!disliked)
    setLiked(false) 
  }

  return (
    <div className="card"> 
      <h2>{title}</h2>
      <p>{content}</p>
      <div className="card-actions">
        <button onClick={handleLike}>
          {liked ? "❤️" : "🤍"}
        </button>
        <button onClick={handleDislike}>
          {disliked ? "💔" : "🤍"}
        </button>
      </div>
    </div>
  )   
}

const App = () => {
  const [likes, setLikes] = useState(0)
  const [dislikes, setDislikes] = useState(0)

  const handleLike = () => setLikes((prev) => prev + 1)
  const handleDislike = () => setDislikes((prev) => prev + 1)

  return (
    <div className="card-container">
      <Card title="The Lion King" content="Animated Movie" onLike={handleLike} onDislike={handleDislike} />
      <Card title="Avatar" content="Sci-Fi Movie" onLike={handleLike} onDislike={handleDislike} />
      <div>
        <p>Likes: {likes}</p>
        <p>Dislikes: {dislikes}</p>
      </div>
    </div>
  )
}

export default App
