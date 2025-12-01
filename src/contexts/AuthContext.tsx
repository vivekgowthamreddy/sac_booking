import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  rollNumber: string;
  gender: 'male' | 'female';
  createdAt: string;
}

export interface Show {
  id: string;
  movieName: string;
  showDate: string;
  showTime: string;
  gender: 'male' | 'female';
  totalSeats: number;
  availableSeats: number;
  posterUrl: string;
  genre: string;
  duration: string;
}

export interface Seat {
  id: string;
  showId: string;
  seatNumber: string;
  row: string;
  status: 'available' | 'booked' | 'damaged';
  bookedBy?: string;
  damageReport?: {
    reportedBy: string;
    reportedAt: string;
    photo?: string;
    description: string;
    beforeUser?: string;
    afterUser?: string;
  };
}

export interface Booking {
  id: string;
  userId: string;
  showId: string;
  seatId: string;
  bookingDate: string;
  ticketNumber: string;
  qrCode: string;
}

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, rollNumber: string, email: string, password: string, gender: 'male' | 'female') => Promise<boolean>;
  logout: () => void;
  adminLogin: (username: string, password: string) => boolean;
  shows: Show[];
  seats: Seat[];
  bookings: Booking[];
  createBooking: (showId: string, seatId: string) => Booking | null;
  reportDamage: (seatId: string, photo: string, description: string, beforeUser?: string, afterUser?: string) => void;
  getUserBookings: (userId: string) => Booking[];
  getShowSeats: (showId: string) => Seat[];
  updateSeatStatus: (seatId: string, status: 'available' | 'booked' | 'damaged') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock data
const mockShows: Show[] = [
  {
    id: 'show1',
    movieName: 'Inception',
    showDate: '2025-12-01',
    showTime: '18:00',
    gender: 'male',
    totalSeats: 100,
    availableSeats: 85,
    posterUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400',
    genre: 'Sci-Fi, Thriller',
    duration: '148 min'
  },
  {
    id: 'show2',
    movieName: 'The Dark Knight',
    showDate: '2025-12-02',
    showTime: '19:30',
    gender: 'male',
    totalSeats: 100,
    availableSeats: 72,
    posterUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400',
    genre: 'Action, Crime',
    duration: '152 min'
  },
  {
    id: 'show3',
    movieName: 'Interstellar',
    showDate: '2025-12-03',
    showTime: '17:00',
    gender: 'male',
    totalSeats: 100,
    availableSeats: 90,
    posterUrl: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400',
    genre: 'Sci-Fi, Drama',
    duration: '169 min'
  },
  {
    id: 'show4',
    movieName: 'La La Land',
    showDate: '2025-12-01',
    showTime: '18:00',
    gender: 'female',
    totalSeats: 100,
    availableSeats: 88,
    posterUrl: 'https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=400',
    genre: 'Musical, Romance',
    duration: '128 min'
  },
  {
    id: 'show5',
    movieName: 'The Greatest Showman',
    showDate: '2025-12-02',
    showTime: '19:00',
    gender: 'female',
    totalSeats: 100,
    availableSeats: 76,
    posterUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400',
    genre: 'Musical, Drama',
    duration: '105 min'
  },
  {
    id: 'show6',
    movieName: 'Frozen',
    showDate: '2025-12-03',
    showTime: '16:30',
    gender: 'female',
    totalSeats: 100,
    availableSeats: 92,
    posterUrl: 'https://images.unsplash.com/photo-1551732998-9518f8d1e3cf?w=400',
    genre: 'Animation, Musical',
    duration: '102 min'
  },
];

const generateSeats = (showId: string): Seat[] => {
  const seats: Seat[] = [];
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  const seatsPerRow = 10;

  rows.forEach((row) => {
    for (let i = 1; i <= seatsPerRow; i++) {
      const seatNumber = `${row}${i}`;
      const random = Math.random();
      let status: 'available' | 'booked' | 'damaged' = 'available';
      
      if (random < 0.05) status = 'damaged';
      else if (random < 0.20) status = 'booked';

      seats.push({
        id: `${showId}-${seatNumber}`,
        showId,
        seatNumber,
        row,
        status,
      });
    }
  });

  return seats;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [shows] = useState<Show[]>(mockShows);
  const [seats, setSeats] = useState<Seat[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);

  // Initialize seats for all shows
  useEffect(() => {
    const allSeats = shows.flatMap(show => generateSeats(show.id));
    setSeats(allSeats);
  }, [shows]);

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedIsAdmin = localStorage.getItem('isAdmin');
    const storedBookings = localStorage.getItem('bookings');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedIsAdmin === 'true') {
      setIsAdmin(true);
    }
    if (storedBookings) {
      setBookings(JSON.parse(storedBookings));
    }
  }, []);

  const validateCollegeEmail = (email: string): boolean => {
    // Strict validation - only accept @rguktn.ac.in emails
    const regex = /^[a-zA-Z0-9._-]+@rguktn\.ac\.in$/;
    return regex.test(email);
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    if (!email || !password) {
      return false;
    }

    // Validate email domain
    if (!validateCollegeEmail(email)) {
      return false;
    }

    // Mock login - check localStorage for existing user
    const usersData = localStorage.getItem('users');
    const users = usersData ? JSON.parse(usersData) : {};

    if (users[email] && users[email].password === password) {
      const userData = users[email];
      const userObj: User = {
        id: userData.id,
        name: userData.name || '',
        email,
        rollNumber: userData.rollNumber || email.match(/n\d{6}/)?.[0]?.substring(1) || email.substring(0, 6),
        gender: userData.gender,
        createdAt: userData.createdAt,
      };
      setUser(userObj);
      localStorage.setItem('user', JSON.stringify(userObj));
      return true;
    }

    return false;
  };

  const signup = async (name: string, rollNumber: string, email: string, password: string, gender: 'male' | 'female'): Promise<boolean> => {
    // Validate required fields
    if (!name || !rollNumber || !email || !password) {
      return false;
    }

    // Validate email domain
    if (!validateCollegeEmail(email)) {
      return false;
    }

    // Validate gender
    if (gender !== 'male' && gender !== 'female') {
      return false;
    }

    const usersData = localStorage.getItem('users');
    const users = usersData ? JSON.parse(usersData) : {};

    if (users[email]) {
      return false; // User already exists
    }

    const userObj: User = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      email: email.toLowerCase().trim(),
      rollNumber: rollNumber.trim(),
      gender,
      createdAt: new Date().toISOString(),
    };

    users[email.toLowerCase().trim()] = {
      id: userObj.id,
      name: userObj.name,
      rollNumber: userObj.rollNumber,
      password,
      gender,
      createdAt: userObj.createdAt,
    };

    localStorage.setItem('users', JSON.stringify(users));
    setUser(userObj);
    localStorage.setItem('user', JSON.stringify(userObj));
    return true;
  };

  const adminLogin = (username: string, password: string): boolean => {
    // Mock admin login
    if (username === 'admin' && password === 'admin123') {
      setIsAdmin(true);
      localStorage.setItem('isAdmin', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem('user');
    localStorage.removeItem('isAdmin');
  };

  const createBooking = (showId: string, seatId: string): Booking | null => {
    if (!user) return null;

    // Check if user already has a booking for this show
    const existingBooking = bookings.find(
      b => b.userId === user.id && b.showId === showId
    );
    if (existingBooking) return null;

    // Check if seat is available
    const seat = seats.find(s => s.id === seatId);
    if (!seat || seat.status !== 'available') return null;

    const booking: Booking = {
      id: `booking-${Date.now()}`,
      userId: user.id,
      showId,
      seatId,
      bookingDate: new Date().toISOString(),
      ticketNumber: `TKT${Date.now()}`,
      qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=TKT${Date.now()}`,
    };

    const newBookings = [...bookings, booking];
    setBookings(newBookings);
    localStorage.setItem('bookings', JSON.stringify(newBookings));

    // Update seat status
    updateSeatStatus(seatId, 'booked');

    return booking;
  };

  const reportDamage = (
    seatId: string,
    photo: string,
    description: string,
    beforeUser?: string,
    afterUser?: string
  ) => {
    setSeats(prevSeats =>
      prevSeats.map(seat =>
        seat.id === seatId
          ? {
              ...seat,
              status: 'damaged' as const,
              damageReport: {
                reportedBy: isAdmin ? 'admin' : user?.id || '',
                reportedAt: new Date().toISOString(),
                photo,
                description,
                beforeUser,
                afterUser,
              },
            }
          : seat
      )
    );
  };

  const getUserBookings = (userId: string): Booking[] => {
    return bookings.filter(b => b.userId === userId);
  };

  const getShowSeats = (showId: string): Seat[] => {
    return seats.filter(s => s.showId === showId);
  };

  const updateSeatStatus = (seatId: string, status: 'available' | 'booked' | 'damaged') => {
    setSeats(prevSeats =>
      prevSeats.map(seat =>
        seat.id === seatId ? { ...seat, status } : seat
      )
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        login,
        signup,
        logout,
        adminLogin,
        shows,
        seats,
        bookings,
        createBooking,
        reportDamage,
        getUserBookings,
        getShowSeats,
        updateSeatStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
