import { expect, test } from 'vitest'
import { solve } from './second'
import { actualInput, exampleInput } from './input'

test('given test input, always return 11387', () => {
  const input = exampleInput

  const result = solve(input)

  expect(result).toBe(11387)
})

test.skip('given actual input, always return 124060392153684', () => {
  const input = actualInput

  const result = solve(input)

  expect(result).toBe(124060392153684)
})
