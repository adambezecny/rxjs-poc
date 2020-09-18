/**
 * https://blog.jiayihu.net/testing-observables-in-rxjs6/
 * https://rxjs-dev.firebaseapp.com/guide/testing/internal-marble-tests
 * https://medium.com/@bencabanes/marble-testing-observable-introduction-1f5ad39231c
 * https://medium.com/angular-in-depth/how-to-test-observables-a00038c7faad
 */
import 'mocha'
import { expect } from 'chai'
import { TestScheduler } from 'rxjs/testing'
import { concat } from 'rxjs'

function assertDeepEqual(actual: any, expected: any) {
	// for debugging only
	/*console.log('actual:')
	console.log(JSON.stringify(actual))
	console.log('expected:')
	console.log(JSON.stringify(expected))*/
	expect(actual).deep.equal(expected)
}

describe('RXJS', function () {

	let testScheduler: TestScheduler

	beforeEach(() => {
		testScheduler = new TestScheduler(assertDeepEqual)
	  })

	it('sample', () => {
		expect(1).to.equal(1)
	})

	it('test1', () => {
		testScheduler.run(helpers => {
		  const { cold, expectObservable } = helpers
		  const e1 =  cold('-a--b--c---|')
		  expectObservable(e1).toBe('-a--b--c---|')
		})
	})

	it('test2', () => {
		testScheduler.run(helpers => {
		  const { cold, expectObservable } = helpers
		  const e1 =  cold('-a--b--c---|')
		  const e2 =  cold(           '---------d-|')
		  const expected = '-a--b--c------------d-|'

		  const result = concat(e1, e2, testScheduler)

		  expectObservable(result).toBe(expected)
		})
	})

	it('test3', () => {
		testScheduler.run(helpers => {
		  const { cold, expectObservable } = helpers
		  const e1 =   cold('--a--b-|')
		  const e2 =   cold(       '--x---y--|')
		  const expected =  '--a--b---x---y--|'

		  const result = concat(e1, e2, testScheduler)
		  expectObservable(result).toBe(expected)
		})
	})
})