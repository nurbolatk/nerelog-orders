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
  getMenuProps,
  getItemProps,
  highlightedIndex,
  selectedItem,
  listRef,
  virtualRows,
  totalHeight,
}) {
  return (
    <ul {...getMenuProps({ ref: listRef })}>
      <li style={{ height: totalHeight }} />
      {virtualRows.map(({ index, size, start }) => {
        const item = items[index]
        if (!item) return null
        return (
          <ListItem
            key={item.id}
            getItemProps={getItemProps}
            item={item}
            index={index}
            isSelected={selectedItem?.id === item.id}
            isHighlighted={highlightedIndex === index}
            style={getVirtualRowStyles({ size, start })}>
            {item.type}
          </ListItem>
        )
      })}
    </ul>
  )
}
