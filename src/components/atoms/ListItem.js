import * as React from 'react'
import { useCallback } from 'react'

export function ListItem({ item, isSelected, onClick, measureRef, children, ...props }) {
  const handleItemClick = useCallback(() => {
    onClick(item)
  }, [item, onClick])

  return (
    <li {...props}>
      <div ref={measureRef} className="pb-2">
        {React.cloneElement(children, {
          onClick: handleItemClick,
          item,
          isSelected,
        })}
      </div>
    </li>
  )
}
