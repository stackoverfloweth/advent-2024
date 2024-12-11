export function solve(input: string): number {
  const disk = readDisk(input.split('').map(Number))
  const compacted = compactDisk(disk)

  const checksum = calculateChecksum(compacted)

  return checksum
}

type File = { id: number, size: number }
type EmptySpace = { id: undefined, size: number }
type Memory = File | EmptySpace

function readDisk(input: number[]): Memory[] {
  let fileId = 0

  return input.reduce<Memory[]>((disk, value, index) => {
    const isFile = index % 2 === 0

    if (isFile) {
      disk.push(createFile(fileId++, value))
    } else {
      disk.push(createEmptySpace(value))
    }

    return disk
  }, [])
}

function compactDisk(disk: Memory[]): Memory[] {
  const compacted = [...disk]
  const maxFileId = Math.max(...compacted.filter(isFile).map((memory) => memory.id))

  for (let fileId = maxFileId; fileId > 0; fileId--) {
    const fileIndex = compacted.findIndex((memory) => memory.id === fileId)

    if (fileIndex === -1) {
      throw new Error('FileId Not Found!')
    }

    const file = compacted[fileIndex]
    const availableSpaceIndex = compacted.findIndex((memory) => isEmptySpace(memory) && memory.size >= file.size)
    if (availableSpaceIndex === -1 || availableSpaceIndex > fileIndex) {
      continue
    }

    const availableSpace = compacted[availableSpaceIndex]
    const remainingSpace = availableSpace.size > file.size ? createEmptySpace(availableSpace.size - file.size) : undefined

    compacted.splice(fileIndex, 1, createEmptySpace(file.size))
    compacted.splice(availableSpaceIndex, 1, ...[file, remainingSpace].filter((memory) => !!memory))
  }

  return compacted
}

function createFile(id: number, size: number): Memory {
  return { id, size }
}

function isFile(memory: Memory): memory is File {
  return memory.id !== undefined
}

function createEmptySpace(size: number): Memory {
  return { id: undefined, size }
}

function isEmptySpace(memory: Memory): memory is EmptySpace {
  return memory.id === undefined
}

function calculateChecksum(disk: Memory[]): number {
  const split = splitDisk(disk)

  return split.reduce<number>((sum, id, index) => {
    if (id === undefined) {
      return sum
    }

    return sum + id * index
  }, 0)
}

function splitDisk(disk: Memory[]): (number | undefined)[] {
  return disk.reduce<(number | undefined)[]>((split, memory) => {
    split.push(...new Array(memory.size).fill(memory.id))

    return split
  }, [])
}
