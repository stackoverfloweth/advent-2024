export function solve(input: string): number {
  const disk = readDisk(input.split('').map(Number))
  const compacted = compactDisk(disk)
  const checksum = calculateChecksum(compacted)

  return checksum
}

type File = number
const emptySpace = undefined
type EmptySpace = typeof emptySpace
type Memory = File | EmptySpace

function readDisk(input: number[]): Memory[] {
  let fileId = 0

  return input.reduce<Memory[]>((disk, size, index) => {
    const isFile = index % 2 === 0

    if (isFile) {
      disk.push(...createMemoryArray(fileId++, size))
    } else {
      disk.push(...createMemoryArray(emptySpace, size))
    }

    return disk
  }, [])
}

function compactDisk(disk: Memory[]): Memory[] {
  return disk.reduce<Memory[]>((compacted, memory, index) => {
    if (isFile(memory)) {
      return compacted.concat([memory])
    }

    const fileIndex = getLastFileIndex(disk)
    if (fileIndex <= index) {
      return compacted.concat([emptySpace])
    }

    const [file] = disk.splice(fileIndex, 1, emptySpace)

    return compacted.concat([file])
  }, [])
}

function createMemoryArray(id: number | undefined, size: number): Memory[] {
  return new Array(size).fill(id)
}

function isFile(memory: Memory): memory is File {
  return memory !== emptySpace
}

function isEmptySpace(memory: Memory): memory is EmptySpace {
  return memory === emptySpace
}

function getLastFileIndex(disk: Memory[]): number {
  const fileIndexReversed = [...disk].reverse().findIndex(isFile)

  if (fileIndexReversed === -1) {
    throw new Error('This disk is empty!')
  }

  return disk.length - 1 - fileIndexReversed
}

function calculateChecksum(disk: Memory[]): number {
  return disk.reduce<number>((checksum, memory, index) => {
    if (isEmptySpace(memory)) {
      return checksum
    }

    return checksum + memory * index
  }, 0)
}
