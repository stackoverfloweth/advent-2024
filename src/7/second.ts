type Possibility = { value: number, operation: '+' | '*' | '||' | null }[]
type Equation = { solution: number, possibilities: Possibility[] }

export function solve(input: string): number {
  const equations = getEquations(input)

  return equations.reduce((sum, equation) => {
    if (isFeasible(equation)) {
      sum += equation.solution
    }

    return sum
  }, 0)
}

function getEquations(input: string): Equation[] {
  return input
    .split('\n')
    .flatMap((line) => {
      const [solution, inputs] = line.split(':')
      const parts = inputs.trim()
        .split(' ')
        .map(Number)

      return {
        solution: Number(solution),
        possibilities: getPossibilities(parts),
      }
    })
}

function getPossibilities(input: number[]): Possibility[] {
  return input.reduce<Possibility[]>((possibilities, value) => {
    if (possibilities.length === 0) {
      return [[{ value, operation: null }]]
    }

    return possibilities.flatMap((previous) => [
      [
        ...previous,
        { value, operation: '+' },
      ],
      [
        ...previous,
        { value, operation: '*' },
      ],
      [
        ...previous,
        { value, operation: '||' },
      ],
    ])
  }, [])
}

function isFeasible(equation: Equation): boolean {
  return equation.possibilities.some((possibility) => {
    return getAnswer(possibility) === equation.solution
  })
}

function getAnswer(possibility: Possibility): number {
  const results = possibility.reduce((answer, part) => {
    switch (part.operation) {
      case '+':
        return answer + part.value
      case '*':
        return answer * part.value
      case '||':
        return Number(`${answer}${part.value}`)
      case null:
        return part.value
      default:
        return part.operation satisfies never
    }
  }, 0)

  return results
}
