import { expect, test } from 'vitest'
import { solve } from './first'
import { actualInput, exampleInput } from './input'

test('given test input, always return 1928', () => {
  const input = exampleInput

  const result = solve(input)

  expect(result).toBe(1928)
})

test.skip('given actual input, always return 6395800119709', () => {
  const input = actualInput

  const result = solve(input)

  expect(result).toBe(6395800119709)
})
