import { expect, test } from 'vitest'
import { solve } from './second'
import { actualInput, exampleInput } from './input'

test('given test input, always return 48', () => {
  const input = exampleInput

  const result = solve(input)

  expect(result).toBe(48)
})

test('given actual input, always return 93465710', () => {
  const input = actualInput

  const result = solve(input)

  expect(result).toBe(93465710)
})
