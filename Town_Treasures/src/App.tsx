import { useState } from 'react'
import NavigationBar from "./components/NavBar"
import './App.css'
import SearchBar from './components/SearchBar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavigationBar/>
      <div>
        <h1>TOWN TREASURES</h1>
      </div>
      <SearchBar dataToStrings={(d) => [d.title, d.location]}/>
    </>
  )
}

export default App
