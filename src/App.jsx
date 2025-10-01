import { useState } from 'react'
import './App.css'
import JobCvForm from './components/JobCvForm';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <JobCvForm />
    </>
  )
}

export default App
