import { expect, test } from 'vitest'
import { solve } from './first'
import { actualInput, exampleInput } from './input'

test('given test input, always return 41', () => {
  const input = exampleInput

  const result = solve(input)

  expect(result).toBe(41)
})

test('given actual input, always return 4982', () => {
  const input = actualInput

  const result = solve(input)

  expect(result).toBe(4982)
})
