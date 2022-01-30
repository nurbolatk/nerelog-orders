import * as React from 'react'
import { ListItem } from 'components/atoms'

const getVirtualRowStyles = ({ size, start }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: size,
  transform: `translateY(${start}px)`,
})

export function List({
  items,
  listRef,
  virtualRows,
  selectedItem,
  onItemClick,
  totalHeight,
  children,
  ...props
}) {
  return (
    <ul {...props} ref={listRef}>
      <li style={{ height: totalHeight }} />
      {virtualRows.map(({ index, size, start, measureRef }) => {
        const item = items[index]
        if (!item) return null
        return (
          <ListItem
            key={item.id}
            item={item}
            size={size}
            onClick={onItemClick}
            measureRef={measureRef}
            isSelected={selectedItem?.id === item.id}
            style={getVirtualRowStyles({ size, start })}>
            {children}
          </ListItem>
        )
      })}
    </ul>
  )
}
