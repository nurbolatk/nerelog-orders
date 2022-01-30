import cn from 'classnames'
import { DeliveryIcon, PickupIcon } from '../icons'
import * as React from 'react'
import { OrderDescription } from './OrderDescription'

export function OrderListItem({ item, isSelected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'block text-left w-full border border-slate-200 p-2 lg:p-4 rounded-md hover:cursor-pointer',
        { 'border-blue-500': isSelected }
      )}>
      <p className="text-secondary">
        Order No <span className="font-bold">${item.id}</span>
      </p>
      <hr className={cn('my-2 lg:my-4', { 'border-blue-500': isSelected })} />

      <OrderDescription>
        <OrderDescription.Label>Client:</OrderDescription.Label>
        <OrderDescription.Value>{item.client.name}</OrderDescription.Value>
        <OrderDescription.Label>Type:</OrderDescription.Label>
        <OrderDescription.Value className="capitalize flex items-center gap-x-2 lg:block">
          {item.type}
          {item.isPickup ? (
            <PickupIcon className="text-green-500" />
          ) : (
            <DeliveryIcon className="text-blue-500" />
          )}
        </OrderDescription.Value>
      </OrderDescription>

      <hr className={cn('my-2 lg:my-4', { 'border-blue-500': isSelected })} />

      <OrderDescription>
        <OrderDescription.Label>Total:</OrderDescription.Label>
        <OrderDescription.Value>${item.price}</OrderDescription.Value>
      </OrderDescription>
    </button>
  )
}
