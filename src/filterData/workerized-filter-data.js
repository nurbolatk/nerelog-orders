import Wrapper from 'workerize/PromiseWorker'

const worker = new Worker(new URL('./filter-data.js', import.meta.url))

const promiseWorker = new Wrapper(worker)

export function filterData(query = '') {
  return promiseWorker.sendMsg(query)
}
