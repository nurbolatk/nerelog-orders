import Wrapper from 'webWorker/PromiseWorker'

const worker = new Worker(new URL('./filterData.js', import.meta.url))

const promiseWorker = new Wrapper(worker)

export function filterData(query = '') {
  return promiseWorker.sendMsg(query)
}
