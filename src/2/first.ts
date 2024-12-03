export function solve(input: string): unknown {
  const reports = getReports(input)

  return reports.reduce((sum, report) => {
    if (getReportIsSafe(report)) {
      return sum + 1
    }

    return sum
  }, 0)
}

type Report = number[]
type Range = { min: number, max: number }

function getReports(input: string): Report[] {
  return input.split('\n').map(getLevels)
}

function getLevels(report: string): number[] {
  return report.split(' ').map((level) => parseInt(level))
}

export function getReportIsSafe(report: Report): boolean {
  try {
    const direction = getDirectionForReport(report)

    report.reduce<Range>((range, level) => {
      if (!getLevelIsInRange(level, range)) {
        throw new Error('Unsafe Report!')
      }

      return getRangeForLevel(level, direction)
    }, { min: -Infinity, max: Infinity })
  } catch {
    return false
  }

  return true
}

function getDirectionForReport(report: Report): 'asc' | 'desc' {
  if (report.length < 2) {
    throw new Error('Invalid Report!')
  }

  const [first, second] = report
  return first < second ? 'asc' : 'desc'
}

function getLevelIsInRange(level: number, { min, max }: Range): boolean {
  return level >= min && level <= max
}

function getRangeForLevel(level: number, direction: 'asc' | 'desc'): Range {
  return direction === 'asc' ? { min: level + 1, max: level + 3 } : { max: level - 1, min: level - 3 }
}
