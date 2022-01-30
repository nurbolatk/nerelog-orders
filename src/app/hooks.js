import React, { useCallback } from 'react'
import { useVirtual } from 'react-virtual'

function useInputValue(initialValue = '') {
  const [inputValue, setInputValue] = React.useState(initialValue)
  const handleInputChange = useCallback((e) => setInputValue(e.target.value), [])
  const clearInputValue = useCallback(() => setInputValue(''), [])
  return [inputValue, handleInputChange, clearInputValue]
}

function useVirtualList(items) {
  const listRef = React.useRef()

  const rowVirtualizer = useVirtual({
    size: items.length,
    parentRef: listRef,
    estimateSize: React.useCallback(() => 232, []),
    overscan: 10,
  })

  return [listRef, rowVirtualizer]
}

export { useInputValue, useVirtualList }
