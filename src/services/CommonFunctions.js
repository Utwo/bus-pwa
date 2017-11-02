import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import format from 'date-fns/format'
import isFuture from 'date-fns/is_future'
import differenceInSeconds from 'date-fns/difference_in_seconds'

const todayDate = new Date()
const filterTodayConst = {
  1: 'lv',
  6: 's',
  7: 'd'
}
const filterDay = filterTodayConst[todayDate.getDay()] ? filterTodayConst[todayDate.getDay()] : 'lv'

function getDayAbbreviation () {
  return filterDay
}

function getTodayHourList (busItem) {
  return busItem.station[filterDay] ? busItem.station[filterDay].lines : null
}

function timeStringToDate (time) {
  const [hours, minutes] = time.split(':')
  const date = new Date()
  date.setHours(hours, minutes, 30)
  return date
}

function calculateNextStationTime (hourList) {
  if (hourList.length === 0) {
    return
  }
  let current1
  let current2
  let nextHour1
  let nextHour2
  for (const hours of hourList) {
    nextHour1 = timeStringToDate(hours[0])
    if (!isFuture(nextHour1)) {
      current1 = new Date(nextHour1.valueOf())
    } else {
      break
    }
  }
  for (const hours of hourList) {
    nextHour2 = timeStringToDate(hours[1])
    if (!isFuture(nextHour2)) {
      current2 = new Date(nextHour2.valueOf())
    } else {
      break
    }
  }
  const progress1 = calculateProgress(current1, nextHour1)
  const progress2 = calculateProgress(current2, nextHour2)
  return {
    next_in_stop: {
      currentDateTime: current1,
      nextDateTime: nextHour1,
      formatTime: format(nextHour1, 'HH:mm'),
      progress: progress1,
      remainingTime: distanceInWordsToNow(nextHour1)
    },
    next_out_stop: {
      currentDateTime: current2,
      nextDateTime: nextHour2,
      formatTime: format(nextHour2, 'HH:mm'),
      progress: progress2,
      remainingTime: distanceInWordsToNow(nextHour2)
    }
  }
}

function calculateProgress (currentDateTime, nextDateTime) {
  const currentDateNextDate = differenceInSeconds(nextDateTime, currentDateTime)
  const currentDateTodayDate = differenceInSeconds(new Date(), currentDateTime)
  return Math.abs((currentDateTodayDate * 100) / currentDateNextDate)
}

export default {calculateNextStationTime, getDayAbbreviation, getTodayHourList, calculateProgress}

