export type Location = { x: number, y: number, value: string }
export type Distance = { x: number, y: number }

const empty = '.'

export function solve(input: string): number {
  const map = createMap(input)
  const antennas = map.filter((location) => location.value !== empty)
  const alignedPairs = groupAlignedAntennas(antennas)
  const antinodes = getAntinodes(map, alignedPairs)

  return antinodes.length
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
  const min: Distance = { x: 0, y: 0 }
  const max: Distance = { x: Math.max(...map.map(({ x }) => x)), y: Math.max(...map.map(({ y }) => y)) }
  const distance = getDistanceBetweenAntennas(aAntenna, bAntenna)
  const possibleAntinodes = [
    {
      ...aAntenna,
      x: aAntenna.x + distance.x,
      y: aAntenna.y + distance.y,
    },
    {
      ...aAntenna,
      x: aAntenna.x + distance.x * -1,
      y: aAntenna.y + distance.y * -1,
    },
    {
      ...bAntenna,
      x: bAntenna.x + distance.x,
      y: bAntenna.y + distance.y,
    },
    {
      ...bAntenna,
      x: bAntenna.x + distance.x * -1,
      y: bAntenna.y + distance.y * -1,
    },
  ]

  return possibleAntinodes.filter((antinode) => {
    if (antinode.x < min.x || antinode.y < min.y) {
      return false
    }

    if (antinode.x > max.x || antinode.y > max.y) {
      return false
    }

    if ([aAntenna, bAntenna].some((location) => isSameLocation(location, antinode))) {
      return false
    }

    return true
  })
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
