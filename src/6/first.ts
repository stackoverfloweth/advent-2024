type Location = { x: number, y: number, value: string }
type Map = Location[]
const obstruction = '#'
const guard = ['^', '>', 'v', '<'] as const
type Guard = Location & { value: typeof guard[number] }

export function solve(input: string): number {
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
  return input.split('\n').flatMap((line, y) => line.split('').map((value, x) => {
    return { x, y, value }
  }))
}

function getMapLocation(map: Map, x: number, y: number): Location | undefined {
  return map.find((location) => location.x === x && location.y === y)
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

  const { x, y, value } = nextLocation
  if (value === obstruction) {
    return step(map, turn(guard))
  }

  return { ...guard, x, y }
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

function turn(guard: Guard): Guard {
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
