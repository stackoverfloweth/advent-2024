export type Location = { x: number, y: number, value: string }
export type Distance = { x: number, y: number }

const empty = '.'

export function solve(input: string): number {
  const map = createMap(input)
  const antennas = map.filter((location) => location.value !== empty)
  const alignedPairs = groupAlignedAntennas(antennas)
  const antinodes = getAntinodes(map, alignedPairs)

  // printLocations(map, [...antinodes.map((node) => ({ ...node, value: '#' })), ...antennas])

  return [...antinodes, ...antennas].reduce<Set<string>>((sum, location) => {
    sum.add(getLocationKey(location))

    return sum
  }, new Set<string>()).size
}

function createMap(input: string): Location[] {
  return input
    .split('\n')
    .flatMap((line, y) => line
      .split('')
      .map((value, x) => ({ x, y, value })))
}

function groupAlignedAntennas(antennas: Location[]): [Location, Location][] {
  const pairs = antennas.reduce<Record<string, [Location, Location]>>((pairs, antenna, index) => {
    [
      ...antennas.slice(0, index),
      ...antennas.slice(index + 1),
    ]
      .filter((match) => checkAntennasAligned(match, antenna))
      .forEach((match) => {
        const key = getLocationKey(antenna, match)

        pairs[key] = [antenna, match]
      })

    return pairs
  }, {})

  return Array.from(Object.values(pairs))
}

function isSameLocation(aLocation: Location, bLocation: Location): boolean {
  return aLocation.x === bLocation.x && aLocation.y === bLocation.y
}

function isSameFrequency(aFrequency: string, bFrequency: string): boolean {
  return aFrequency === bFrequency
}

function checkAntennasAligned(aAntenna: Location, bAntenna: Location): boolean {
  return isSameFrequency(aAntenna.value, bAntenna.value)
}

function getAntinodes(map: Location[], pairs: [Location, Location][]): Location[] {
  const antinodes = pairs.reduce<Record<string, Location>>((antinodes, pair) => {
    findAntinodes(pair, map).forEach((node) => {
      antinodes[getLocationKey(node)] = node
    })

    return antinodes
  }, {})

  return Object.values(antinodes)
}

function findAntinodes([aAntenna, bAntenna]: [Location, Location], map: Location[]): Location[] {
  const distance = getDistanceBetweenAntennas(aAntenna, bAntenna)

  const possibleAntinodes: Location[] = [
    ...getResonateFrequencyAntinodes(aAntenna, distance, map),
    ...getResonateFrequencyAntinodes(aAntenna, inverse(distance), map),
    ...getResonateFrequencyAntinodes(bAntenna, distance, map),
    ...getResonateFrequencyAntinodes(bAntenna, inverse(distance), map),
  ].flat()

  return possibleAntinodes.filter((antinode) => {
    if ([aAntenna, bAntenna].some((location) => isSameLocation(location, antinode))) {
      return false
    }

    return true
  })
}

function getResonateFrequencyAntinodes(location: Location, distance: Distance, map: Location[]): Location[] {
  const nextAntinode: Location = moveLocation(location, distance)

  if (!isWithinMap(nextAntinode, map)) {
    return []
  }

  return [
    nextAntinode,
    ...getResonateFrequencyAntinodes(nextAntinode, distance, map),
  ]
}

function moveLocation(location: Location, distance: Distance): Location {
  return {
    ...location,
    x: location.x + distance.x,
    y: location.y + distance.y,
  }
}

function inverse({ x, y }: Distance): Distance {
  return { x: x * -1, y: y * -1 }
}

function isWithinMap(location: Location, map: Location[]): boolean {
  const min: Distance = { x: 0, y: 0 }
  const max: Distance = { x: Math.max(...map.map(({ x }) => x)), y: Math.max(...map.map(({ y }) => y)) }

  if (location.x < min.x || location.y < min.y) {
    return false
  }

  if (location.x > max.x || location.y > max.y) {
    return false
  }

  return true
}

function getDistanceBetweenAntennas(aAntenna: Location, bAntenna: Location): Distance {
  return {
    x: aAntenna.x - bAntenna.x,
    y: aAntenna.y - bAntenna.y,
  }
}

function getLocationKey(location: Location): string
function getLocationKey(aAntenna: Location, bAntenna: Location): string
function getLocationKey(aAntenna: Location, bAntenna?: Location): string {
  const [x1, x2] = [aAntenna, bAntenna]
    .filter((antenna) => !!antenna)
    .map((antenna) => antenna.x)
    .sort((a, b) => a - b)
  const [y1, y2] = [aAntenna, bAntenna]
    .filter((antenna) => !!antenna)
    .map((antenna) => antenna.y)
    .sort((a, b) => a - b)

  return `${x1}${x2}-${y1}${y2}`
}
