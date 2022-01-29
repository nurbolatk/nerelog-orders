import React, { useEffect, useImperativeHandle, useRef } from 'react'
// Import CSS from Leaflet and plugins.
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
// Import images directly that got missed via the CSS imports above.
import 'leaflet/dist/images/marker-icon-2x.png'
import 'leaflet/dist/images/marker-shadow.png'
// Import JS from Leaflet and plugins.
import { Map, TileLayer } from 'leaflet'

function MyMap({ markers }, externalRef) {
  const containerRef = useRef()
  const mapRef = useRef()

  function panToMarker(index) {
    console.log(index)
    mapRef.current.setView([43.24, 76.89], 18)
    // markersRef.current[index].openPopup()
  }

  useImperativeHandle(externalRef, () => ({
    panToMarker,
  }))

  useEffect(() => {
    const instance = new Map('my-map', {
      center: [43.238949, 76.889709],
      zoom: 13,
      maxZoom: 18,
    })

    const tileLayer = new TileLayer(
      'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibnVyYm9sYXRrIiwiYSI6ImNreXp2bHhobjBpOW0yb28xNDJzeTBrcW4ifQ.02IOXMz2XFrp1Y2pooHqpQ',
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
          'pk.eyJ1IjoibnVyYm9sYXRrIiwiYSI6ImNreXp2bHhobjBpOW0yb28xNDJzeTBrcW4ifQ.02IOXMz2XFrp1Y2pooHqpQ',
      }
    )
    tileLayer.addTo(instance)
    mapRef.current = instance
  }, [])
  console.log({ containerRef, mapRef, l: markers.length })

  return (
    <div id="my-map" className="h-[88vh]">
      hi
    </div>
  )
}
// eslint-disable-next-line no-func-assign
MyMap = React.memo(React.forwardRef(MyMap))

export { MyMap }
