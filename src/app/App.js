import React, { useEffect } from 'react'
import './styles/index.css'
import { filterData } from 'webWorker/filterData/workerizedFilterData'
import { useAsync } from 'utils'
import { useVirtual } from 'react-virtual'
import { List } from 'components/molecules'
import { MyMap } from 'components/organisms'
import { useCombobox } from 'downshift'

function App() {
  const { data, run } = useAsync({
    data: [],
    status: 'pending',
  })

  const [inputValue, setInputValue] = React.useState('contract')
  console.log({ data, inputValue })

  useEffect(() => {
    run(filterData(inputValue))
  }, [inputValue, run])

  const listRef = React.useRef()
  const mapRef = React.useRef()

  const rowVirtualizer = useVirtual({
    size: data.length,
    parentRef: listRef,
    estimateSize: React.useCallback(() => 232, []),
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
    onSelectedItemChange: ({ selectedItem }) => mapRef.current.panToMarker(selectedItem.id),
    itemToString: (item) => (item ? item.client.name : ''),
    scrollIntoView: () => {},
    onHighlightedIndexChange: ({ highlightedIndex }) =>
      highlightedIndex !== -1 && rowVirtualizer.scrollToIndex(highlightedIndex),
  })

  return (
    <main className="p-4">
      <div className="card max-w-7xl mx-auto grid grid-cols-3 gap-8 overflow-hidden">
        <div className="col-span-1">
          <label {...getLabelProps()}>Find an order</label>
          <form {...getComboboxProps()} className="relative mb-4">
            <input {...getInputProps({ type: 'text' })} className="input !pr-7" />
            <button
              type="button"
              onClick={() => selectItem(null)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2">
              &#10005;
            </button>
          </form>
          <List
            items={data}
            getMenuProps={getMenuProps}
            getItemProps={getItemProps}
            highlightedIndex={highlightedIndex}
            selectedItem={selectedItem}
            listRef={listRef}
            virtualRows={rowVirtualizer.virtualItems}
            totalHeight={rowVirtualizer.totalSize}
            className="relative overflow-y-auto h-[80vh]"
          />
        </div>
        <div className="relative col-span-2 -m-4 overflow-hidden">
          {/*<Map markers={data} />*/}
          <MyMap markers={data} ref={mapRef} />
        </div>
      </div>
    </main>
  )
}

export default App
