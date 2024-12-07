type Location = { x: number, y: number, value: string, obstructed: boolean }
type Map = Location[][]
const obstruction = '#'
const guard = ['^', '>', 'v', '<'] as const
type Guard = Location & { value: typeof guard[number] }

export function solve(input: string): unknown {
  const locationsVisited = new Set<string>()
  const map = getMap(input)
  let guard: Guard | undefined = findGuard(map)

  while (guard !== undefined) {
    locationsVisited.add(`${guard.x}/${guard.y}`)
    guard = step(map, guard)
  }

  return locationsVisited.size
}

function getMap(input: string): Map {
  return input.split('\n').map((line, y) => line.split('').map((value, x) => {
    const obstructed = value === obstruction

    return { x, y, value, obstructed }
  }))
}

function getMapLocation(map: Map, x: number, y: number): Location | undefined {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (map[y] === undefined) {
    return undefined
  }

  return map[y][x]
}

function isGuard(location: Location): location is Guard {
  return guard.includes(location.value as Guard['value'])
}

function findGuard(map: Map): Guard {
  const guardLocation = map
    .flatMap((line) => line)
    .find(isGuard)

  if (!guardLocation) {
    throw new Error('Guard not found!')
  }

  return guardLocation
}

function step(map: Map, guard: Guard): Guard | undefined {
  const nextLocation = getNextLocation(map, guard)

  if (nextLocation === undefined) {
    return undefined
  }

  return maybeTurn(map, { ...nextLocation, value: guard.value })
}

function getNextLocation(map: Map, { x, y, value }: Guard): Location | undefined {
  switch (value) {
    case '<':
      return getMapLocation(map, x - 1, y)
    case '>':
      return getMapLocation(map, x + 1, y)
    case '^':
      return getMapLocation(map, x, y - 1)
    case 'v':
      return getMapLocation(map, x, y + 1)
    default:
      return value satisfies never
  }
}

function maybeTurn(map: Map, guard: Guard): Guard {
  const nextLocation = getNextLocation(map, guard)

  if (nextLocation?.value !== obstruction) {
    return guard
  }

  switch (guard.value) {
    case '<':
      return { ...guard, value: '^' }
    case '>':
      return { ...guard, value: 'v' }
    case '^':
      return { ...guard, value: '>' }
    case 'v':
      return { ...guard, value: '<' }
    default:
      return guard.value satisfies never
  }
}
