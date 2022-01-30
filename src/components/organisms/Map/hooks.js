import { useEffect, useRef } from 'react'
import * as L from 'leaflet'
import { MarkerClusterGroup } from 'leaflet.markercluster/src'
import { DeliveryPinIcon } from 'components/icons'

const center = [process.env.REACT_APP_MAP_CENTER_LAT, process.env.REACT_APP_MAP_CENTER_LNG]
const accessToken = process.env.REACT_APP_ACCESS_TOKEN

function useMap(id) {
  const mapRef = useRef()

  useEffect(() => {
    if (!mapRef.current) {
      const instance = new L.Map(id, {
        center,
        zoom: 13,
        maxZoom: 18,
      })

      const tileLayer = new L.TileLayer(
        `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${accessToken}`,
        {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: 'mapbox/streets-v11',
          tileSize: 512,
          zoomOffset: -1,
          accessToken,
        }
      )
      tileLayer.addTo(instance)
      mapRef.current = instance
    }
  }, [id])

  return mapRef
}

function useCluster(markers, mapRef, onMarkerClick) {
  const markersRef = useRef()

  function panToMarker(index) {
    const theMarker = markersRef.current.get(index)
    if (theMarker) {
      const coords = theMarker.getLatLng()
      mapRef.current.setView(coords, 18)
      setTimeout(() => {
        theMarker.openPopup()
      }, 200)
    }
  }

  useEffect(() => {
    if (mapRef.current !== undefined) {
      // create cluster
      const cluster = new MarkerClusterGroup({
        disableClusteringAtZoom: 17,
      })

      // add markers to cluster and save to markersRef
      markersRef.current = markers.reduce((markersMap, order, index) => {
        const marker = new L.Marker(order.coords, {
          icon: DeliveryPinIcon(order.isPickup),
          order,
          index,
        })

        // create popup
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

      // on marker click
      cluster.on('click', (a) => {
        a.layer.openPopup(a.layer.getLatLng())
        onMarkerClick?.(a.layer.options.order, a.layer.options.index)
      })
      // on marker hover
      cluster.on('mouseover', (a) => {
        a.layer.openPopup(a.layer.getLatLng())
      })
      // on marker hover
      cluster.on('mouseout', (a) => {
        a.layer.closePopup()
      })

      cluster.addTo(mapRef.current)
      const mapRefValue = mapRef.current
      return () => cluster.removeFrom(mapRefValue)
    }
    // multiple rerenders if we include onMarkerClick, seems to be a bug of react-virtual
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapRef, markers])

  return { markersRef, panToMarker }
}

export { useMap, useCluster }
