// Import CSS from Leaflet and plugins.
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
// Import images directly that got missed via the CSS imports above.
import 'leaflet/dist/images/marker-icon-2x.png'
import 'leaflet/dist/images/marker-shadow.png'
// Import JS from Leaflet and plugins.
import { Marker, divIcon } from 'leaflet'
import { MarkerClusterGroup } from 'leaflet.markercluster/src'

import { MapContainer, TileLayer, MapConsumer } from 'react-leaflet'
import React, { useRef } from 'react'

const icon = divIcon({
  className: 'border-0 bg-transparent',
  html: '<div class="h-4 w-4 rounded-full bg-red-500"></div>',
})

function Map({ markers }) {
  const markersRef = useRef([])
  return (
    <MapContainer center={[43.238949, 76.889709]} zoom={13} className="h-[80vh]" maxZoom={17}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapConsumer>
        {(map) => {
          const cluster = new MarkerClusterGroup({
            disableClusteringAtZoom: 17,
          })
          //     {
          //   iconCreateFunction: () => {
          //     return icon
          //   },
          // }
          markersRef.current = markers.map((order) => {
            const coords = [order.coords.lat, order.coords.long]
            const marker = new Marker(coords, {
              icon,
            })
            marker.bindPopup('<p>Hello world!<br />This is a nice popup.</p>')
            cluster.addLayer(marker)
            return marker
          })
          cluster.on('click', (a) => {
            a.layer.openPopup(a.layer.getLatLng())
          })

          cluster.addTo(map)
          return (
            <div className="absolute top-0 right-0 z-[40000]">
              <button
                className="w-6 h-6 bg-amber-500"
                onClick={() => {
                  const index = Math.floor(Math.random() * 2000)
                  map.setView(markersRef.current[index].getLatLng(), 18)
                  markersRef.current[index].openPopup()
                }}>
                hi
              </button>
            </div>
          )
        }}
      </MapConsumer>
    </MapContainer>
  )
}
// eslint-disable-next-line no-func-assign
Map = React.memo(Map)
export { Map }
