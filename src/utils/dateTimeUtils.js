//formats date in dd/mm/yyyy format
function formatDate(date) {
  return date
    .toJSON()
    .slice(0, 10)
    .replaceAll("-", "/")
    .split("/")
    .reverse()
    .join("/");
}

//returns time in HH:MM format from the date object provided
function formatTime(date) {
  return date.getHours() + ":" + date.getMinutes();
}

export { formatDate, formatTime };
