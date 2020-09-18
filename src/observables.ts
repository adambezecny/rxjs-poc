import { Observable } from 'rxjs'

export type ObservableFunction = (ws: any) => Observable<any>

export const NewAsteriskSignalObservable: ObservableFunction = ws => new Observable(subscriber => {
  ws.on('message', (message: any) => {
    subscriber.next(message)
  })
})

export const NewAsteriskDataObservable: ObservableFunction = ws => new Observable(subscriber => {
  ws.on('message', (message: any) => {
    subscriber.next(message)
  })
})