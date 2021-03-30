export const getThingsByDate = (things, isWorks) => {
  const tbd = {}
  things.forEach(w => {
    const year = isWorks
      ? new Date(w.node.frontmatter.date).getFullYear()
      : new Date(w.node.frontmatter.start_date).getFullYear()
    if (tbd[year]) {
      tbd[year].push(w)
    } else {
      tbd[year] = [w]
    }
  })
  return tbd
}
