import { expect, test } from 'vitest'
import { solve } from './second'
import { actualInput, exampleInput } from './input'

test('given test input, always return 9', () => {
  const input = exampleInput

  const result = solve(input)

  expect(result).toBe(9)
})

test('given actual input, always return 2048', () => {
  const input = actualInput

  const result = solve(input)

  expect(result).toBe(2048)
})
