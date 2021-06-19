const dataQuery = (array, query, status, sortDate) => {
  let modifiedList = array.filter((item) => filterByStatus(item[query], status))
  sortDate && modifiedList.reverse()
  return modifiedList
}

const filterByStatus = (inquiry_status, status) => {
  let filter = {
    pending: status.pending && 'pending',
    started: status.started && 'started',
    done: status.done && 'done',
  }
  if (Object.values(filter).indexOf(inquiry_status) > -1) return true
}

export { dataQuery }
