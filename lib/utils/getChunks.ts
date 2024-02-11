export const chunkFileForS3 = (file: Uint8Array) => {
  const chunkSize = 1024 * 1024 * 5 // 5 MB
  const totalParts = Math.ceil(file.length / chunkSize)
  let start = 0
  let end = Math.min(file.length, start + chunkSize)

  const chunks: Uint8Array[] = []

  for (let i = 0; i < totalParts; i++) {
    const chunk = file.slice(start, end)
    chunks.push(chunk)
    start = end
    end = Math.min(file.length, start + chunkSize)
  }

  return chunks
}
