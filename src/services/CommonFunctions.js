const todayDate = new Date()
const filterTodayConst = {
  1: 'lv',
  6: 's',
  7: 'd'
}
const filterDay = filterTodayConst[todayDate.getDay()] ? filterTodayConst[todayDate.getDay()] : 'lv'

function calculateTimeDifference (timeString) {
  const time = timeString.split(':')
  let nextStopStation = new Date()
  nextStopStation.setHours(time[0], time[1])
  if (('0' + todayDate.getHours()).slice(-2) > time[0]) {
    nextStopStation.setDate(todayDate.getDate() + 1)
  }
  const diff = Math.abs(todayDate - nextStopStation)
  let minutes = Math.floor((diff / 1000) / 60)
  const hours = Math.trunc(minutes / 60)
  minutes %= 60
  return hours !== 0 ? hours + ':' + minutes : minutes + ' min'
}

function getDayAbbreviation () {
  return filterDay
}

function getTodayHourList (busItem) {
  return busItem.station[filterDay] ? busItem.station[filterDay].lines : null
}

function calculateNextStationTime (hourList) {
  if (hourList.length === 0) {
    return
  }
  const timeNow = ('0' + todayDate.getHours()).slice(-2) + ':' + todayDate.getMinutes()
  const next = {}
  hourList.map(hours => {
    if (hours[0] > timeNow && !next.next_in_stop) {
      const remainingMin = calculateTimeDifference(hours[0])
      next.next_in_stop = {hour: hours[0], remainingMin}
    }
    if (hours[1] > timeNow && !next.next_out_stop) {
      const remainingMin = calculateTimeDifference(hours[1])
      next.next_out_stop = {hour: hours[1], remainingMin}
    }
  })
  if (!next.next_in_stop) {
    const remainingMin = calculateTimeDifference(hourList[0][0])
    next.next_in_stop = {hour: hourList[0][0], remainingMin}
  }
  if (!next.next_out_stop) {
    const remainingMin = calculateTimeDifference(hourList[0][1])
    next.next_out_stop = {hour: hourList[0][1], remainingMin}
  }
  return next
}

export default {calculateNextStationTime, getDayAbbreviation, getTodayHourList}

