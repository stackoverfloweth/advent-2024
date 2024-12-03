import { expect, test } from 'vitest'
import { solve } from './first'
import { actualInput, exampleInput } from './input'

test('given test input, always return 161', () => {
  const input = exampleInput

  const result = solve(input)

  expect(result).toBe(161)
})

test('given actual input, always return 166630675', () => {
  const input = actualInput

  const result = solve(input)

  expect(result).toBe(166630675)
})
