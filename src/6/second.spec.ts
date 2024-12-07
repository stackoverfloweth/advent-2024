import { expect, test } from 'vitest'
import { solve } from './second'
import { actualInput, exampleInput } from './input'

test('given test input, always return 6', () => {
  const input = exampleInput

  const result = solve(input)

  expect(result).toBe(6)
})

test('given actual input, always return Y', () => {
  const input = actualInput

  const result = solve(input)

  // 1607 too low
  // 1745 too high
  expect(result).toBe(0)
})
