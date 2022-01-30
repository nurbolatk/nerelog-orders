import React, { useEffect } from 'react'
import './styles/index.css'
import { filterData } from 'webWorker/filterData/workerizedFilterData'
import { useAsync, useCombobox } from 'utils'
import { useVirtual } from 'react-virtual'
import { List } from 'components/molecules'
import { MyMap } from 'components/organisms'

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
  const mapRef = React.useRef()
  console.log({ mapRef })

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
    onSelectedItemChange: ({ selectedItem }) => {
      mapRef.current.panToMarker(selectedItem.id)
    },
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
          {/*<Map markers={data} />*/}
          <MyMap markers={data} ref={mapRef} />
        </div>
      </div>
    </main>
  )
}

export default App
