import { expect, test } from 'vitest'
import { solve } from './first'
import { actualInput, exampleInput } from './input'

test('given test input, always return 36', () => {
  const input = exampleInput

  const result = solve(input)

  expect(result).toBe(36)
})

test('given actual input, always return 566', () => {
  const input = actualInput

  const result = solve(input)

  expect(result).toBe(566)
})
