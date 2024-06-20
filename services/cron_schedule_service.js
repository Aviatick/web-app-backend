const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cron = require('node-cron');

// Fungsi untuk menghasilkan angka acak dalam rentang tertentu dan membulatkannya ke kelipatan seratus ribu
function getRandomPrice(min, max) {
  const roundedMin = Math.ceil(min / 50000);
  const roundedMax = Math.floor(max / 50000);
  return (
    Math.floor(Math.random() * (roundedMax - roundedMin + 1) + roundedMin) *
    50000
  );
}

async function addFlight() {
  function getTimeOffset(additionalHours) {
    const oneWeekInHours = 7 * 24;
    const totalHours = oneWeekInHours + additionalHours;
    const millisecondsOffset = totalHours * 60 * 60 * 1000;
    return new Date(new Date().getTime() + millisecondsOffset).toISOString();
  }

//   convert to UTC+7
  const departureTimeUTC7 = getTimeOffset(7);

  const flightsData = [
    {
      flightNumber: 'AA' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(7),
      arrivalTime: getTimeOffset(9),
      departureAirportId: 1,
      arrivalAirportId: 2,
    },
    {
      flightNumber: 'DL' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(7),
      arrivalTime: getTimeOffset(9),
      departureAirportId: 2,
      arrivalAirportId: 3,
    },
    {
      flightNumber: 'UA' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(7),
      arrivalTime: getTimeOffset(9),
      departureAirportId: 3,
      arrivalAirportId: 4,
    },
    {
      flightNumber: 'SW' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(7),
      arrivalTime: getTimeOffset(10),
      departureAirportId: 4,
      arrivalAirportId: 5,
    },
    {
      flightNumber: 'AS' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(7),
      arrivalTime: getTimeOffset(10),
      departureAirportId: 5,
      arrivalAirportId: 1,
    },
    {
      flightNumber: 'GA' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(7),
      arrivalTime: getTimeOffset(10),
      departureAirportId: 6,
      arrivalAirportId: 7,
    },
    {
      flightNumber: 'JT' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(7),
      arrivalTime: getTimeOffset(10),
      departureAirportId: 7,
      arrivalAirportId: 8,
    },
    {
      flightNumber: 'ID' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(7),
      arrivalTime: getTimeOffset(10),
      departureAirportId: 8,
      arrivalAirportId: 9,
    },
    {
      flightNumber: 'SJ' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(7),
      arrivalTime: getTimeOffset(10),
      departureAirportId: 9,
      arrivalAirportId: 10,
    },
    {
      flightNumber: 'QG' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(7),
      arrivalTime: getTimeOffset(10),
      departureAirportId: 10,
      arrivalAirportId: 6,
    },
    {
      flightNumber: 'AA' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(7),
      arrivalTime: getTimeOffset(10),
      departureAirportId: 1,
      arrivalAirportId: 3,
    },
    {
      flightNumber: 'DL' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(7),
      arrivalTime: getTimeOffset(10),
      departureAirportId: 2,
      arrivalAirportId: 4,
    },
    {
      flightNumber: 'UA' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(7),
      arrivalTime: getTimeOffset(11),
      departureAirportId: 3,
      arrivalAirportId: 5,
    },
    {
      flightNumber: 'SW' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(7),
      arrivalTime: getTimeOffset(11),
      departureAirportId: 4,
      arrivalAirportId: 1,
    },
    {
      flightNumber: 'AS' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(7),
      arrivalTime: getTimeOffset(10),
      departureAirportId: 5,
      arrivalAirportId: 2,
    },
    {
      flightNumber: 'GA' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(7),
      arrivalTime: getTimeOffset(9),
      departureAirportId: 6,
      arrivalAirportId: 8,
    },
    {
      flightNumber: 'JT' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(7),
      arrivalTime: getTimeOffset(11),
      departureAirportId: 7,
      arrivalAirportId: 9,
    },
    {
      flightNumber: 'ID' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(7),
      arrivalTime: getTimeOffset(11),
      departureAirportId: 8,
      arrivalAirportId: 10,
    },
    {
      flightNumber: 'SJ' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(8),
      arrivalTime: getTimeOffset(11),
      departureAirportId: 9,
      arrivalAirportId: 6,
    },
    {
      flightNumber: 'QG' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(7),
      arrivalTime: getTimeOffset(11),
      departureAirportId: 10,
      arrivalAirportId: 7,
    },
    {
      flightNumber: 'AA' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(7),
      arrivalTime: getTimeOffset(20),
      departureAirportId: 1,
      arrivalAirportId: 4,
    },
    {
      flightNumber: 'DL' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(9),
      arrivalTime: getTimeOffset(12),
      departureAirportId: 2,
      arrivalAirportId: 5,
    },
    {
      flightNumber: 'UA' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(9),
      arrivalTime: getTimeOffset(12),
      departureAirportId: 3,
      arrivalAirportId: 1,
    },
    {
      flightNumber: 'SW' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(8),
      arrivalTime: getTimeOffset(11),
      departureAirportId: 4,
      arrivalAirportId: 2,
    },
    {
      flightNumber: 'AS' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(7),
      arrivalTime: getTimeOffset(11),
      departureAirportId: 5,
      arrivalAirportId: 3,
    },
    {
      flightNumber: 'GA' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(7),
      arrivalTime: getTimeOffset(12),
      departureAirportId: 6,
      arrivalAirportId: 9,
    },
    {
      flightNumber: 'JT' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(7),
      arrivalTime: getTimeOffset(9),
      departureAirportId: 7,
      arrivalAirportId: 10,
    },
    {
      flightNumber: 'ID' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(9),
      arrivalTime: getTimeOffset(12),
      departureAirportId: 8,
      arrivalAirportId: 6,
    },
    {
      flightNumber: 'SJ' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(9),
      arrivalTime: getTimeOffset(12),
      departureAirportId: 9,
      arrivalAirportId: 7,
    },
    {
      flightNumber: 'QG' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(7),
      arrivalTime: getTimeOffset(11),
      departureAirportId: 10,
      arrivalAirportId: 8,
    },
    {
      flightNumber: 'AA' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(9),
      arrivalTime: getTimeOffset(13),
      departureAirportId: 1,
      arrivalAirportId: 5,
    },
    {
      flightNumber: 'DL' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(10),
      arrivalTime: getTimeOffset(13),
      departureAirportId: 2,
      arrivalAirportId: 1,
    },
    {
      flightNumber: 'UA' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(10),
      arrivalTime: getTimeOffset(12),
      departureAirportId: 3,
      arrivalAirportId: 2,
    },
    {
      flightNumber: 'SW' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(9),
      arrivalTime: getTimeOffset(12),
      departureAirportId: 4,
      arrivalAirportId: 3,
    },
    {
      flightNumber: 'AS' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(17),
      arrivalTime: getTimeOffset(19),
      departureAirportId: 5,
      arrivalAirportId: 4,
    },
    {
      flightNumber: 'GA' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(10),
      arrivalTime: getTimeOffset(12),
      departureAirportId: 6,
      arrivalAirportId: 10,
    },
    {
      flightNumber: 'JT' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(9),
      arrivalTime: getTimeOffset(14),
      departureAirportId: 7,
      arrivalAirportId: 1,
    },
    {
      flightNumber: 'ID' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(9),
      arrivalTime: getTimeOffset(13),
      departureAirportId: 8,
      arrivalAirportId: 2,
    },
    {
      flightNumber: 'SJ' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(10),
      arrivalTime: getTimeOffset(13),
      departureAirportId: 9,
      arrivalAirportId: 3,
    },
    {
      flightNumber: 'QG' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(7),
      arrivalTime: getTimeOffset(11),
      departureAirportId: 10,
      arrivalAirportId: 4,
    },
    {
      flightNumber: 'AA' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(11),
      arrivalTime: getTimeOffset(13),
      departureAirportId: 1,
      arrivalAirportId: 6,
    },
    {
      flightNumber: 'DL' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(11),
      arrivalTime: getTimeOffset(13),
      departureAirportId: 2,
      arrivalAirportId: 7,
    },
    {
      flightNumber: 'UA' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(9),
      arrivalTime: getTimeOffset(12),
      departureAirportId: 3,
      arrivalAirportId: 8,
    },
    {
      flightNumber: 'SW' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(8),
      arrivalTime: getTimeOffset(13),
      departureAirportId: 4,
      arrivalAirportId: 9,
    },
    {
      flightNumber: 'AS' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(11),
      arrivalTime: getTimeOffset(13),
      departureAirportId: 5,
      arrivalAirportId: 10,
    },
    {
      flightNumber: 'GA' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(10),
      arrivalTime: getTimeOffset(15),
      departureAirportId: 6,
      arrivalAirportId: 1,
    },
    {
      flightNumber: 'JT' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(12),
      arrivalTime: getTimeOffset(14),
      departureAirportId: 7,
      arrivalAirportId: 2,
    },
    {
      flightNumber: 'ID' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(12),
      arrivalTime: getTimeOffset(14),
      departureAirportId: 8,
      arrivalAirportId: 3,
    },
    {
      flightNumber: 'SJ' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(10),
      arrivalTime: getTimeOffset(12),
      departureAirportId: 9,
      arrivalAirportId: 4,
    },
    {
      flightNumber: 'QG' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(12),
      arrivalTime: getTimeOffset(14),
      departureAirportId: 10,
      arrivalAirportId: 5,
    },
    {
      flightNumber: 'AA' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(12),
      arrivalTime: getTimeOffset(14),
      departureAirportId: 1,
      arrivalAirportId: 7,
    },
    {
      flightNumber: 'DL' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(9),
      arrivalTime: getTimeOffset(13),
      departureAirportId: 2,
      arrivalAirportId: 8,
    },
    {
      flightNumber: 'UA' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(10),
      arrivalTime: getTimeOffset(14),
      departureAirportId: 3,
      arrivalAirportId: 9,
    },
    {
      flightNumber: 'SW' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(11),
      arrivalTime: getTimeOffset(14),
      departureAirportId: 4,
      arrivalAirportId: 10,
    },
    {
      flightNumber: 'AS' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(13),
      arrivalTime: getTimeOffset(16),
      departureAirportId: 5,
      arrivalAirportId: 1,
    },
    {
      flightNumber: 'GA' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(13),
      arrivalTime: getTimeOffset(15),
      departureAirportId: 6,
      arrivalAirportId: 2,
    },
    {
      flightNumber: 'JT' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(12),
      arrivalTime: getTimeOffset(15),
      departureAirportId: 7,
      arrivalAirportId: 3,
    },
    {
      flightNumber: 'ID' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(10),
      arrivalTime: getTimeOffset(13),
      departureAirportId: 8,
      arrivalAirportId: 4,
    },
    {
      flightNumber: 'SJ' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(13),
      arrivalTime: getTimeOffset(15),
      departureAirportId: 9,
      arrivalAirportId: 5,
    },
    {
      flightNumber: 'QG' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(12),
      arrivalTime: getTimeOffset(14),
      departureAirportId: 10,
      arrivalAirportId: 6,
    },
    {
      flightNumber: 'AA' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(11),
      arrivalTime: getTimeOffset(14),
      departureAirportId: 1,
      arrivalAirportId: 8,
    },
    {
      flightNumber: 'DL' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(13),
      arrivalTime: getTimeOffset(15),
      departureAirportId: 2,
      arrivalAirportId: 9,
    },
    {
      flightNumber: 'UA' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(10),
      arrivalTime: getTimeOffset(15),
      departureAirportId: 3,
      arrivalAirportId: 10,
    },
    {
      flightNumber: 'SW' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(15),
      arrivalTime: getTimeOffset(17),
      departureAirportId: 4,
      arrivalAirportId: 1,
    },
    {
      flightNumber: 'AS' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(13),
      arrivalTime: getTimeOffset(16),
      departureAirportId: 5,
      arrivalAirportId: 2,
    },
    {
      flightNumber: 'GA' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(13),
      arrivalTime: getTimeOffset(16),
      departureAirportId: 6,
      arrivalAirportId: 3,
    },
    {
      flightNumber: 'JT' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(12),
      arrivalTime: getTimeOffset(14),
      departureAirportId: 7,
      arrivalAirportId: 4,
    },
    {
      flightNumber: 'ID' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(13),
      arrivalTime: getTimeOffset(16),
      departureAirportId: 8,
      arrivalAirportId: 5,
    },
    {
      flightNumber: 'SJ' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(12),
      arrivalTime: getTimeOffset(15),
      departureAirportId: 9,
      arrivalAirportId: 6,
    },
    {
      flightNumber: 'QG' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(12),
      arrivalTime: getTimeOffset(15),
      departureAirportId: 10,
      arrivalAirportId: 7,
    },
    {
      flightNumber: 'AA' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(14),
      arrivalTime: getTimeOffset(16),
      departureAirportId: 1,
      arrivalAirportId: 9,
    },
    {
      flightNumber: 'DL' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(13),
      arrivalTime: getTimeOffset(16),
      departureAirportId: 2,
      arrivalAirportId: 10,
    },
    {
      flightNumber: 'UA' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(16),
      arrivalTime: getTimeOffset(18),
      departureAirportId: 3,
      arrivalAirportId: 1,
    },
    {
      flightNumber: 'SW' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(14),
      arrivalTime: getTimeOffset(17),
      departureAirportId: 4,
      arrivalAirportId: 2,
    },
    {
      flightNumber: 'AS' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(13),
      arrivalTime: getTimeOffset(17),
      departureAirportId: 5,
      arrivalAirportId: 3,
    },
    {
      flightNumber: 'GA' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(13),
      arrivalTime: getTimeOffset(15),
      departureAirportId: 6,
      arrivalAirportId: 4,
    },
    {
      flightNumber: 'JT' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(14),
      arrivalTime: getTimeOffset(17),
      departureAirportId: 7,
      arrivalAirportId: 5,
    },
    {
      flightNumber: 'ID' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(13),
      arrivalTime: getTimeOffset(16),
      departureAirportId: 8,
      arrivalAirportId: 6,
    },
    {
      flightNumber: 'SJ' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(13),
      arrivalTime: getTimeOffset(16),
      departureAirportId: 9,
      arrivalAirportId: 7,
    },
    {
      flightNumber: 'QG' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(12),
      arrivalTime: getTimeOffset(15),
      departureAirportId: 10,
      arrivalAirportId: 8,
    },
    {
      flightNumber: 'AA' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(14),
      arrivalTime: getTimeOffset(17),
      departureAirportId: 1,
      arrivalAirportId: 10,
    },
    {
      flightNumber: 'DL' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(16),
      arrivalTime: getTimeOffset(19),
      departureAirportId: 2,
      arrivalAirportId: 1,
    },
    {
      flightNumber: 'UA' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(15),
      arrivalTime: getTimeOffset(18),
      departureAirportId: 3,
      arrivalAirportId: 2,
    },
    {
      flightNumber: 'SW' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(16),
      arrivalTime: getTimeOffset(18),
      departureAirportId: 4,
      arrivalAirportId: 3,
    },
    {
      flightNumber: 'AS' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(13),
      arrivalTime: getTimeOffset(16),
      departureAirportId: 5,
      arrivalAirportId: 4,
    },
    {
      flightNumber: 'GA' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(15),
      arrivalTime: getTimeOffset(18),
      departureAirportId: 6,
      arrivalAirportId: 5,
    },
    {
      flightNumber: 'JT' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(15),
      arrivalTime: getTimeOffset(17),
      departureAirportId: 7,
      arrivalAirportId: 6,
    },
    {
      flightNumber: 'ID' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(14),
      arrivalTime: getTimeOffset(17),
      departureAirportId: 8,
      arrivalAirportId: 7,
    },
    {
      flightNumber: 'SJ' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(14),
      arrivalTime: getTimeOffset(16),
      departureAirportId: 9,
      arrivalAirportId: 8,
    },
    {
      flightNumber: 'QG' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(15),
      arrivalTime: getTimeOffset(17),
      departureAirportId: 10,
      arrivalAirportId: 9,
    },
    {
      flightNumber: 'AA' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(15),
      arrivalTime: getTimeOffset(19),
      departureAirportId: 1,
      arrivalAirportId: 2,
    },
    {
      flightNumber: 'DL' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(17),
      arrivalTime: getTimeOffset(19),
      departureAirportId: 2,
      arrivalAirportId: 3,
    },
    {
      flightNumber: 'UA' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(14),
      arrivalTime: getTimeOffset(17),
      departureAirportId: 3,
      arrivalAirportId: 4,
    },
    {
      flightNumber: 'SW' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(16),
      arrivalTime: getTimeOffset(19),
      departureAirportId: 4,
      arrivalAirportId: 5,
    },
    {
      flightNumber: 'AS' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(14),
      arrivalTime: getTimeOffset(18),
      departureAirportId: 5,
      arrivalAirportId: 6,
    },
    {
      flightNumber: 'GA' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(15),
      arrivalTime: getTimeOffset(18),
      departureAirportId: 6,
      arrivalAirportId: 7,
    },
    {
      flightNumber: 'JT' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(14),
      arrivalTime: getTimeOffset(17),
      departureAirportId: 7,
      arrivalAirportId: 8,
    },
    {
      flightNumber: 'ID' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(15),
      arrivalTime: getTimeOffset(18),
      departureAirportId: 8,
      arrivalAirportId: 9,
    },
    {
      flightNumber: 'SJ' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(16),
      arrivalTime: getTimeOffset(18),
      departureAirportId: 9,
      arrivalAirportId: 10,
    },
    {
      flightNumber: 'QG' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(18),
      arrivalTime: getTimeOffset(20),
      departureAirportId: 10,
      arrivalAirportId: 1,
    },
    {
      flightNumber: 'AA' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(16),
      arrivalTime: getTimeOffset(20),
      departureAirportId: 1,
      arrivalAirportId: 2,
    },
    {
      flightNumber: 'DL' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(19),
      arrivalTime: getTimeOffset(21),
      departureAirportId: 2,
      arrivalAirportId: 1,
    },
    {
      flightNumber: 'UA' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(16),
      arrivalTime: getTimeOffset(18),
      departureAirportId: 3,
      arrivalAirportId: 4,
    },
    {
      flightNumber: 'SW' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(17),
      arrivalTime: getTimeOffset(20),
      departureAirportId: 4,
      arrivalAirportId: 3,
    },
    {
      flightNumber: 'AS' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(18),
      arrivalTime: getTimeOffset(20),
      departureAirportId: 5,
      arrivalAirportId: 6,
    },
    {
      flightNumber: 'GA' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(18),
      arrivalTime: getTimeOffset(20),
      departureAirportId: 6,
      arrivalAirportId: 5,
    },
    {
      flightNumber: 'JT' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(15),
      arrivalTime: getTimeOffset(18),
      departureAirportId: 7,
      arrivalAirportId: 8,
    },
    {
      flightNumber: 'ID' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(18),
      arrivalTime: getTimeOffset(19),
      departureAirportId: 8,
      arrivalAirportId: 7,
    },
    {
      flightNumber: 'SJ' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(17),
      arrivalTime: getTimeOffset(19),
      departureAirportId: 9,
      arrivalAirportId: 10,
    },
    {
      flightNumber: 'QG' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(17),
      arrivalTime: getTimeOffset(19),
      departureAirportId: 10,
      arrivalAirportId: 9,
    },
    {
      flightNumber: 'AA' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(7),
      arrivalTime: getTimeOffset(11),
      departureAirportId: 11,
      arrivalAirportId: 12,
    },
    {
      flightNumber: 'DL' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(9),
      arrivalTime: getTimeOffset(13),
      departureAirportId: 12,
      arrivalAirportId: 11,
    },
    {
      flightNumber: 'UA' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(7),
      arrivalTime: getTimeOffset(10),
      departureAirportId: 13,
      arrivalAirportId: 14,
    },
    {
      flightNumber: 'SW' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(7),
      arrivalTime: getTimeOffset(10),
      departureAirportId: 14,
      arrivalAirportId: 13,
    },
    {
      flightNumber: 'AS' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(15),
      arrivalTime: getTimeOffset(18),
      departureAirportId: 15,
      arrivalAirportId: 16,
    },
    {
      flightNumber: 'GA' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(7),
      arrivalTime: getTimeOffset(10),
      departureAirportId: 16,
      arrivalAirportId: 15,
    },
    {
      flightNumber: 'JT' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(10),
      arrivalTime: getTimeOffset(13),
      departureAirportId: 17,
      arrivalAirportId: 18,
    },
    {
      flightNumber: 'ID' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(17),
      arrivalTime: getTimeOffset(20),
      departureAirportId: 18,
      arrivalAirportId: 17,
    },
    {
      flightNumber: 'SJ' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(12),
      arrivalTime: getTimeOffset(15),
      departureAirportId: 19,
      arrivalAirportId: 20,
    },
    {
      flightNumber: 'QG' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(17),
      arrivalTime: getTimeOffset(20),
      departureAirportId: 20,
      arrivalAirportId: 19,
    },
    {
      flightNumber: 'AA' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(11),
      arrivalTime: getTimeOffset(15),
      departureAirportId: 21,
      arrivalAirportId: 22,
    },
    {
      flightNumber: 'DL' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(14),
      arrivalTime: getTimeOffset(18),
      departureAirportId: 22,
      arrivalAirportId: 21,
    },
    {
      flightNumber: 'UA' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(7),
      arrivalTime: getTimeOffset(10),
      departureAirportId: 23,
      arrivalAirportId: 24,
    },
    {
      flightNumber: 'SW' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(16),
      arrivalTime: getTimeOffset(19),
      departureAirportId: 24,
      arrivalAirportId: 23,
    },
    {
      flightNumber: 'AS' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(7),
      arrivalTime: getTimeOffset(10),
      departureAirportId: 25,
      arrivalAirportId: 26,
    },
    {
      flightNumber: 'GA' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(11),
      arrivalTime: getTimeOffset(14),
      departureAirportId: 26,
      arrivalAirportId: 25,
    },
    {
      flightNumber: 'JT' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(7),
      arrivalTime: getTimeOffset(10),
      departureAirportId: 27,
      arrivalAirportId: 28,
    },
    {
      flightNumber: 'ID' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(12),
      arrivalTime: getTimeOffset(15),
      departureAirportId: 28,
      arrivalAirportId: 27,
    },
    {
      flightNumber: 'SJ' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(12),
      arrivalTime: getTimeOffset(15),
      departureAirportId: 29,
      arrivalAirportId: 30,
    },
    {
      flightNumber: 'QG' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(17),
      arrivalTime: getTimeOffset(20),
      departureAirportId: 30,
      arrivalAirportId: 29,
    },
    {
      flightNumber: 'AA' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(7),
      arrivalTime: getTimeOffset(11),
      departureAirportId: 31,
      arrivalAirportId: 32,
    },
    {
      flightNumber: 'DL' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(13),
      arrivalTime: getTimeOffset(17),
      departureAirportId: 32,
      arrivalAirportId: 31,
    },
    {
      flightNumber: 'UA' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(8),
      arrivalTime: getTimeOffset(12),
      departureAirportId: 33,
      arrivalAirportId: 34,
    },
    {
      flightNumber: 'SW' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(14),
      arrivalTime: getTimeOffset(18),
      departureAirportId: 34,
      arrivalAirportId: 33,
    },
    {
      flightNumber: 'AS' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(12),
      arrivalTime: getTimeOffset(15),
      departureAirportId: 35,
      arrivalAirportId: 36,
    },
    {
      flightNumber: 'GA' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(17),
      arrivalTime: getTimeOffset(20),
      departureAirportId: 36,
      arrivalAirportId: 35,
    },
    {
      flightNumber: 'JT' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(7),
      arrivalTime: getTimeOffset(10),
      departureAirportId: 37,
      arrivalAirportId: 38,
    },
    {
      flightNumber: 'ID' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(8),
      arrivalTime: getTimeOffset(11),
      departureAirportId: 38,
      arrivalAirportId: 37,
    },
    {
      flightNumber: 'SJ' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(7),
      arrivalTime: getTimeOffset(10),
      departureAirportId: 39,
      arrivalAirportId: 40,
    },
    {
      flightNumber: 'QG' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(9),
      arrivalTime: getTimeOffset(12),
      departureAirportId: 40,
      arrivalAirportId: 39,
    },
    {
      flightNumber: 'AA' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(9),
      arrivalTime: getTimeOffset(12),
      departureAirportId: 41,
      arrivalAirportId: 42,
    },
    {
      flightNumber: 'DL' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(14),
      arrivalTime: getTimeOffset(17),
      departureAirportId: 42,
      arrivalAirportId: 41,
    },
    {
      flightNumber: 'UA' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(7),
      arrivalTime: getTimeOffset(10),
      departureAirportId: 43,
      arrivalAirportId: 44,
    },
    {
      flightNumber: 'SW' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(12),
      arrivalTime: getTimeOffset(15),
      departureAirportId: 44,
      arrivalAirportId: 43,
    },
    {
      flightNumber: 'AS' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(7),
      arrivalTime: getTimeOffset(10),
      departureAirportId: 45,
      arrivalAirportId: 46,
    },
    {
      flightNumber: 'GA' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(11),
      arrivalTime: getTimeOffset(14),
      departureAirportId: 46,
      arrivalAirportId: 45,
    },
    {
      flightNumber: 'JT' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(13),
      arrivalTime: getTimeOffset(16),
      departureAirportId: 47,
      arrivalAirportId: 48,
    },
    {
      flightNumber: 'ID' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(17),
      arrivalTime: getTimeOffset(20),
      departureAirportId: 48,
      arrivalAirportId: 47,
    },
    {
      flightNumber: 'SJ' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(8),
      arrivalTime: getTimeOffset(11),
      departureAirportId: 49,
      arrivalAirportId: 50,
    },
    {
      flightNumber: 'QG' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(13),
      arrivalTime: getTimeOffset(16),
      departureAirportId: 50,
      arrivalAirportId: 49,
    },
    {
      flightNumber: 'AA' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(7),
      arrivalTime: getTimeOffset(10),
      departureAirportId: 51,
      arrivalAirportId: 52,
    },
    {
      flightNumber: 'DL' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(7),
      arrivalTime: getTimeOffset(10),
      departureAirportId: 52,
      arrivalAirportId: 51,
    },
    {
      flightNumber: 'UA' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(9),
      arrivalTime: getTimeOffset(12),
      departureAirportId: 53,
      arrivalAirportId: 54,
    },
    {
      flightNumber: 'SW' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(14),
      arrivalTime: getTimeOffset(17),
      departureAirportId: 54,
      arrivalAirportId: 53,
    },
    {
      flightNumber: 'AS' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(7),
      arrivalTime: getTimeOffset(10),
      departureAirportId: 55,
      arrivalAirportId: 56,
    },
    {
      flightNumber: 'GA' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(11),
      arrivalTime: getTimeOffset(14),
      departureAirportId: 56,
      arrivalAirportId: 55,
    },
    {
      flightNumber: 'JT' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(8),
      arrivalTime: getTimeOffset(11),
      departureAirportId: 57,
      arrivalAirportId: 58,
    },
    {
      flightNumber: 'ID' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(13),
      arrivalTime: getTimeOffset(16),
      departureAirportId: 58,
      arrivalAirportId: 57,
    },
    {
      flightNumber: 'SJ' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(7),
      arrivalTime: getTimeOffset(9),
      departureAirportId: 59,
      arrivalAirportId: 60,
    },
    {
      flightNumber: 'QG' + Math.floor(100 + Math.random() * 900),
      departureTime: getTimeOffset(10),
      arrivalTime: getTimeOffset(12),
      departureAirportId: 60,
      arrivalAirportId: 59,
    },
  ];

  const ticketClasses = [
    { classId: 1, price: getRandomPrice(7000000, 14000000) }, // First
    { classId: 2, price: getRandomPrice(3000000, 8000000) }, // Business
    { classId: 3, price: getRandomPrice(750000, 2000000) }, // Economy
  ];

  try {
    for (const flight of flightsData) {
      const newFlight = await prisma.flight.create({ data: flight });

      const ticketPromises = ticketClasses.map((ticketClass) =>
        prisma.ticket.create({
          data: {
            price: ticketClass.price,
            flightId: newFlight.id,
            airplaneSeatClassId: ticketClass.classId,
          },
        })
      );

      const newTickets = await Promise.all(ticketPromises);
    }
  } catch (error) {
    console.error('Error adding flight and tickets:', error);
  }
}

const flightCron = cron.schedule('* * * * *', addFlight, {
  scheduled: false,
  timezone: 'Asia/Jakarta',
});


module.exports = { flightCron };
