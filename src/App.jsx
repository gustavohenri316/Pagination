import { useEffect } from "react"
import { useState } from "react"
import './App.css'
import { Pagenation } from "./components/Pagenation"
import { Selector } from "./components/Selector"
export function App() {
  const [items, setItems] = useState([])
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(0)

  const pages = Math.ceil(items.length / itemsPerPage)
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage
  const currentItems = items.slice(startIndex, endIndex)

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(data => data)
      setItems(result)
    }
    fetchData()
  }, [])

  useEffect(() => {
    setCurrentPage(0)
  },[itemsPerPage])

  return (
    <div className="App">
      <Selector itemsPerPage={itemsPerPage} setItemsPerPage={setItemsPerPage}/> 
     
      {
        currentItems.map(item => {
          return (
            <div className="item">
              <span>{item.id}</span>
              <span>{item.title}</span>
              <span>{item.completed}</span>
            </div>
          )
        })
      }
       <Pagenation setCurrentPage={setCurrentPage} pages={pages}/>
    </div>
  )
}


