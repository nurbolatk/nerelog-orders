import React, { useEffect } from 'react'
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
    <div>
      <h2 className="text-3xl font-bold underline">hi</h2>
      <div>
        <label {...getLabelProps()}>Find a city</label>
        <div {...getComboboxProps()}>
          <input {...getInputProps({ type: 'text' })} />
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
        />
      </div>
    </div>
  )
}

export default App
