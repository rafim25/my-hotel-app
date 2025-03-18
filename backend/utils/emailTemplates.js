exports.getReportEmailTemplate = (reportType, data) => {
  const templates = {
    daily: `
      <h1>Daily Operations Report - ${data.date}</h1>
      <div style="margin: 20px 0;">
        <h2>Occupancy Overview</h2>
        <ul>
          <li>Rooms Occupied: ${data.occupancy.rooms_occupied}</li>
          <li>Occupancy Rate: ${data.occupancy.occupancy_rate}%</li>
        </ul>
      </div>
      <div style="margin: 20px 0;">
        <h2>Revenue Summary</h2>
        <ul>
          <li>Total Revenue: $${data.revenue.total_revenue}</li>
          <li>Average Transaction: $${data.revenue.average_transaction}</li>
          <li>Transaction Count: ${data.revenue.transaction_count}</li>
        </ul>
      </div>
      <div style="margin: 20px 0;">
        <h2>Booking Statistics</h2>
        <ul>
          <li>Total Bookings: ${data.bookings.total_bookings}</li>
          <li>Average Booking Value: $${data.bookings.average_booking_value}</li>
        </ul>
      </div>
    `,
    weekly: `
      <h1>Weekly Performance Report - ${data.period}</h1>
      <div style="margin: 20px 0;">
        <h2>Room Performance</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <th style="border: 1px solid #ddd; padding: 8px;">Room</th>
            <th style="border: 1px solid #ddd; padding: 8px;">Bookings</th>
            <th style="border: 1px solid #ddd; padding: 8px;">Revenue</th>
          </tr>
          ${data.roomPerformance.map(room => `
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">${room.name}</td>
              <td style="border: 1px solid #ddd; padding: 8px;">${room.total_bookings}</td>
              <td style="border: 1px solid #ddd; padding: 8px;">$${room.total_revenue}</td>
            </tr>
          `).join('')}
        </table>
      </div>
    `,
    monthly: `
      <h1>Monthly Business Report - ${data.period}</h1>
      <div style="margin: 20px 0;">
        <h2>Revenue Analysis</h2>
        <div style="margin: 10px 0;">
          ${data.revenue.map(metric => `
            <p><strong>${metric.payment_method}:</strong> $${metric.total_revenue}</p>
          `).join('')}
        </div>
      </div>
      <div style="margin: 20px 0;">
        <h2>Occupancy Trends</h2>
        <p>Average Occupancy Rate: ${
          data.occupancy.reduce((acc, curr) => acc + curr.occupancy_rate, 0) / 
          data.occupancy.length
        }%</p>
      </div>
    `
  };

  return templates[reportType] || '';
}; 