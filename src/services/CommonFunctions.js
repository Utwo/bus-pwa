const todayDate = new Date()
const filterTodayConst = {
  1: 'lv',
  6: 's',
  7: 'd'
}
const filterDay = filterTodayConst[todayDate.getDay()] ? filterTodayConst[todayDate.getDay()] : 'lv'

/**
 * @param timeString1
 * @param timeString2
 * @returns {string}
 */
function calculateTimeDifference (timeString1, timeString2 = null) {
  const time1 = timeString1.split(':')
  const time1Date = new Date()
  const time2Date = todayDate
  time1Date.setHours(time1[0], time1[1])
  if (timeString2) {
    const time2 = timeString2.split(':')
    time2Date.setHours(time2[0], time2[1])
  }
  if (('0' + time2Date.getHours()).slice(-2) > time1[0]) {
    time1Date.setDate(time2Date.getDate() + 1)
  }
  const diff = Math.abs(time2Date - time1Date)
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
  const timeNow = ('0' + todayDate.getHours()).slice(-2) + ':' + ('0' + todayDate.getMinutes()).slice(-2)
  const next = {}
  hourList.map((hours, index) => {
    if (hours[0] > timeNow && !next.next_in_stop) {
      const remainingMin = calculateTimeDifference(hours[0])
      next.next_in_stop = {hour: hours[0], remainingMin}
      next.current_in_stop = {hour: hourList[index - 1][0]}
    }
    if (hours[1] > timeNow && !next.next_out_stop) {
      const remainingMin = calculateTimeDifference(hours[1])
      next.next_out_stop = {hour: hours[1], remainingMin}
      next.current_out_stop = {hour: hourList[index - 1][1]}
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

function calculateProgress (currentHourStop, nextHourStop) {
  const timeDifference = calculateTimeDifference(currentHourStop, nextHourStop)
  console.log(timeDifference)
}

export default {calculateNextStationTime, getDayAbbreviation, getTodayHourList, calculateProgress}

