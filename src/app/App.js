import React, { useEffect } from 'react'
import './App.css'
import { filterData } from 'filterData/workerized-filter-data'
import { useAsync } from 'shared/utils'

function App() {
  const { data, run } = useAsync()

  useEffect(() => {
    run(filterData())
  }, [run])

  console.log('app.jsx', data.orders)
  return <div className="App">hello</div>
}

export default App
