import { expect, test } from 'vitest'
import { solve } from './second'
import { actualInput, exampleInput } from './input'

test('given test input, always return 81', () => {
  const input = exampleInput

  const result = solve(input)

  expect(result).toBe(81)
})

test('given actual input, always return 1324', () => {
  const input = actualInput

  const result = solve(input)

  expect(result).toBe(1324)
})
