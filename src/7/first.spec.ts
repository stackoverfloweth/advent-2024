import { expect, test } from 'vitest'
import { solve } from './first'
import { actualInput, exampleInput } from './input'

test('given test input, always return 3749', () => {
  const input = exampleInput

  const result = solve(input)

  expect(result).toBe(3749)
})

test('given actual input, always return 2654749936343', () => {
  const input = actualInput

  const result = solve(input)

  expect(result).toBe(2654749936343)
})
