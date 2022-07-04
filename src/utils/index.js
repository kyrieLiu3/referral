export const resolveResHeader = string => {
  const segs = string.split('; ')
  const result = {}
  for (let seg of segs) {
    const _res = seg.split('=')
    const key = _res[0]
    const value = _res[1]
    result[key] = value
  }
  return result
}

export const download = (blob, filename) => {
  const downloadURL = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.style.display = 'none'
  link.download = filename
  link.href = downloadURL
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(downloadURL)
}
