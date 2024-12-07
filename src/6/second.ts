type Location = { x: number, y: number, value: string }
const obstruction = '#'
const guard = ['^', '>', 'v', '<'] as const
type Guard = Location & { value: typeof guard[number] }

const overflows = new Set<string>()

class LoopError extends Error {
  public constructor() {
    super('Loop Detected!')
  }
}

export function solve(input: string): unknown {
  const map = getMap(input)
  const visited = exploreMap(map)

  visited.forEach(({ x, y }) => {
    const modifiedMap = getMap(input)
    const newObstruction: Location = { x, y, value: obstruction }
    modifiedMap.set(getLocationKey(newObstruction), newObstruction)

    try {
      exploreMap(modifiedMap)
    } catch (error) {
      if (error instanceof LoopError) {
        overflows.add(getLocationKey(newObstruction))
      }
    }
  })

  return overflows.size
}

export function exploreMap(map: Map<string, Location>): Map<string, Location> {
  const locationsVisited = new Map<string, Location>()
  let guard = findGuard(map)

  while (guard !== undefined) {
    locationsVisited.set(getGuardKey(guard), guard)
    const newGuard = stepOrTurn(map, guard)

    if (!!newGuard && locationsVisited.has(getGuardKey(newGuard))) {
      throw new LoopError()
    }

    guard = newGuard
  }

  return locationsVisited
}

export function getMap(input: string): Map<string, Location> {
  const map = new Map<string, Location>()

  input.split('\n').forEach((line, y) => {
    line.split('').forEach((value, x) => {
      map.set(getLocationKey({ x, y }), { x, y, value })
    })
  })

  return map
}

function getMapLocation(map: Map<string, Location>, { x, y }: Pick<Location, 'x' | 'y'>): Location | undefined {
  return map.get(getLocationKey({ x, y }))
}

function isGuard(location: Location): location is Guard {
  return guard.includes(location.value as Guard['value'])
}

function findGuard(map: Map<string, Location>): Guard | undefined {
  return Array.from(map.values()).find(isGuard)
}

function stepOrTurn(map: Map<string, Location>, guard: Guard): Guard | undefined {
  const nextLocation = getNextLocation(map, guard)

  if (nextLocation === undefined) {
    return undefined
  }

  const { x, y, value } = nextLocation
  if (value !== obstruction) {
    return { ...guard, x, y }
  }

  return turn(guard)
}

function getNextLocation(map: Map<string, Location>, { x, y, value }: Guard): Location | undefined {
  switch (value) {
    case '<':
      return getMapLocation(map, { x: x - 1, y: y })
    case '>':
      return getMapLocation(map, { x: x + 1, y: y })
    case '^':
      return getMapLocation(map, { x: x, y: y - 1 })
    case 'v':
      return getMapLocation(map, { x: x, y: y + 1 })
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

function getGuardKey(guard?: Guard): string {
  if (!guard) {
    throw new Error('Invalid Guard in History')
  }

  const { x, y, value } = guard

  return JSON.stringify({ x, y, value })
}

function getLocationKey(location?: Pick<Location, 'x' | 'y'>): string {
  if (!location) {
    throw new Error('Invalid Guard in History')
  }

  const { x, y } = location

  return JSON.stringify({ x, y })
}
