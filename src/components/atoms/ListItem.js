import * as React from 'react'
import cn from 'classnames'
import { DeliveryIcon, PickupIcon } from '../icons'

export function ListItem({
  getItemProps,
  item,
  index,
  isHighlighted,
  isSelected,
  style,
  measureRef,
  ...props
}) {
  const itemProps = {
    ...getItemProps({
      index,
      item,
      style: {
        ...style,
      },
      ...props,
    }),
  }
  console.log({ isHighlighted, isSelected })

  return (
    <li {...itemProps}>
      <div ref={measureRef} className="pb-2">
        <div
          className={`border border-slate-200 p-4 rounded-md ${
            isHighlighted ? 'cursor-pointer' : ''
          } ${isSelected ? 'border-blue-500' : ''}`}>
          <p className="text-secondary">
            Order No <span className="font-bold">${item.id}</span>
          </p>
          <hr className={cn('my-4', { 'border-blue-500': isSelected })} />
          <div className="grid grid-cols-3">
            <p className="text-zinc-600 col-span-1">Client:</p>
            <p className="col-span-2">{item.client.name}</p>
            <p className="text-zinc-600 col-span-1">Type:</p>
            <p className="capitalize col-span-2">
              {item.type}
              {item.isPickup ? (
                <PickupIcon className="text-green-500" />
              ) : (
                <DeliveryIcon className="text-blue-500" />
              )}
            </p>
          </div>
          <hr className={cn('my-4', { 'border-blue-500': isSelected })} />

          <div className="grid grid-cols-3">
            <p>Total:</p>
            <p>${item.price}</p>
          </div>
        </div>
      </div>
    </li>
  )
}
