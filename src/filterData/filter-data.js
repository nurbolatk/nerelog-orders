import orders from 'data/2000/NeRelog_apps.json'
import clients from 'data/2000/NeRelog_clients.json'

function filterData(event) {
  const { id } = event.data
  self.postMessage({
    id,
    payload: {
      orders,
      clients,
    },
  })
}
self.onmessage = filterData
