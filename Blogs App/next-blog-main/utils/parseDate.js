export default function parseDate(dateString) {
  // Create a new Date object from the date string
  const date = new Date(dateString);

  // Define an array of month names in abbreviated form
  const monthNames = [
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

  // Extract the month and date components
  const monthIndex = date.getMonth();
  const monthName = monthNames[monthIndex];
  const day = date.getDate();

  // Create formatted strings for the month and date with leading zeros if necessary
  const formattedDay = day < 10 ? `0${day}` : `${day}`;

  // Combine the formatted month and date
  return `${monthName} ${formattedDay}`;
}
