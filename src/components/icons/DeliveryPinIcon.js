import React from 'react'
import * as L from 'leaflet'
import { renderToString } from 'react-dom/server'
import { DeliveryIcon } from './DeliveryIcon'
import cn from 'classnames'
import { PickupIcon } from './PickupIcon'

const DeliveryPinIcon = (isPickup = false) =>
  L.divIcon({
    className: 'border-0 bg-transparent',
    html: renderToString(
      <div
        className={cn('h-6 w-6 flex items-center justify-center rounded-full ', {
          'bg-green-500': isPickup,
          'bg-blue-500': !isPickup,
        })}>
        {isPickup ? <PickupIcon /> : <DeliveryIcon />}
      </div>
    ),
    iconAnchor: [12, 12],
    popupAnchor: [0, -6],
  })
export { DeliveryPinIcon }
