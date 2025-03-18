const Booking = require('../models/Booking');
const Room = require('../models/Room');
const { NotFoundError, ValidationError } = require('../utils/errors');
const { sendBookingConfirmation } = require('../utils/emailService');
const { processPayment } = require('../utils/paymentService');

exports.createBooking = async (req, res, next) => {
  try {
    const { roomId, checkIn, checkOut, guests, paymentMethod, paymentToken } = req.body;
    const userId = req.user.userId;

    // Check room availability
    const isAvailable = await Room.checkAvailability(roomId, checkIn, checkOut);
    if (!isAvailable) {
      throw new ValidationError('Room is not available for selected dates');
    }

    // Get room details for price calculation
    const room = await Room.findById(roomId);
    if (!room) {
      throw new NotFoundError('Room not found');
    }

    // Calculate total amount
    const nights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
    const totalAmount = room.price * nights;

    // Process payment
    const paymentResult = await processPayment({
      amount: totalAmount,
      currency: 'USD',
      paymentMethod,
      paymentToken,
      description: `Room booking for ${room.name}`
    });

    // Create booking
    const bookingData = {
      user_id: userId,
      room_id: roomId,
      check_in: checkIn,
      check_out: checkOut,
      guests,
      total_amount: totalAmount,
      payment_status: paymentResult.status,
      payment_method: paymentMethod
    };

    const { bookingId, booking_reference } = await Booking.create(bookingData);
    const booking = await Booking.findByReference(booking_reference);

    // Send confirmation email
    await sendBookingConfirmation(booking, req.user);

    res.status(201).json({
      message: 'Booking created successfully',
      booking
    });
  } catch (error) {
    next(error);
  }
};

exports.getUserBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.getUserBookings(req.user.userId);
    res.json(bookings);
  } catch (error) {
    next(error);
  }
};

exports.getBookingByReference = async (req, res, next) => {
  try {
    const booking = await Booking.findByReference(req.params.reference);
    if (!booking) {
      throw new NotFoundError('Booking not found');
    }

    // Check if user has access to this booking
    if (booking.user_id !== req.user.userId && req.user.role !== 'admin') {
      throw new ForbiddenError('Access denied');
    }

    res.json(booking);
  } catch (error) {
    next(error);
  }
};

exports.cancelBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      throw new NotFoundError('Booking not found');
    }

    // Check cancellation policy
    const checkIn = new Date(booking.check_in);
    const today = new Date();
    const daysUntilCheckIn = Math.ceil((checkIn - today) / (1000 * 60 * 60 * 24));

    if (daysUntilCheckIn < 2) {
      throw new ValidationError('Cancellation not allowed within 48 hours of check-in');
    }

    await Booking.updateStatus(req.params.id, 'cancelled');
    res.json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    next(error);
  }
};

// Admin controllers
exports.getAllBookings = async (req, res, next) => {
  try {
    const { status, fromDate, toDate } = req.query;
    const filters = {
      ...(status && { status }),
      ...(fromDate && { fromDate }),
      ...(toDate && { toDate })
    };

    const bookings = await Booking.findAll(filters);
    res.json(bookings);
  } catch (error) {
    next(error);
  }
};

exports.updateBookingStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    await Booking.updateStatus(req.params.id, status);
    const updatedBooking = await Booking.findById(req.params.id);
    res.json(updatedBooking);
  } catch (error) {
    next(error);
  }
};

exports.getBookingStats = async (req, res, next) => {
  try {
    const stats = await Booking.getBookingStats();
    res.json(stats);
  } catch (error) {
    next(error);
  }
}; 