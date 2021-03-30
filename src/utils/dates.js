export const getYearFromDate = d => {
  const date = new Date(d)
  return date.getFullYear()
}

export const formatDate = (d, withYear) => {
  const date = new Date(d)
  const month = date.toLocaleString("default", { month: "long" })
  const day = date.getDate()
  const year = date.getFullYear()
  if (withYear) return `${month} ${day}, ${year}`
  else return `${month} ${day}`
}

export const getShowDates = (start_date, end_date) => {
  return getYearFromDate(start_date) !== getYearFromDate(end_date)
    ? `${formatDate(start_date, true)} - ${formatDate(end_date, true)}`
    : `${formatDate(start_date)} - ${formatDate(end_date, true)}`
}
