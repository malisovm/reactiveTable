import React, { useEffect, useState } from 'react'
import Table from './components/Table'
import Filter from './components/Filter'
import axios from 'axios'

function App() {
  const [data, setData] = useState<[]>([])
  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState('ASC')
  const [currPage, setCurrPage] = useState(1)
  const [pagesCount, setpagesCount] = useState(0)

  // filter selections
  const [selections, setSelections] = useState({
    column: '',
    type: '',
    text: '',
  })

  useEffect(() => {
    const getData = async () => {
      try {
        let dataFromDB = await axios.post('/db', {
          column: selections.column,
          type: selections.type,
          text: selections.text,
          sortBy: sortBy,
          sortOrder: sortOrder,
          currPage: currPage,
        })
        setData(dataFromDB.data.displayedItems)
        setpagesCount(dataFromDB.data.pagesCount)
      } catch (error: any) {
        console.log(error)
      }
    }
    getData()
  }, [selections, sortBy, sortOrder, currPage])
  return (
    <>
      <Table
        data={data}
        setSortBy={setSortBy}
        setSortOrder={setSortOrder}
        setCurrPage={setCurrPage}
        pagesCount={pagesCount}
      />
      <br />
      <Filter selections={selections} setSelections={setSelections} />
    </>
  )
}

export default App
