const isAvailableForBooking = (startTime, endTime, currTime) => {
  const [startHour, startMinute] = startTime.split(":");
  const [endHour, endMinute] = endTime.split(":");
  const [currHour, currMinute] = currTime.split(":");
  if (startHour === endHour && currHour === startHour)
    return currMinute >= endMinute;
  return !(
    currHour >= startHour &&
    currHour <= endHour &&
    currMinute <= endMinute &&
    currMinute >= startMinute
  );
};

export { isAvailableForBooking };
