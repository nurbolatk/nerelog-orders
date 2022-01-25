import * as React from 'react'

export function ListItem({
  getItemProps,
  item,
  index,
  isHighlighted,
  isSelected,
  style,
  ...props
}) {
  const itemProps = {
    ...getItemProps({
      index,
      item,
      style: {
        backgroundColor: isHighlighted ? 'lightgray' : 'inherit',
        fontWeight: isSelected ? 'bold' : 'normal',
        ...style,
      },
      ...props,
    }),
  }

  return <li {...itemProps} />
}
