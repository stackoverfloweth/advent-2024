export function solve(input: string): number {
  const reports = getReports(input)

  return reports.reduce((sum, report) => {
    if (getReportIsSafe(report)) {
      return sum + 1
    }

    return sum
  }, 0)
}

type Report = (number | undefined)[]
type Direction = 'asc' | 'desc' | undefined

function getReports(input: string): Report[] {
  return input.split('\n').map(getLevels)
}

function getLevels(report: string): number[] {
  return report.split(' ').map((level) => parseInt(level))
}

export function getReportIsSafe(report: Report): boolean {
  return checkReportPermutations(report)
}

export function checkReport(report: Report): boolean {
  for (let index = 0; index < report.length; index++) {
    if (!checkLevel(index, report)) {
      return false
    }
  }

  return true
}

function checkReportPermutations(report: Report): boolean {
  for (let index = 0; index < report.length; index++) {
    const reportWithoutIndex = getReportWithoutIndex(report, index)
    if (checkReport(reportWithoutIndex)) {
      return true
    }
  }

  return false
}

function getReportWithoutIndex(report: Report, index: number): Report {
  return report.slice(0, index).concat(report.slice(index + 1))
}

function checkLevel(index: number, report: Report): boolean {
  const previous = report[index - 1]
  const level = report[index]
  const next = report[index + 1]

  if (previous === undefined || level === undefined || next === undefined) {
    return true
  }

  if (!isValidDiff(previous, level) || !isValidDiff(level, next)) {
    return false
  }

  if (getDirection(previous, level) !== getDirection(level, next)) {
    return false
  }

  return true
}

function isValidDiff(previous: number, level: number): boolean {
  const difference = getDifference(previous, level)
  return [1, 2, 3].includes(difference)
}

function getDifference(previous: number, level: number): number {
  return Math.abs(previous - level)
}

function getDirection(previous: number, level: number): Direction {
  if (previous === level) {
    return undefined
  }

  return previous < level ? 'asc' : 'desc'
}
