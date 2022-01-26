import React, { useEffect } from 'react'
import { MapContainer, Marker, TileLayer, MapConsumer } from 'react-leaflet'
import { Marker as LMarker } from 'leaflet'
import './styles/index.css'
import { filterData } from 'webWorker/filterData/workerizedFilterData'
import { useAsync, useCombobox } from 'utils'
import { useVirtual } from 'react-virtual'
import { List } from 'components/molecules'

function App() {
  const { data, run } = useAsync({
    data: [],
    status: 'pending',
  })

  useEffect(() => {
    run(filterData())
  }, [run])

  const [inputValue, setInputValue] = React.useState('')
  const listRef = React.useRef()

  const rowVirtualizer = useVirtual({
    size: data.length,
    parentRef: listRef,
    estimateSize: React.useCallback(() => 20, []),
    overscan: 10,
  })

  const {
    selectedItem,
    highlightedIndex,
    getComboboxProps,
    getInputProps,
    getItemProps,
    getLabelProps,
    getMenuProps,
    selectItem,
  } = useCombobox({
    items: data,
    inputValue,
    onInputValueChange: ({ inputValue: newValue }) => setInputValue(newValue),
    onSelectedItemChange: ({ selectedItem }) =>
      alert(selectedItem ? `You selected ${selectedItem.type}` : 'Selection Cleared'),
    itemToString: (item) => (item ? item.type : ''),
    scrollIntoView: () => {},
    onHighlightedIndexChange: ({ highlightedIndex }) =>
      highlightedIndex !== -1 && rowVirtualizer.scrollToIndex(highlightedIndex),
  })

  return (
    <main className="p-4">
      <div className="card max-w-7xl mx-auto grid grid-cols-2">
        <div>
          <label {...getLabelProps()}>Find a city</label>
          <div {...getComboboxProps()}>
            <input {...getInputProps({ type: 'text' })} className="input" />
            <button onClick={() => selectItem(null)} aria-label="toggle menu">
              &#10005;
            </button>
          </div>
          <List
            items={data}
            getMenuProps={getMenuProps}
            getItemProps={getItemProps}
            highlightedIndex={highlightedIndex}
            selectedItem={selectedItem}
            listRef={listRef}
            virtualRows={rowVirtualizer.virtualItems}
            totalHeight={rowVirtualizer.totalSize}
            className="relative overflow-y-auto max-h-[80vh]"
          />
        </div>
        <div className="relative">
          <MapContainer center={[43.238949, 76.889709]} zoom={13} className="h-[80vh]">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/*<Marker position={[51.505, -0.09]}>*/}
            {/*  <Popup>*/}
            {/*    A pretty CSS3 popup. <br /> Easily customizable.*/}
            {/*  </Popup>*/}
            {/*</Marker>*/}
            <MapConsumer>
              {(map) => {
                const marker = new LMarker([43.238949, 76.889709])
                marker.addTo(map)
                return null
              }}
            </MapConsumer>
            {rowVirtualizer.virtualItems.map(({ index }) => {
              const position = data[index]
              return (
                <Marker
                  key={position.id}
                  position={[position.coords.lat, position.coords.long]}
                  eventHandlers={{
                    click: () => {
                      console.log('marker clicked')
                    },
                  }}
                />
              )
            })}
          </MapContainer>
        </div>
      </div>
    </main>
  )
}

export default App
