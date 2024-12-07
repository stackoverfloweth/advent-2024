type Location = { x: number, y: number, value: string }
type Map = Location[][]
const obstruction = '#'
const guard = ['^', '>', 'v', '<'] as const
type Guard = Location & { value: typeof guard[number] }

class GuardHistory {
  private readonly history = new Set<string>()

  public add(guard: Guard): void {
    const key = this.getKey(guard)

    this.history.add(key)
  }

  public has(guard?: Guard): boolean {
    if (!guard) {
      return false
    }

    const key = this.getKey(guard)

    return this.history.has(key)
  }

  public get size(): number {
    return this.history.size
  }

  public forEach(callbackfn: (value: string, value2: string, set: Set<string>) => void): void {
    this.history.forEach(callbackfn)
  }

  private getKey(guard?: Guard): string {
    if (!guard) {
      return ''
    }

    const { x, y, value } = guard

    return JSON.stringify({ x, y, value })
  }
}

const overflows = new GuardHistory()

export function solve(input: string): unknown {
  const map = getMap(input)
  const locationsVisited = exploreMap(map)

  locationsVisited.forEach((visited) => {
    const { x, y }: Location = JSON.parse(visited)
    const modifiedMap = updateMap(getMap(input), { x, y }, obstruction)

    try {
      console.log(printMap(modifiedMap) + '\n')
      exploreMap(modifiedMap)
    } catch {
      overflows.add({ x, y, value: '^' })
    }
  })

  return overflows.size
}

function exploreMap(map: Map): GuardHistory {
  const locationsVisited = new GuardHistory()
  let guard = findGuard(map)

  while (guard !== undefined) {
    locationsVisited.add(guard)
    const newGuard = step(map, guard)

    if (locationsVisited.has(newGuard)) {
      throw new Error('Overflow Exception!')
    }

    guard = newGuard
  }

  return locationsVisited
}

function getMap(input: string): Map {
  return input.split('\n').map((line, y) => line.split('').map((value, x) => {
    return { x, y, value }
  }))
}

function getMapLocation(map: Map, x: number, y: number): Location | undefined {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (map[y] === undefined) {
    return undefined
  }

  return map[y][x]
}

function updateMap(map: Map, { x, y }: Pick<Location, 'x' | 'y'>, value: string): Map {
  return map.map((line) => line.map((location) => {
    if (location.x === x && location.y === y) {
      return { ...location, value }
    }

    return location
  }))
}

function printMap(map: Map): string {
  return map.map((line) => line.map((location) => location.value).join(' ')).join('\n')
}

function isGuard(location: Location): location is Guard {
  return guard.includes(location.value as Guard['value'])
}

function findGuard(map: Map): Guard | undefined {
  const guardLocation = map
    .flatMap((line) => line)
    .find(isGuard)

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
