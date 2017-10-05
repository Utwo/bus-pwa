const todayDate = new Date()
const filterTodayConst = {
  1: 'lv',
  6: 's',
  7: 'd'
}
const filterDay = filterTodayConst[todayDate] ? filterTodayConst[todayDate] : 'lv'

function calculateTimeDifference (timeString) {
  const time = timeString.split(':')
  const diff = Math.abs(todayDate - new Date().setHours(time[0], time[1]))
  return Math.floor((diff / 1000) / 60)
}

function calculateNextStationTime (busLine) {
  const hourList = busLine.statii[filterDay].linies
  const timeNow = todayDate.getHours() + ':' + todayDate.getMinutes()
  const next = {}
  hourList.map(hours => {
    if (hours[0] > timeNow && !next.next_in_stop) {
      const remainingMin = calculateTimeDifference(hours[0])
      next.next_in_stop = {name: busLine.statii[filterDay].in_stop_name, hour: hours[0], remainingMin}
    }
    if (hours[1] > timeNow && !next.next_out_stop) {
      const remainingMin = calculateTimeDifference(hours[1])
      next.next_out_stop = {name: busLine.statii[filterDay].out_stop_name, hour: hours[1], remainingMin}
    }
  })
  return next
}

export default {calculateNextStationTime}

