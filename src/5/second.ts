export function solve(input: string): number {
  const { rules, manuals } = parse(input)

  return manuals.reduce((sum, manual) => {
    if (!isValidManual(manual, rules)) {
      const corrected = sortPages(manual, rules)

      sum += findCenterPage(corrected)
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

function sortPages(manual: Manual, rules: Rule[]): Manual {
  const left = []
  const right = []
  const resultArray: Manual = []

  const pivot = manual.shift()

  if (pivot === undefined) {
    return resultArray
  }

  for (const page of manual) {
    // const diff =

    if (compare(page, pivot, rules) < 0) {
      left.push(page)
    } else {
      right.push(page)
    }
  };

  return resultArray.concat(sortPages(left, rules), pivot, sortPages(right, rules))
}

function compare(page: number, pivot: number, rules: Rule[]): number {
  for (const [before, after] of rules) {
    if (before === page && after == pivot) {
      return -1
    }

    if (before === pivot && after === page) {
      return 1
    }
  }

  return 0
}
