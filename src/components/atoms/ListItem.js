import * as React from 'react'
import cn from 'classnames'
import { DeliveryIcon, PickupIcon } from '../icons'
import { useCallback } from 'react'

export function ListItem({ item, isSelected, onClick, measureRef, ...props }) {
  const handleItemClick = useCallback(() => onClick(item), [item, onClick])
  return (
    <li {...props}>
      <div ref={measureRef} className="pb-2">
        <button
          onClick={handleItemClick}
          className={`block text-left w-full border border-slate-200 p-4 rounded-md hover:cursor-pointer
           ${isSelected ? 'border-blue-500' : ''}`}>
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
        </button>
      </div>
    </li>
  )
}
