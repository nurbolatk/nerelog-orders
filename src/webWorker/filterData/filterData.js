import orders from 'data/2000/NeRelog_apps.json'
import clients from 'data/2000/NeRelog_clients.json'

function parseData() {
  const clientsMapped = new Map()
  for (const client of clients) {
    clientsMapped.set(client.id, client)
  }
  return orders.map((order) => {
    const coords = [order.coords.lat, order.coords.long]
    const isPickup = order.type === 'pickup'
    return {
      ...order,
      coords,
      isPickup,
      client: clientsMapped.get(order.client_id),
    }
  })
}

function filterData(event) {
  const { id } = event.data
  const ordersWithClients = parseData()
  self.postMessage({
    id,
    payload: ordersWithClients,
  })
}
self.onmessage = filterData
