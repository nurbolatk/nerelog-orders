import React, { useCallback, useEffect } from 'react'
import './styles/index.css'
import { filterData } from 'webWorker/filterData/workerizedFilterData'
import { useAsync } from 'utils'
import { List } from 'components/molecules'
import { Map } from 'components/organisms'
import { useInputValue } from './hooks'
import { SearchInput } from 'components/atoms'
import { useVirtual } from 'react-virtual'

function App() {
  const mapRef = React.useRef()

  const { data, run } = useAsync({
    data: [],
    status: 'pending',
  })
  const listRef = React.useRef()

  const rowVirtualizer = useVirtual({
    size: data.length,
    parentRef: listRef,
    estimateSize: React.useCallback(() => 232, []),
    overscan: 10,
  })
  const [inputValue, handleInputChange, clearInputValue] = useInputValue()
  const [selectedItem, setSelectedItem] = React.useState(null)

  useEffect(() => {
    run(filterData(inputValue))
  }, [inputValue, run])

  console.log('data', inputValue)

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
    <main className="p-4">
      <div className="card max-w-7xl mx-auto grid grid-cols-3 gap-8 overflow-hidden">
        <div className="col-span-1">
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
            className="relative overflow-y-auto h-[80vh]"
          />
        </div>
        <div className="relative col-span-2 -m-4 overflow-hidden">
          <Map markers={data} ref={mapRef} onMarkerClick={handleMarkerClick} />
        </div>
      </div>
    </main>
  )
}

export default App
