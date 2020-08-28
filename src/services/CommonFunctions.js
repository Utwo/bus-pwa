import {
  format,
  isFuture,
  formatDistanceToNow,
  differenceInSeconds
} from "date-fns";
export default {
  calculateNextStationTime,
  getDayAbbreviation,
  getTodayHourList,
  calculateProgress
};

const todayDate = new Date();
const filterTodayConst = {
  1: "lv",
  6: "s",
  0: "d"
};
const filterDay = filterTodayConst[todayDate.getDay()]
  ? filterTodayConst[todayDate.getDay()]
  : "lv";

function getDayAbbreviation() {
  return filterDay;
}

function getTodayHourList(busItem) {
  return busItem.station[filterDay] ? busItem.station[filterDay].lines : null;
}

function timeStringToDate(time) {
  const [hours, minutes] = time.split(":");
  const date = new Date();
  date.setHours(hours, minutes, 30);
  return date;
}

function calculateNextStationTime(hourList) {
  if (hourList.length === 0) {
    return;
  }
  let current1 = timeStringToDate(hourList[0][0]);
  let current2 = timeStringToDate(hourList[0][1]);
  let nextHour1;
  let nextHour2;
  for (const hours of hourList) {
    if (hours[0]) {
      nextHour1 = timeStringToDate(hours[0]);
      if (!isFuture(nextHour1)) {
        current1 = new Date(nextHour1.valueOf());
      } else {
        break;
      }
    }
  }
  for (const hours of hourList) {
    if (hours[1]) {
      nextHour2 = timeStringToDate(hours[1]);
      if (!isFuture(nextHour2)) {
        current2 = new Date(nextHour2.valueOf());
      } else {
        break;
      }
    }
  }
  if (!isFuture(nextHour1)) {
    nextHour1 = timeStringToDate(hourList[0][0]);
  }
  if (!isFuture(nextHour2)) {
    nextHour2 = timeStringToDate(hourList[0][1]);
  }
  const progress1 = calculateProgress(current1, nextHour1);
  const progress2 = calculateProgress(current2, nextHour2);
  return {
    next_in_stop: {
      currentDateTime: format(current1, "HH:mm"),
      nextDateTime: nextHour1,
      formatTime: format(nextHour1, "HH:mm"),
      progress: progress1,
      remainingTime: formatDistanceToNow(nextHour1)
    },
    next_out_stop: {
      currentDateTime: format(current2, "HH:mm"),
      nextDateTime: nextHour2,
      formatTime: format(nextHour2, "HH:mm"),
      progress: progress2,
      remainingTime: formatDistanceToNow(nextHour2)
    }
  };
}

function calculateProgress(currentDateTime, nextDateTime) {
  const currentDateNextDate = differenceInSeconds(
    nextDateTime,
    currentDateTime
  );
  const currentDateTodayDate = differenceInSeconds(new Date(), currentDateTime);
  return Math.abs((currentDateTodayDate * 100) / currentDateNextDate);
}
