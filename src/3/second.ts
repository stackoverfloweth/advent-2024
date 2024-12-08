export function solve(input: string): number {
  const instructions = parse(input)

  let enabled = true
  return instructions.reduce((sum, { instruction, values }) => {
    switch (instruction) {
      case 'do':
        enabled = true
        break
      case 'don\'t':
        enabled = false
        break
      case 'mul':
        if (enabled) {
          sum += values.reduce((product, value) => product * value, 1)
        }
    }

    return sum
  }, 0)
}

type Pause = {
  instruction: 'do' | 'don\'t',
  values: [],
}
type Multiply = {
  instruction: 'mul',
  values: [number, number],
}
type Instruction = Multiply | Pause

function parse(input: string): Instruction[] {
  const pattern = /(mul\(\d{1,3},\d{1,3}\))|(do\(\))|(don't\(\))/g
  const matches = getCaptureGroups(input, pattern)

  return matches.filter((match) => !!match && match.length).map<Instruction>((match) => {
    if (!match) {
      throw new Error('Invalid Regex Match!')
    }

    if (match.startsWith('mul')) {
      return getMultiply(match)
    }

    return getPause(match)
  })
}

export function getCaptureGroups(value: string, pattern: RegExp): (string | undefined)[] {
  const matches = Array.from(value.matchAll(pattern))

  return matches.flatMap(([, ...values]) => values.map((value) => {
    return !!value && value.length ? value : ''
  }))
}

function getMultiply(value: string): Multiply {
  const multiply = /mul\((\d{1,3},\d{1,3})\)/g
  const [values] = getCaptureGroups(value, multiply)
  const [first, second] = values?.split(',').map((value) => parseInt(value)) ?? []

  return {
    instruction: 'mul',
    values: [first, second],
  }
}

function getPause(value: string): Pause {
  const instruction = value.slice(0, -2)
  if (!isPause(instruction)) {
    throw new Error('Invalid Instruction Found!')
  }

  return {
    instruction,
    values: [],
  }
}

function isPause(value: string): value is Pause['instruction'] {
  return ['do', 'don\'t'].includes(value)
}
