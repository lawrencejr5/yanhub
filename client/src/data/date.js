const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

const d = new Date();
const currMonth = months[d.getMonth()];
const currYear = d.getFullYear();

export { months, days, currMonth, currYear };
