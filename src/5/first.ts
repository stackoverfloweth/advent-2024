export function solve(input: string): number {
  const { rules, manuals } = parse(input)

  return manuals.reduce((sum, manual) => {
    if (isValidManual(manual, rules)) {
      sum += findCenterPage(manual)
    }

    return sum
  }, 0)
}

type Rule = [before: number, after: number]
type Manual = number[]
function parse(input: string): { rules: Rule[], manuals: Manual[] } {
  const [rulesInput, manualsInput] = input.split('\n\n')

  const rules = rulesInput.split('\n').map(parseRule)
  const manuals = manualsInput.split('\n').map(parseManual)

  return { rules, manuals }
}

function parseRule(input: string): Rule {
  const [before, after] = input.split('|').map(Number)

  return [before, after]
}

function parseManual(input: string): Manual {
  return input.split(',').map(Number)
}

function isValidManual(manual: Manual, rules: Rule[]): boolean {
  return manual.every((page, index) => rules
    .filter((rule) => rule.includes(page))
    .every((rule) => rulePasses(rule, manual, index)),
  )
}

function rulePasses([before, after]: Rule, manual: Manual, index: number): boolean {
  const pagesBefore = manual.slice(0, index)
  const page = manual[index]
  const pagesAfter = manual.slice(index + 1)

  if (page === before) {
    return !pagesBefore.includes(after)
  }

  if (page === after) {
    return !pagesAfter.includes(before)
  }

  throw new Error('Unexpected Page Found!')
}

function findCenterPage(manual: Manual): number {
  return manual[Math.floor(manual.length / 2)]
}
