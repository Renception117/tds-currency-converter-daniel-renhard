import './App.css'
import Dropdown from './components/Dropdown'

function App() {

  return (
    <>
      <h1>Currency Converter</h1>
      <Dropdown options={["one", "two", "three"]}/>
      <Dropdown options={["one", "two", "three"]}/>
    </>
  )
}

export default App
