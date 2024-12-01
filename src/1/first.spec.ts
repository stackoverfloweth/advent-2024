import { expect, test } from 'vitest'
import { solve } from './first'
import { actualInput, exampleInput } from './input'

test('given test input, always returns 11', () => {
  const input = exampleInput

  const result = solve(input)

  expect(result).toBe(11)
})

test('given actual input, always returns 765748', () => {
  const input = actualInput

  const result = solve(input)

  expect(result).toBe(765748)
})
