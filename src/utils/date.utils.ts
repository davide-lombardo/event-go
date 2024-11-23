export function getWeekDayName(dateStr: string, locale: string | string[]) {
  var date = new Date(dateStr);
  return date.toLocaleDateString(locale, {
    weekday: 'long',
  });
}

export function getDaysArray(
  start: string | number,
  end: string | number
): string[] {
  for (
    var arr = [], dt = new Date(start);
    dt <= new Date(end);
    dt.setDate(dt.getDate() + 1)
  ) {
    arr.push(new Date(dt).toLocaleDateString());
  }
  return arr;
}

export function isRequiredSlotCompatibleWithOpeningTime(
  day: string,
  timeSlot: any,
  openingDays: any
) {
  if (!timeSlot) return true;
  const { start: timeStart, end: timeEnd } = timeSlot;
  const openingTimes: any[] =
    openingDays[getWeekDayName(day, 'it-IT')];

  const { openingTime } = openingTimes[0];
  const { closingTime } = openingTimes[openingTimes.length];

  const openingDateTime = StringToDateTime(day, openingTime);
  const closingDateTime = StringToDateTime(day, closingTime);

  return (
    new Date(timeStart).getTime() >= openingDateTime &&
    new Date(timeEnd).getTime() <= closingDateTime
  );
}

export function StringToDateTime(date: string, time: string) {
  const splittedTime = time.split(':').map(s => parseInt(s));
  const h = splittedTime.shift() as number;
  const m = splittedTime.shift() as number;
  try {
    return new Date(date).setHours(h, m);
  } catch (error) {
    throw error;
  }
}

export const isValidDate = (value: any) => !isNaN(Date.parse(value));
