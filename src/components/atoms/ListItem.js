import * as React from 'react'

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
    <li {...itemProps} className="pb-2">
      <div ref={measureRef} className="border border-slate-200 p-4 rounded-md">
        <p className="text-secondary">
          Order No <span className="font-bold">${item.id}</span>
        </p>
        <hr className="my-4" />
        <div className="grid grid-cols-2">
          <p className="text-zinc-600">Client:</p>
          <p>{item.client.name}</p>
          <p className="text-zinc-600">Type:</p>
          <p className="capitalize">
            {item.type}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-truck"
              viewBox="0 0 16 16">
              <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-box-seam"
              viewBox="0 0 16 16">
              <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2l-2.218-.887zm3.564 1.426L5.596 5 8 5.961 14.154 3.5l-2.404-.961zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z" />
            </svg>
          </p>
        </div>
        <hr className="my-4" />

        <div className="grid grid-cols-2">
          <p>Total:</p>
          <p>${item.price}</p>
        </div>
      </div>
    </li>
  )
}
