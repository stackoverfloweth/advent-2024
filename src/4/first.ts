export function solve(input: string): number {
  const map = createMap(input)
  const possibleMatches = findLetter(map, 'X')

  return ['M', 'A', 'S'].reduce((matches, letter) => {
    return matches.flatMap((match) => search(map, letter, match))
  }, possibleMatches).length
}

type Map = string[][]
const DIRECTIONS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'] as const
type Direction = typeof DIRECTIONS[number]
type PossibleMatch = { x: number, y: number, direction?: Direction }

function createMap(input: string): Map {
  return input.split('\n').map((line) => line.split(''))
}

function search(map: Map, letter: string, match: PossibleMatch): PossibleMatch[] {
  const adjacentLetters = findAdjacentLetters(match)

  return adjacentLetters.reduce<PossibleMatch[]>((matches, { x, y, direction }) => {
    if (getMapValue(map, { x, y }) === letter) {
      matches.push({ x, y, direction })
    }

    return matches
  }, [])
}

function getMapValue(map: Map, { x, y }: PossibleMatch): string | undefined {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (map[y] === undefined) {
    return undefined
  }

  return map[y][x]
}

function findAdjacentLetters(match: PossibleMatch): PossibleMatch[] {
  if (match.direction) {
    return [getNextInDirection(match, match.direction)]
  }

  return DIRECTIONS.reduce<PossibleMatch[]>((matches, direction) => {
    return matches.concat([getNextInDirection(match, direction)])
  }, [])
}

function getNextInDirection({ x, y }: PossibleMatch, direction: Direction): PossibleMatch {
  switch (direction) {
    case 'N':
      return { x, y: y - 1, direction }
    case 'NE':
      return { x: x + 1, y: y - 1, direction }
    case 'E':
      return { x: x + 1, y, direction }
    case 'SE':
      return { x: x + 1, y: y + 1, direction }
    case 'S':
      return { x, y: y + 1, direction }
    case 'SW':
      return { x: x - 1, y: y + 1, direction }
    case 'W':
      return { x: x - 1, y, direction }
    case 'NW':
      return { x: x - 1, y: y - 1, direction }
    default: return direction satisfies never
  }
}

function findLetter(map: Map, letter: string): PossibleMatch[] {
  function searchLine(line: string[], y: number): PossibleMatch[] {
    return line.reduce<PossibleMatch[]>((possibleMatches, value, x) => {
      if (value === letter) {
        possibleMatches.push({ x, y, direction: undefined })
      }

      return possibleMatches
    }, [])
  }

  return map.reduce<PossibleMatch[]>((possibleMatches, value, y) => {
    return possibleMatches.concat(searchLine(value, y))
  }, [])
}
