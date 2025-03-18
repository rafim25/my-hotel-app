export const mockBookings = [
  {
    id: 1,
    reference: 'BK001',
    room_name: 'Deluxe Room',
    status: 'confirmed',
    check_in: '2024-03-20',
    check_out: '2024-03-25',
    total_amount: 1495,
    guest_name: 'John Doe',
    room_id: 1,
  },
  {
    id: 2,
    reference: 'BK002',
    room_name: 'Executive Suite',
    status: 'pending',
    check_in: '2024-04-01',
    check_out: '2024-04-05',
    total_amount: 2495,
    guest_name: 'Jane Smith',
    room_id: 2,
  },
  {
    id: 3,
    reference: 'BK003',
    room_name: 'Family Room',
    status: 'completed',
    check_in: '2024-02-15',
    check_out: '2024-02-18',
    total_amount: 1197,
    guest_name: 'Mike Johnson',
    room_id: 3,
  },
  {
    id: 4,
    reference: 'BK004',
    room_name: 'Ocean View Suite',
    status: 'cancelled',
    check_in: '2024-03-10',
    check_out: '2024-03-15',
    total_amount: 2995,
    guest_name: 'Sarah Williams',
    room_id: 4,
  },
];

export const mockPreferences = {
  roomPreferences: {
    roomType: 'deluxe',
    floorLevel: 'high',
    specialRequests: 'Quiet room away from elevator',
  },
  diningPreferences: {
    dietaryRestrictions: ['vegetarian'],
    preferredMealTimes: {
      breakfast: '7:00',
      lunch: '12:30',
      dinner: '19:00',
    },
  },
  communicationPreferences: {
    language: 'english',
    timeFormat: '24h',
  },
};

export const mockNotificationSettings = {
  email: {
    bookingConfirmation: true,
    specialOffers: true,
    newsletter: false,
    reminders: true,
  },
  sms: {
    bookingConfirmation: true,
    checkInReminder: true,
    specialOffers: false,
  },
  pushNotifications: {
    bookingUpdates: true,
    promotions: false,
    newsAndUpdates: true,
  },
};

export const mockRooms = [
  {
    id: 1,
    name: 'Deluxe Room',
    type: 'deluxe',
    price: 299,
    description: 'Spacious room with city view',
    features: {
      'King Bed': true,
      'City View': true,
      'Free WiFi': true,
      'Mini Bar': true,
      'Smart TV': true,
      'Room Service': true,
    },
    images: [
      'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?q=80&w=2074',
      'https://images.unsplash.com/photo-1590490359683-658d3d23f972?q=80&w=2074',
      'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=2074',
      'https://images.unsplash.com/photo-1587985064135-0366536eab42?q=80&w=2074',
    ],
    rating: 4.8,
    size: '45m²',
    maxOccupancy: 2,
  },
  {
    id: 2,
    name: 'Executive Suite',
    type: 'suite',
    price: 499,
    description: 'Luxury suite with separate living area',
    features: {
      'King Bed': true,
      'City View': true,
      'Free WiFi': true,
      'Mini Bar': true,
      'Smart TV': true,
      'Room Service': true,
      'Living Room': true,
    },
    images: [
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070',
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?q=80&w=2070',
      'https://images.unsplash.com/photo-1566195992011-5f6b21e539aa?q=80&w=2070',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2070',
    ],
    rating: 4.9,
    size: '65m²',
    maxOccupancy: 3,
  },
  {
    id: 3,
    name: 'Family Room',
    type: 'family',
    price: 399,
    description: 'Perfect for families with extra space',
    features: {
      'King Bed': true,
      'Free WiFi': true,
      'Smart TV': true,
      'Kids Area': true,
      'Game Console': true,
      'Room Service': true,
      'Mini Bar': true,
    },
    images: [
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=2070',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=2070',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=2074',
      'https://images.unsplash.com/photo-1630699144867-37acec97df5a?q=80&w=2070',
    ],
    rating: 4.7,
    size: '55m²',
    maxOccupancy: 4,
  },
  {
    id: 4,
    name: 'Ocean View Suite',
    type: 'suite',
    price: 599,
    description: 'Luxurious suite with panoramic ocean views',
    features: {
      'King Bed': true,
      'Ocean View': true,
      'Free WiFi': true,
      'Mini Bar': true,
      'Smart TV': true,
      'Room Service': true,
      'Living Room': true,
      'Balcony': true,
    },
    images: [
      'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?q=80&w=2074',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2070',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070',
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070',
    ],
    rating: 5.0,
    size: '75m²',
    maxOccupancy: 3,
  },
];

export const mockReviews = {
  1: [ // Reviews for room with id 1
    {
      id: 1,
      userName: "John Smith",
      rating: 5,
      date: "2024-02-15",
      comment: "Excellent room with amazing city views. The bed was super comfortable and the service was impeccable.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100"
    },
    {
      id: 2,
      userName: "Sarah Johnson",
      rating: 4,
      date: "2024-02-10",
      comment: "Great stay! The room was clean and spacious. Only minor issue was the WiFi being a bit slow at times.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100"
    },
    {
      id: 3,
      userName: "Michael Brown",
      rating: 5,
      date: "2024-02-05",
      comment: "Perfect location and fantastic amenities. Will definitely stay here again!",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100"
    }
  ],
  2: [ // Reviews for room with id 2
    {
      id: 4,
      userName: "Emily Davis",
      rating: 5,
      date: "2024-02-12",
      comment: "The executive suite exceeded our expectations. Stunning views and excellent service.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100"
    },
    {
      id: 5,
      userName: "David Wilson",
      rating: 5,
      date: "2024-02-08",
      comment: "Luxurious suite with great attention to detail. The living area was perfect for our business meeting.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100"
    }
  ],
  3: [ // Reviews for room with id 3
    {
      id: 6,
      userName: "Lisa Anderson",
      rating: 5,
      date: "2024-02-14",
      comment: "Perfect for families! Kids loved the game console and play area.",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100"
    },
    {
      id: 7,
      userName: "Robert Taylor",
      rating: 4,
      date: "2024-02-09",
      comment: "Spacious room with great amenities for the whole family. The kids didn't want to leave!",
      avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?q=80&w=100"
    }
  ]
}; 