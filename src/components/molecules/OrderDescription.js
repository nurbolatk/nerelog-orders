import React from 'react'
import cn from 'classnames'

export function OrderDescription({ children }) {
  return <div className="grid grid-cols-3">{children}</div>
}

function Label({ className, children }) {
  return <p className={cn(className, 'text-zinc-600 col-span-1')}>{children}</p>
}

function Value({ className, children }) {
  return <p className={cn(className, 'col-span-2')}>{children}</p>
}
OrderDescription.Label = Label
OrderDescription.Value = Value
