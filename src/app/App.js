import React, { useCallback, useEffect } from 'react'
import './styles/index.css'
import { filterData } from 'webWorker/filterData/workerizedFilterData'
import { useAsync } from 'utils'
import { List, OrderListItem } from 'components/molecules'
import { Map } from 'components/organisms'
import { useInputValue, useVirtualList } from './hooks'
import { SearchInput } from 'components/atoms'

function App() {
  const mapRef = React.useRef()

  const { data, run } = useAsync({
    data: [],
    status: 'pending',
  })

  const [listRef, rowVirtualizer] = useVirtualList(data)
  const [inputValue, handleInputChange, clearInputValue] = useInputValue()
  const [selectedItem, setSelectedItem] = React.useState(null)

  useEffect(() => {
    run(filterData(inputValue))
  }, [inputValue, run])

  const handleMarkerClick = useCallback(
    (order, index) => {
      setSelectedItem(order)
      rowVirtualizer.scrollToIndex(index)
    },
    [rowVirtualizer]
  )

  const handleItemClick = useCallback((item) => {
    setSelectedItem(item)
    mapRef.current?.panToMarker(item.id)
  }, [])

  return (
    <main className="lg:p-4">
      <div className="card max-w-7xl mx-auto grid lg:grid-cols-3 grid-cols-1 grid-rows-2 lg:grid-rows-1 gap-8 overflow-hidden">
        <div className="col-span-1 col-start-1">
          <SearchInput
            className="relative mb-4"
            value={inputValue}
            onChange={handleInputChange}
            onClearClick={clearInputValue}
            placeholder="Client name"
          />
          <List
            items={data}
            listRef={listRef}
            selectedItem={selectedItem}
            onItemClick={handleItemClick}
            virtualRows={rowVirtualizer.virtualItems}
            totalHeight={rowVirtualizer.totalSize}
            className="relative overflow-y-auto h-[40vh] lg:h-[80vh]">
            <OrderListItem />
          </List>
        </div>
        <div className="relative lg:col-span-2 lg:col-start-2 -m-4 overflow-hidden row-start-1 row-end-2">
          <Map markers={data} ref={mapRef} onMarkerClick={handleMarkerClick} />
        </div>
      </div>
    </main>
  )
}

export default App
