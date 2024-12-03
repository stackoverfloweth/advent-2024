import { expect, test } from 'vitest'
import { solve } from './first'
import { actualInput, exampleInput } from './input'

test('given test input, always return 2', () => {
  const input = exampleInput

  const result = solve(input)

  expect(result).toBe(2)
})

test('given actual input, always return 334', () => {
  const input = actualInput

  const result = solve(input)

  expect(result).toBe(334)
})
