import React, { useEffect, useState } from 'react'
import './App.css'
import { filterData } from 'filterData/workerized-filter-data'

function App() {
  const [orders, setOrders] = useState([])
  useEffect(() => {
    filterData().then((data) => {
      setOrders(data)
    })
  }, [])
  console.log('app.jsx', orders)
  return <div className="App">hello</div>
}

export default App
