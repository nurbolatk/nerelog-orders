import React, { useEffect, useImperativeHandle, useRef } from 'react'
// Import CSS from Leaflet and plugins.
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
// Import images directly that got missed via the CSS imports above.
import 'leaflet/dist/images/marker-icon-2x.png'
import 'leaflet/dist/images/marker-shadow.png'
// Import JS from Leaflet and plugins.
import * as L from 'leaflet'
import { MarkerClusterGroup } from 'leaflet.markercluster/src'

const icon = L.divIcon({
  className: 'border-0 bg-transparent',
  html: '<div class="h-4 w-4 rounded-full bg-red-500"></div>',
})

function MyMap({ markers }, externalRef) {
  const mapRef = useRef()
  const markersRef = useRef()

  function panToMarker(index) {
    const theMarker = markersRef.current.get(index)
    if (theMarker) {
      const coords = theMarker.getLatLng()
      mapRef.current.setView(coords, 18)
      setTimeout(() => {
        if (theMarker._map === null) {
          mapRef.current.openPopup(theMarker._popup)
        } else {
          theMarker.openPopup()
        }
      }, 200)
    }
  }

  useImperativeHandle(externalRef, () => ({
    panToMarker,
  }))

  useEffect(() => {
    const instance = new L.Map('my-map', {
      center: [43.238949, 76.889709],
      zoom: 13,
      maxZoom: 18,
    })

    const tileLayer = new L.TileLayer(
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

  useEffect(() => {
    if (mapRef.current !== undefined) {
      const cluster = new MarkerClusterGroup({
        disableClusteringAtZoom: 17,
      })

      markersRef.current = markers.reduce((markersMap, order) => {
        const marker = new L.Marker(order.coords, {
          icon,
        })
        marker.bindPopup(`
          <p class="text-secondary">
            Order No <span class="font-bold">${order.id}</span>
          </p>
          <p>${order.client.name}</p>
          <p>$${order.price}</p>
        `)

        cluster.addLayer(marker)
        markersMap.set(order.id, marker)
        return markersMap
      }, new Map())

      cluster.on('click', (a) => {
        console.log('cluster clicked')
        a.layer.openPopup(a.layer.getLatLng())
      })
      cluster.addTo(mapRef.current)

      return () => cluster.removeFrom(mapRef.current)
    }
  }, [markers])

  return <div id="my-map" className="h-full" />
}
// eslint-disable-next-line no-func-assign
MyMap = React.memo(React.forwardRef(MyMap))

export { MyMap }
