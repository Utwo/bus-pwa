const todayDate = new Date()
const filterTodayConst = {
  1: 'lv',
  6: 's',
  7: 'd'
}
const filterDay = filterTodayConst[todayDate] ? filterTodayConst[todayDate] : 'lv'

function calculateNextStationTime (busLine) {
  const hourList = busLine.statii[filterDay].linies
  const timeNow = todayDate.getHours() + ':' + todayDate.getMinutes()
  const next = {}
  hourList.map(hours => {
    if (hours[0] > timeNow && !next.next_in_stop) {
      next.next_in_stop = { name: busLine.statii[filterDay].in_stop_name, hour: hours[0] }
    }
    if (hours[1] > timeNow && !next.next_out_stop) {
      next.next_out_stop = { name: busLine.statii[filterDay].out_stop_name, hour: hours[1] }
    }
  })
  return next
}

export default {calculateNextStationTime}

