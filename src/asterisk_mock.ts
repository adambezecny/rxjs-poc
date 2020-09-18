import * as WebSocket from 'ws'


export const delay = (ms: number) => {
	return new Promise(resolve => setTimeout(resolve, ms))
}

export default class AsteriskMock {

    private wssTestInit: any
    private wssSignal: any
    private wssData: any

    // this is mock, for simpplicity we asume one client per WS only!
    private wssSignalClient: any
    private wssDataClient: any

    constructor() {

        this.wssTestInit = new WebSocket.Server({ port: 8000 })
        this.wssSignal = new WebSocket.Server({ port: 8080 })
        this.wssData = new WebSocket.Server({ port: 8081 })

        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const self = this

        this.wssTestInit.on('connection', function connection(ws: any) {
            console.log('wssTestInit: new connection ')
            ws.on('message', function incoming(message: any) {
                if (message === 'test1') {
                    console.log('starting test1')
                    self.test1()
                }
            })
        })

        this.wssSignal.on('connection', function connection(ws: any) {
            console.log('wssSignal: new connection ')
            self.wssSignalClient = ws
            ws.on('message', function incoming(message: any) {
                console.log('wssSignal message received: ' + message)
            })
        })

        this.wssData.on('connection', function connection(ws: any) {
            console.log('wssData: new connection ')
            self.wssDataClient = ws
            ws.on('message', function incoming(message: any) {
                console.log('wssData message received: ' + message)
            })

        })

        console.log('asterick mock initiated')
    }

    private static sendInit(id: string) {
        return JSON.stringify({
            id: id,
            type: 'INIT'
        })
    }

    private static sendHangoff(id: string) {
        return JSON.stringify({
            id: id,
            type: 'HANGOFF'
        })
    }

    private static sendData(id: string, data: string) {
        return JSON.stringify({
            id: id,
            type: 'DATA',
            data: data
        })
    }

    private async test1(): Promise<void> {
        const id = '123'
        await delay(3000)
        this.wssSignalClient.send(AsteriskMock.sendInit(id))
        await delay(2000)
        this.wssDataClient.send(AsteriskMock.sendData(id, 'some voice data'))
        await delay(1000)
        this.wssSignalClient.send(AsteriskMock.sendHangoff(id))
    }
}

