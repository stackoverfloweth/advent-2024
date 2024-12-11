type Location = { x: number, y: number, value: number }
type Path = Location & { options: Path[] }

const MAX_HEIGHT = 9
export function solve(input: string): number {
  const map = createMap(input)
  const startingLocations = findLocations(map, 0)
  const pathsToTheTop = startingLocations
    .map((location) => findPaths(location, map))
    .filter((path) => !!path)

  const score = getTrailHeadScore(pathsToTheTop)

  return score.size
}

function createMap(input: string): Location[] {
  return input
    .split('\n')
    .flatMap((line, y) => line
      .split('')
      .map(Number)
      .map((value, x) => ({ x, y, value })),
    )
    .sort((a, b) => a.value - b.value)
}

function findLocations(map: Location[], value: number): Location[] {
  return map.filter((location) => location.value === value)
}

function isAdjacent(source: Location, destination: Location): boolean {
  const xDifference = Math.abs(source.x - destination.x)
  const yDifference = Math.abs(source.y - destination.y)

  return xDifference + yDifference <= 1
}

function createPath(location: Location): Path {
  return { ...location, options: [] }
}

function findPaths(location: Location, map: Location[]): Path | undefined {
  const height = location.value

  if (height === MAX_HEIGHT) {
    return createPath(location)
  }

  const options = findLocations(map, height + 1)
    .filter((possibleMatch) => isAdjacent(possibleMatch, location))
    .reduce<Path[]>((paths, possibleMatch) => {
      const path = findPaths(possibleMatch, map)

      if (path) {
        paths.push(path)
      }

      return paths
    }, [])

  if (!options.length) {
    return undefined
  }

  return {
    ...createPath(location),
    options,
  }
}

function getTrailKey(start: Location, end: Location): string {
  return `${start.x}|${start.y}->${end.x}|${end.y}`
}

function getTrailHeadScore(starting: Path[]): Set<string> {
  const score = new Set<string>()

  starting.forEach((start) => {
    getSummitScore(start, start.options).forEach((key) => score.add(key))
  })

  return score
}

function getSummitScore(start: Path, paths: Path[]): Set<string> {
  return paths.reduce((score, path) => {
    if (path.value === MAX_HEIGHT) {
      score.add(getTrailKey(start, path))
    }

    getSummitScore(start, path.options).forEach((key) => score.add(key))

    return score
  }, new Set<string>())
}
