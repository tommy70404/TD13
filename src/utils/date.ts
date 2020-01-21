export function fmtDate(template: string, date: Date) {
  const specs = 'YYYY:MM:DD:HH:mm:ss'.split(':');

  date = new Date(date || Date.now() - new Date().getTimezoneOffset() * 6e4);

  return date
    .toISOString()
    .split(/[-:.TZ]/)
    .reduce((template, item, i) => template.split(specs[i]).join(item), template);
}

export function fmtLocalDate(template: string, rawDate: Date | number | string) {
  const specs = 'YYYY:MM:DD:HH:mm:ss'.split(':');
  const convertedDate = rawDate instanceof Date ? rawDate : new Date(rawDate);
  const date = new Date(
    convertedDate.getTime() - new Date().getTimezoneOffset() * 6e4 || Date.now() - new Date().getTimezoneOffset() * 6e4,
  );
  return date
    .toISOString()
    .split(/[-:.TZ]/)
    .reduce((template, item, i) => template.split(specs[i]).join(item), template);
}

export function fmtTWLocalDate(template: string, rawDate: Date | number | string) {
  const specs = 'YYY:MM:DD:HH:mm:ss'.split(':');
  const convertedDate =
    rawDate instanceof Date ? rawDate : new Date(typeof rawDate === 'number' ? rawDate : parseInt(rawDate));

  const date = new Date(
    convertedDate.getTime() - new Date().getTimezoneOffset() * 6e4 || Date.now() - new Date().getTimezoneOffset() * 6e4,
  );

  return date
    .toISOString()
    .split(/[-:.TZ]/)
    .reduce((template, item, i, all) => {
      if (i === 0) {
        item = (parseInt(item) - 1911).toString();
      }
      return template.split(specs[i]).join(item);
    }, template);
}

export function getIntervalByDay(from: number | string | Date, to: number | string | Date) {
  const beginTime = new Date(from);
  const endTime = new Date(to);
  const miliSecADay = 24 * 60 * 60 * 1000;
  return Math.ceil((endTime.getTime() - beginTime.getTime()) / miliSecADay);
}

export function isToday(timeStr: string | Date) {
  const time = new Date(timeStr);
  const today = new Date();
  return (
    time.getDate() == today.getDate() &&
    time.getMonth() == today.getMonth() &&
    time.getFullYear() == today.getFullYear()
  );
}
