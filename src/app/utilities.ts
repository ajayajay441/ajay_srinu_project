export const toShortFormat = function (date: Date) {
  let monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let day: any = date.getDate();
  day = day < 10 ? "0" + day : day;
  let monthIndex = date.getMonth();
  let monthName = monthNames[monthIndex];
  let year = date.getFullYear();
  return `${day}-${monthName}-${year}`;
};
