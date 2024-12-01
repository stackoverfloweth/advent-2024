export function solve(input: string): number {
  const [left, right] = parseInput(input)

  return left.reduce((sum, target) => sum + getSimilarityScore(target, right), 0)
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

function getSimilarityScore(target: number, group: number[]): number {
  const occurrences = group.filter((member) => member === target).length

  return occurrences * target
}
