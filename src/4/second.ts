export function solve(input: string): number {
  const map = createMap(input)
  const possibleMatches = findLetter(map, 'A')

  return possibleMatches.filter((match) => checkPattern(map, match)).length
}

type Map = string[][]
const DIRECTIONS = ['NE', 'SE', 'SW', 'NW'] as const
type Direction = typeof DIRECTIONS[number]
type PossibleMatch = { x: number, y: number }

function createMap(input: string): Map {
  return input.split('\n').map((line) => line.split(''))
}

function checkPattern(map: Map, match: PossibleMatch): boolean {
  const [ne, se, sw, nw] = DIRECTIONS.map((direction) => getNextInDirection(match, direction)).map((match) => getMapValue(map, match))

  return [`${ne}A${sw}`, `${nw}A${se}`].every((word) => ['MAS', 'SAM'].includes(word))
}

function getMapValue(map: Map, { x, y }: PossibleMatch): string | undefined {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (map[y] === undefined) {
    return undefined
  }

  return map[y][x]
}

function getNextInDirection({ x, y }: PossibleMatch, direction: Direction): PossibleMatch {
  switch (direction) {
    case 'NE':
      return { x: x + 1, y: y - 1 }
    case 'SE':
      return { x: x + 1, y: y + 1 }
    case 'SW':
      return { x: x - 1, y: y + 1 }
    case 'NW':
      return { x: x - 1, y: y - 1 }
    default: return direction satisfies never
  }
}

function findLetter(map: Map, letter: string): PossibleMatch[] {
  function searchLine(line: string[], y: number): PossibleMatch[] {
    return line.reduce<PossibleMatch[]>((possibleMatches, value, x) => {
      if (value === letter) {
        possibleMatches.push({ x, y })
      }

      return possibleMatches
    }, [])
  }

  return map.reduce<PossibleMatch[]>((possibleMatches, value, y) => {
    return possibleMatches.concat(searchLine(value, y))
  }, [])
}
