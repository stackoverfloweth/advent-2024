import { expect, test } from 'vitest'
import { solve } from './first'
import { actualInput, exampleInput } from './input'

test('given test input, always return 14', () => {
  const input = exampleInput

  const result = solve(input)

  expect(result).toBe(14)
})

test('given actual input, always return 252', () => {
  const input = actualInput

  const result = solve(input)

  expect(result).toBe(252)
})
