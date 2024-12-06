import { expect, test } from 'vitest'
import { solve } from './first'
import { actualInput, exampleInput } from './input'

test('given test input, always return 18', () => {
  const input = exampleInput

  const result = solve(input)

  expect(result).toBe(18)
})

test('given actual input, always return 2685', () => {
  const input = actualInput

  const result = solve(input)

  expect(result).toBe(2685)
})
