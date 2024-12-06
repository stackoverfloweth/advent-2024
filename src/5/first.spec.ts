import { expect, test } from 'vitest'
import { solve } from './first'
import { actualInput, exampleInput } from './input'

test('given test input, always return 143', () => {
  const input = exampleInput

  const result = solve(input)

  expect(result).toBe(143)
})

test('given actual input, always return 6041', () => {
  const input = actualInput

  const result = solve(input)

  expect(result).toBe(6041)
})
