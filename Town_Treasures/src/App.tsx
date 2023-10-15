import { useState } from 'react'
import NavigationBar from "./constants/NavBar"
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavigationBar/>
      <div>
        <h1>TOWN TREASURES</h1>
      </div>
    </>
  )
}

export default App
