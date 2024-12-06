import { expect, test } from 'vitest'
import { solve } from './second'
import { actualInput, exampleInput } from './input'

test('given test input, always return 123', () => {
  const input = exampleInput

  const result = solve(input)

  expect(result).toBe(123)
})

test('given actual input, always return 4884', () => {
  const input = actualInput

  const result = solve(input)

  expect(result).toBe(4884)
})
