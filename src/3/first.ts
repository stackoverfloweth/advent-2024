export function solve(input: string): number {
  const muls = parse(input)

  return muls.reduce((sum, [first, second]) => {
    return sum + first * second
  }, 0)
}

type Mul = [number, number]
function parse(input: string): Mul[] {
  const pattern = /mul\((\d{1,3},\d{1,3})\)/g
  const matches = getCaptureGroups(input, pattern)

  return matches.map((match) => {
    const [first, second] = match?.split(',').map((value) => parseInt(value)) ?? []

    return [first, second]
  })
}

export function getCaptureGroups(value: string, pattern: RegExp): (string | undefined)[] {
  const matches = Array.from(value.matchAll(pattern))

  return matches.flatMap(([, ...values]) => values.map((value) => {
    return !!value && value.length ? value : ''
  }))
}
