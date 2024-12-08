import { expect, test } from 'vitest'
import { solve } from './second'
import { actualInput, exampleInput } from './input'

test('given test input, always return 34', () => {
  const input = exampleInput

  const result = solve(input)

  expect(result).toBe(34)
})

test('given actual input, always return 839', () => {
  const input = actualInput

  const result = solve(input)

  expect(result).toBe(839)
})
