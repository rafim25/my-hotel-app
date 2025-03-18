const Room = require('../models/Room');
const { uploadToS3 } = require('../utils/fileUpload');
const { NotFoundError } = require('../utils/errors');

exports.getAllRooms = async (req, res) => {
  try {
    const { category, price_min, price_max, capacity } = req.query;
    const filters = {
      ...(category && { category_id: parseInt(category) }),
      ...(price_min && { price_min: parseFloat(price_min) }),
      ...(price_max && { price_max: parseFloat(price_max) }),
      ...(capacity && { capacity: parseInt(capacity) }),
    };

    const rooms = await Room.findAll(filters);
    res.json(rooms);
  } catch (error) {
    next(error);
  }
};

exports.getRoomById = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      throw new NotFoundError('Room not found');
    }
    res.json(room);
  } catch (error) {
    next(error);
  }
};

exports.createRoom = async (req, res, next) => {
  try {
    const roomData = req.body;
    
    // Handle image upload if present
    if (req.file) {
      const imageUrl = await uploadToS3(req.file);
      roomData.image = imageUrl;
    }

    const roomId = await Room.create(roomData);
    const room = await Room.findById(roomId);
    
    res.status(201).json(room);
  } catch (error) {
    next(error);
  }
};

exports.updateRoom = async (req, res, next) => {
  try {
    const roomId = req.params.id;
    const roomData = req.body;

    if (req.file) {
      const imageUrl = await uploadToS3(req.file);
      roomData.image = imageUrl;
    }

    const success = await Room.update(roomId, roomData);
    if (!success) {
      throw new NotFoundError('Room not found');
    }

    const updatedRoom = await Room.findById(roomId);
    res.json(updatedRoom);
  } catch (error) {
    next(error);
  }
};

exports.deleteRoom = async (req, res, next) => {
  try {
    const success = await Room.delete(req.params.id);
    if (!success) {
      throw new NotFoundError('Room not found');
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

exports.uploadRoomImages = async (req, res, next) => {
  try {
    const roomId = req.params.id;
    const imageUrls = [];

    // Upload multiple images
    for (const file of req.files) {
      const imageUrl = await uploadToS3(file);
      imageUrls.push(imageUrl);
    }

    await Room.addImages(roomId, imageUrls);
    res.json({ message: 'Images uploaded successfully', imageUrls });
  } catch (error) {
    next(error);
  }
};

exports.getRoomCategories = async (req, res, next) => {
  try {
    const categories = await Room.getCategories();
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

exports.checkAvailability = async (req, res, next) => {
  try {
    const { roomId, checkIn, checkOut } = req.query;
    const isAvailable = await Room.checkAvailability(roomId, checkIn, checkOut);
    res.json({ available: isAvailable });
  } catch (error) {
    next(error);
  }
};

exports.toggleFavorite = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const roomId = req.params.id;
    const result = await Room.toggleFavorite(userId, roomId);
    res.json(result);
  } catch (error) {
    next(error);
  }
}; 