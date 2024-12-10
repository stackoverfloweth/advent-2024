import { expect, test } from 'vitest'
import { solve } from './second'
import { actualInput, exampleInput } from './input'

test('given test input, always return 2858', () => {
  const input = exampleInput

  const result = solve(input)

  expect(result).toBe(2858)
})

test('given actual input, always return 6418529470362', () => {
  const input = actualInput

  const result = solve(input)

  expect(result).toBe(6418529470362)
})
