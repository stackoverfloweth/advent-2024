import { expect, test } from 'vitest'
import { solve } from './first'
import { actualInput, exampleInput } from './input'

test.skip('given test input, always return 1928', () => {
  const input = exampleInput

  const result = solve(input)

  expect(result).toBe(1928)
})

test('given actual input, always return Y', () => {
  const input = actualInput

  const result = solve(input)

  expect(result).toBe(0)
})
