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
  try {
    const clean = removeEmptyMemory(disk)
    const [beforeEmpty, { size: emptySize }, afterEmpty] = getFirstEmpty(clean)
    const [beforeFile, { id: fileId, size: fileSize }, afterFile] = getLastFile(afterEmpty)

    if (emptySize === fileSize) {
      return compactDisk([
        ...beforeEmpty,
        createFile(fileId, emptySize),
        ...beforeFile,
        createEmptySpace(fileSize),
        ...afterFile,
      ])
    }

    if (emptySize < fileSize) {
      return compactDisk([
        ...beforeEmpty,
        createFile(fileId, emptySize),
        ...beforeFile,
        createFile(fileId, fileSize - emptySize),
        createEmptySpace(emptySize),
        ...afterFile,
      ])
    }

    return compactDisk([
      ...beforeEmpty,
      createFile(fileId, fileSize),
      createEmptySpace(emptySize - fileSize),
      ...beforeFile,
      createEmptySpace(fileSize),
      ...afterFile,
    ])
  } catch {
    return disk
  }
}

function removeEmptyMemory(disk: Memory[]): Memory[] {
  return disk.reduce<Memory[]>((clean, memory) => {
    if (memory.size < 0) {
      throw new Error('Invalid Memory Size!')
    }

    if (memory.size > 0) {
      clean.push(memory)
    }

    return clean
  }, [])
}

function getFirstEmpty(disk: Memory[]): [Memory[], EmptySpace, Memory[]] {
  const emptyIndex = disk.findIndex(isEmptySpace)

  if (emptyIndex === -1) {
    throw new Error('This disk is full!')
  }

  return [
    disk.slice(0, emptyIndex),
    disk[emptyIndex] as EmptySpace,
    disk.slice(emptyIndex + 1),
  ]
}

function getLastFile(disk: Memory[]): [Memory[], File, Memory[]] {
  const fileIndexReversed = [...disk].reverse().findIndex(isFile)

  if (fileIndexReversed === -1) {
    throw new Error('This disk is empty!')
  }

  const fileIndex = disk.length - 1 - fileIndexReversed

  return [
    disk.slice(0, fileIndex),
    disk[fileIndex] as File,
    disk.slice(fileIndex + 1),
  ]
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

  console.log({ split })

  return split.reduce((sum, id, index) => {
    return sum + id * index
  }, 0)
}

function splitDisk(disk: Memory[]): number[] {
  return disk.reduce<number[]>((split, memory) => {
    if (memory.id !== undefined) {
      split.push(...new Array(memory.size).fill(memory.id))
    }

    return split
  }, [])
}

function printDisk(disk: Memory[]): void {
  console.log(disk.reduce((printed, memory) => {
    const id = memory.id ?? '.'
    return printed + String(id).repeat(memory.size)
  }, ''))
}
