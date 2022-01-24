import React, { useEffect } from 'react'
import './App.css'
import { filterData } from 'filterData/workerized-filter-data'
import { useAsync, useCombobox } from 'shared/utils'
import { List } from 'shared/ui'
import { useVirtual } from 'react-virtual'

function App() {
  const { data, run } = useAsync()

  useEffect(() => {
    run(filterData())
  }, [run])

  const [inputValue, setInputValue] = React.useState('')
  const listRef = React.useRef()

  const rowVirtualizer = useVirtual({
    size: data.orders.length,
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
    items: data.orders,
    inputValue,
    onInputValueChange: ({ inputValue: newValue }) => setInputValue(newValue),
    onSelectedItemChange: ({ selectedItem }) =>
      alert(selectedItem ? `You selected ${selectedItem.name}` : 'Selection Cleared'),
    itemToString: (item) => (item ? item.name : ''),
    scrollIntoView: () => {},
    onHighlightedIndexChange: ({ highlightedIndex }) =>
      highlightedIndex !== -1 && rowVirtualizer.scrollToIndex(highlightedIndex),
  })

  // console.log('app.jsx', data.orders)
  return (
    <div>
      <div>
        <label {...getLabelProps()}>Find a city</label>
        <div {...getComboboxProps()}>
          <input {...getInputProps({ type: 'text' })} />
          <button onClick={() => selectItem(null)} aria-label="toggle menu">
            &#10005;
          </button>
        </div>
        <List
          items={data.orders}
          getMenuProps={getMenuProps}
          getItemProps={getItemProps}
          highlightedIndex={highlightedIndex}
          selectedItem={selectedItem}
          listRef={listRef}
          virtualRows={rowVirtualizer.virtualItems}
          totalHeight={rowVirtualizer.totalSize}
        />
      </div>
    </div>
  )
}

export default App
