import { expect, test } from 'vitest'
import { solve } from './second'
import { actualInput, exampleInput } from './input'

test('given test input, always return 6', () => {
  const input = exampleInput

  const result = solve(input)

  expect(result).toBe(6)
})

test.skip('given actual input, always return 1633', () => {
  const input = actualInput

  const result = solve(input)

  expect(result).toBe(1633)
})
