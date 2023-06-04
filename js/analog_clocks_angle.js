function angleBetweenClockHands(timestamp) {
  const date = new Date(timestamp - 3600 * 1000 * 3);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const minutesDeg = (minutes * 360) / 60;
  const hoursDeg = ((hours % 12) * 360) / 12 + (minutes * 30) / 60;

  let result = Math.abs(hoursDeg - minutesDeg);

  if (result > 180) {
    result = 360 - result;
  }

  return (result * Math.PI) / 180;
}
