const PDFDocument = require('pdfkit');
const Chart = require('chart.js');
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');

class PDFGenerator {
  static async generateReport(data, type) {
    const doc = new PDFDocument();
    const chartCanvas = new ChartJSNodeCanvas({ width: 600, height: 300 });

    // Add header
    doc.fontSize(25).text(`${type.charAt(0).toUpperCase() + type.slice(1)} Report`, {
      align: 'center'
    });
    doc.moveDown();

    // Add period
    doc.fontSize(12).text(`Period: ${data.period}`, {
      align: 'center'
    });
    doc.moveDown(2);

    // Add charts based on report type
    switch (type) {
      case 'daily':
        await this.addDailyReportContent(doc, data, chartCanvas);
        break;
      case 'weekly':
        await this.addWeeklyReportContent(doc, data, chartCanvas);
        break;
      case 'monthly':
        await this.addMonthlyReportContent(doc, data, chartCanvas);
        break;
    }

    return doc;
  }

  static async addDailyReportContent(doc, data, chartCanvas) {
    // Add occupancy chart
    const occupancyChart = await chartCanvas.renderToBuffer({
      type: 'pie',
      data: {
        labels: ['Occupied', 'Available'],
        datasets: [{
          data: [data.occupancy.rooms_occupied, data.occupancy.total_rooms - data.occupancy.rooms_occupied],
          backgroundColor: ['#4CAF50', '#F44336']
        }]
      }
    });

    doc.image(occupancyChart, {
      fit: [500, 250],
      align: 'center'
    });
    doc.moveDown(2);

    // Add revenue summary
    doc.fontSize(16).text('Revenue Summary');
    doc.moveDown();
    doc.fontSize(12).text(`Total Revenue: $${data.revenue.total_revenue}`);
    doc.text(`Average Transaction: $${data.revenue.average_transaction}`);
    doc.text(`Number of Transactions: ${data.revenue.transaction_count}`);
    doc.moveDown(2);

    // Add booking statistics
    doc.fontSize(16).text('Booking Statistics');
    doc.moveDown();
    doc.fontSize(12).text(`Total Bookings: ${data.bookings.total_bookings}`);
    doc.text(`Average Booking Value: $${data.bookings.average_booking_value}`);
  }

  // Add similar methods for weekly and monthly reports...
}

module.exports = PDFGenerator; 