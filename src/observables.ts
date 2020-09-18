/**
 * https://www.learnrxjs.io/learn-rxjs/operators/combination/merge
 * https://indepth.dev/learn-to-combine-rxjs-sequences-with-super-intuitive-interactive-diagrams/
 *
 */
import { Observable, concat } from 'rxjs'

export type ObservableFunction = (ws: any) => Observable<any>
export type ObservableFunction2 = (ws1: any, ws2: any) => Observable<any>

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

export const NewAsteriskSignalDataConcatObservable: ObservableFunction2 = (wsSingal: any, wsData: any) => {
  const signalObservable = NewAsteriskSignalObservable(wsSingal)
  const dataObservable = NewAsteriskDataObservable(wsData)
  return concat(signalObservable, dataObservable)
}