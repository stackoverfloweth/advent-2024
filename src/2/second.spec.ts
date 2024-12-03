import { expect, test } from 'vitest'
import { solve } from './second'
import { actualInput, exampleInput } from './input'

test('given test input, always return 4', () => {
  const input = exampleInput

  const result = solve(input)

  expect(result).toBe(4)
})

test('given actual input, always return 400', () => {
  const input = actualInput

  const result = solve(input)

  expect(result).toBe(400)
})
