import { expect, test } from 'vitest'
import { solve } from './second'
import { actualInput, exampleInput } from './input'

test('given test input, always returns 31', () => {
  const input = exampleInput

  const result = solve(input)

  expect(result).toBe(31)
})

test('given actual input, always returns 27732508', () => {
  const input = actualInput

  const result = solve(input)

  expect(result).toBe(27732508)
})
