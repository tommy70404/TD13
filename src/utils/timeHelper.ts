export function sec2time(timeInSeconds: string | number) {
  var pad = function(num: number, size: number) {
      return ('000' + num).slice(size * -1);
    },
    time = typeof timeInSeconds === 'string' ? parseFloat(timeInSeconds).toFixed(3) : timeInSeconds.toFixed(3),
    hours = Math.floor(parseFloat(time) / 60 / 60),
    minutes = Math.floor(parseFloat(time) / 60) % 60,
    seconds = Math.floor(parseFloat(time) - minutes * 60)
    // milliseconds = parseFloat(time.slice(-3));

  return pad(hours, 2) + ':' + pad(minutes, 2) + ':' + pad(seconds, 2)
}
