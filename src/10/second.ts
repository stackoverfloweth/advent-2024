type Location = { x: number, y: number, value: number }
type Path = Location & { options: Path[] }

const MAX_HEIGHT = 9
export function solve(input: string): number {
  const map = createMap(input)
  const startingLocations = findLocations(map, 0)
  const pathsToTheTop = startingLocations
    .map((location) => findPaths(location, map))
    .filter((path) => !!path)

  const score = getTrailScore(pathsToTheTop)

  return score
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

function getTrailScore(starting: Path[]): number {
  return starting.reduce((sum, start) => {
    const score = getSummitScore(start.options)

    return sum + score
  }, 0)
}

function getSummitScore(paths: Path[]): number {
  return paths.reduce((sum, path) => {
    if (path.value === MAX_HEIGHT) {
      return sum + 1
    }

    return sum + getSummitScore(path.options)
  }, 0)
}
