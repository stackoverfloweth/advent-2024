export function solve(input: string): number {
  const parsed = parseInput(input)
  const [left, right] = sortAsc(parsed)

  let difference = 0

  for (let index = 0; index < left.length; index++) {
    difference += Math.abs(right[index] - left[index])
  }

  return difference
}

type ParsedInput = [number[], number[]]

function parseInput(input: string): ParsedInput {
  return input.split('\n').reduce<ParsedInput>((values, line) => {
    const [left, right] = line.split('   ').map((value) => parseInt(value))

    values[0].push(left)
    values[1].push(right)

    return values
  }, [[], []])
}

function sortAsc([left, right]: ParsedInput): ParsedInput {
  return [
    left.sort((valueA, valueB) => valueA - valueB),
    right.sort((valueA, valueB) => valueA - valueB),
  ]
}
