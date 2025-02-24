const removeSpecialCharacter = (str: string) =>
  str.replace(
    // eslint-disable-next-line no-useless-escape
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    ''
  )

export const generateSlug = (name: string, id: string) => {
  return `${removeSpecialCharacter(name).replace(/\s/g, '-')}-i.${id}`
}

export const getIdFromSlug = (slug: string) => {
  const arr = slug.split('-i.')
  return arr[arr.length - 1]
}
