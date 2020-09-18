import  AsteriskMock from './asterisk_mock'
import { delay } from './asterisk_mock'
import { NewAsteriskSignalObservable, NewAsteriskDataObservable } from './observables'
import WebSocket = require('ws')

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const asterisk = new AsteriskMock()
const wsTest = new WebSocket('ws://localhost:8000')
const wsSignal = new WebSocket('ws://localhost:8080')
const wsData = new WebSocket('ws://localhost:8081')

const AsteriskSignalObservable = NewAsteriskSignalObservable(wsSignal)
const AsteriskDataObservable = NewAsteriskDataObservable(wsData)

AsteriskSignalObservable.subscribe({
  next(msg: string) {
    console.log('client: wsSignal message ' + msg)
  }
})

AsteriskDataObservable.subscribe({
  next(msg: string) {
    console.log('client: wsData message ' + msg)
  }
})

async function test1() {
  console.log('starting test1')
  await delay(1000) // we must wait here otherwise we will get WebSocket is not open: readyState 0
  wsTest.send('test1')
}

test1()

