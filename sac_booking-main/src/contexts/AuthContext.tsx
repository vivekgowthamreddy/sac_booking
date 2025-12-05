import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  name?: string;
  email: string;
  rollNumber?: string;
  gender: 'male' | 'female';
  role?: 'student' | 'admin';
  createdAt?: string;
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
  rows: number;
  cols: number;
  showType: string;
  damagedSeats: string[];
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
  seatNumber: string;
  bookingDate: string;
  ticketNumber: string;
  qrCode: string;
  show?: {
    movie: string;
    date: string;
    time: string;
  };
}

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, rollNumber: string, email: string, password: string, gender: 'male' | 'female') => Promise<{ success: boolean; error?: string; suggestion?: string }>;
  logout: () => void;
  adminLogin: (username: string, password: string) => Promise<boolean>;
  shows: Show[];
  seats: Seat[];
  bookings: Booking[];
  createBooking: (showId: string, seatNumber: string) => Promise<{ success: boolean; booking?: Booking; error?: string }>;
  cancelBooking: (bookingId: string) => Promise<boolean>;
  reportDamage: (seatId: string, photo: string, description: string, beforeUser?: string, afterUser?: string) => Promise<void>;
  getUserBookings: () => Promise<void>;
  getShowSeats: (showId: string) => Promise<void>;
  updateSeatStatus: (seatId: string, status: 'available' | 'booked' | 'damaged') => void;
  fetchShows: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = 'http://localhost:5000/api';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [shows, setShows] = useState<Show[]>([]);
  const [seats, setSeats] = useState<Seat[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);

  // Load user from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (token && storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      if (parsedUser.role === 'admin') {
        setIsAdmin(true);
      }
    }
  }, []);

  // Fetch shows when user logs in (both students and admins)
  useEffect(() => {
    if (user) {
      fetchShows();
    }
  }, [user, isAdmin]);

  const fetchShows = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers: HeadersInit = {
        'Content-Type': 'application/json'
      };

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_URL}/shows`, {
        headers
      });
      if (response.ok) {
        const data = await response.json();
        const formattedShows: Show[] = data.shows.map((show: any) => {
          const totalSeats = show.rows * show.cols;
          const bookedCount = show.bookedCount || 0;
          const availableSeats = totalSeats - bookedCount;

          return {
            id: show._id,
            movieName: show.movie,
            genre: show.genre || 'Action',
            duration: show.duration || '2h 30m',
            posterUrl: show.posterUrl || 'https://via.placeholder.com/300x450?text=Movie+Poster',
            showDate: show.date,
            showTime: show.time,
            gender: show.allowedGender,
            rows: show.rows,
            cols: show.cols,
            totalSeats,
            availableSeats,
            showType: '2D', // Assuming default or needs to be added to backend model
            damagedSeats: show.damagedSeats || [] // Assuming default or needs to be added to backend model
          };
        });

        setShows(formattedShows);
      }
    } catch (error) {
      console.error('Error fetching shows', error);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        return true;
      }

      // Try to get error message from response
      const errorData = await response.json().catch(() => ({ message: 'Invalid email or password' }));
      alert(errorData.message || 'Login failed');
      return false;
    } catch (error) {
      console.error('Login error', error);
      alert('Cannot connect to server. Please make sure the backend is running.');
      return false;
    }
  };

  const signup = async (name: string, rollNumber: string, email: string, password: string, gender: 'male' | 'female'): Promise<{ success: boolean; error?: string; suggestion?: string }> => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, rollNumber, email, password, gender })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        return { success: true };
      }

      return {
        success: false,
        error: data.message || 'Registration failed',
        suggestion: data.suggestion
      };
    } catch (error) {
      console.error('Signup error', error);
      return {
        success: false,
        error: 'Cannot connect to server. Please make sure the backend is running.'
      };
    }
  };

  const adminLogin = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_URL}/auth/admin-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        setIsAdmin(true);
        // Fetch shows after admin login
        await fetchShows();
        // Fetch all bookings for admin dashboard
        try {
          const bookingsResp = await fetch(`${API_URL}/admin/bookings`, {
            headers: { Authorization: `Bearer ${data.token}` }
          });
          if (bookingsResp.ok) {
            const bookingsJson = await bookingsResp.json();
            const transformed = bookingsJson.bookings.map((b: any) => ({
              id: b._id,
              userId: b.studentId?._id || b.studentId,
              showId: b.showId?._id || b.showId,
              seatNumber: b.seatNumber,
              bookingDate: b.timestamp,
              ticketNumber: `TKT-${b._id.substring(0, 8)}`,
              qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${b._id}`,
              show: {
                movie: b.showId?.movie || '',
                date: b.showId?.date || '',
                time: b.showId?.time || ''
              }
            }));
            setBookings(transformed);
          }
        } catch {}
        return true;
      }
      return false;
    } catch (error) {
      console.error('Admin login error', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setShows([]);
    setSeats([]);
    setBookings([]);
  };

  const createBooking = async (showId: string, seatNumber: string): Promise<{ success: boolean; booking?: Booking; error?: string }> => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ showId, seatNumber })
      });

      if (response.ok) {
        const data = await response.json();
        const newBooking: Booking = {
          id: data.booking.id,
          userId: user?.id || '',
          showId: (data.booking.showId && data.booking.showId._id) ? data.booking.showId._id : data.booking.showId,
          seatNumber: data.booking.seatNumber,
          bookingDate: data.booking.timestamp,
          ticketNumber: data.booking.ticketId || `TKT-${data.booking.id.substring(0, 8)}`,
          qrCode: data.booking.qrDataUri,
          show: {
            movie: data.booking.show.movie,
            date: data.booking.show.date,
            time: data.booking.show.time
          }
        };
        setBookings([...bookings, newBooking]);
        return { success: true, booking: newBooking };
      } else {
        const errorData = await response.json();
        return { success: false, error: errorData.message || 'Booking failed. Please try again.' };
      }
    } catch (error) {
      console.error('Booking error', error);
      return { success: false, error: 'Network error. Please check your connection and try again.' };
    }
  };

  const cancelBooking = async (bookingId: string): Promise<boolean> => {
    try {
      const token = localStorage.getItem('token');
      const resp = await fetch(`${API_URL}/book/${bookingId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (resp.ok) {
        setBookings(prev => prev.filter(b => b.id !== bookingId));
        return true;
      }
      return false;
    } catch (e) {
      console.error('Cancel booking error', e);
      return false;
    }
  };

  const getUserBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/book/my-bookings`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        const transformedBookings = data.bookings.map((b: any) => ({
          id: b._id,
          userId: b.studentId,
          showId: b.showId._id,
          seatNumber: b.seatNumber,
          bookingDate: b.timestamp,
          ticketNumber: `TKT-${b._id.substring(0, 8)}`,
          qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${b._id}`,
          show: {
            movie: b.showId.movie,
            date: b.showId.date,
            time: b.showId.time
          }
        }));
        setBookings(transformedBookings);
      }
    } catch (error) {
      console.error('Get user bookings error', error);
    }
  };

  const getShowSeats = async (showId: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/shows/${showId}/seats`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        const bookedSeats = data.bookedSeats;

        // Generate all seats for the show based on rows/cols
        const show = shows.find(s => s.id === showId);
        if (!show) return;

        const allSeats: Seat[] = [];
        // Generate rows dynamically (A, B, C...)
        const rows = Array.from({ length: show.rows }, (_, i) => String.fromCharCode(65 + i));

        rows.forEach(row => {
          for (let i = 1; i <= show.cols; i++) {
            const seatNumber = `${row}-${i}`;
            const isBooked = bookedSeats.includes(seatNumber);
            const isDamaged = show.damagedSeats.includes(seatNumber);

            let status: 'available' | 'booked' | 'damaged' = 'available';
            if (isDamaged) status = 'damaged';
            else if (isBooked) status = 'booked';

            allSeats.push({
              id: `${showId}-${seatNumber}`,
              showId,
              seatNumber,
              row,
              status
            });
          }
        });
        setSeats(allSeats);
      }
    } catch (error) {
      console.error('Get show seats error', error);
    }
  };

  const reportDamage = async (seatId: string, photo: string, description: string) => {
    // TODO: Implement API call for damage report
    console.log('Report damage', seatId, description);
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
        cancelBooking,
        reportDamage,
        getUserBookings,
        getShowSeats,
        updateSeatStatus,
        fetchShows
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
