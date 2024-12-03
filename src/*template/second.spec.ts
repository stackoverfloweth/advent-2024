import { expect, test } from 'vitest'
import { solve } from './second'
import { actualInput, exampleInput } from './input'

test('given test input, always return X', () => {
  const input = exampleInput

  const result = solve(input)

  expect(result).toBe(input)
})

test.skip('given actual input, always return Y', () => {
  const input = actualInput

  const result = solve(input)

  expect(result).toBe(input)
})
