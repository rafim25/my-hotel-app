const { Parser } = require('json2csv');

const reportTemplates = {
  revenue: [
    { label: 'Date', value: 'date' },
    { label: 'Total Revenue', value: 'totalRevenue' },
    { label: 'Number of Bookings', value: 'bookingCount' },
    { label: 'Average Booking Value', value: 'averageBookingValue' },
    { label: 'Payment Method', value: 'paymentMethod' }
  ],
  occupancy: [
    { label: 'Date', value: 'date' },
    { label: 'Total Rooms', value: 'totalRooms' },
    { label: 'Occupied Rooms', value: 'occupiedRooms' },
    { label: 'Occupancy Rate', value: 'occupancyRate' },
    { label: 'Average Daily Rate', value: 'averageDailyRate' }
  ]
};

exports.generateReport = async (data, type) => {
  const fields = reportTemplates[type];
  const parser = new Parser({ fields });
  return parser.parse(data);
}; 