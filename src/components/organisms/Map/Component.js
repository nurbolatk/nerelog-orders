import React, { useImperativeHandle } from 'react'
// Import CSS from Leaflet and plugins.
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
// Import images directly that got missed via the CSS imports above.
import 'leaflet/dist/images/marker-icon-2x.png'
import 'leaflet/dist/images/marker-shadow.png'
import { useCluster, useMap } from './hooks'

function Map({ markers, onMarkerClick }, externalRef) {
  const mapRef = useMap('my-map')
  const { panToMarker } = useCluster(markers, mapRef, onMarkerClick)

  // exposing functionality to the externalRef
  useImperativeHandle(externalRef, () => ({
    panToMarker,
  }))

  return <div id="my-map" className="h-full" />
}

// eslint-disable-next-line no-func-assign
Map = React.memo(React.forwardRef(Map))

export { Map }
