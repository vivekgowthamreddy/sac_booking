import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LandingPageClean } from './components/LandingPageClean';
import { StudentLoginClean } from './components/StudentLoginClean';
import { StudentSignupClean } from './components/StudentSignupClean';
import { StudentDashboardClean } from './components/StudentDashboardClean';
import { ShowsListClean } from './components/ShowsListClean';
import { SeatSelectionClean } from './components/SeatSelectionClean';
import { TicketConfirmationClean } from './components/TicketConfirmationClean';
import { BookingHistoryClean } from './components/BookingHistoryClean';
import { AdminLoginClean } from './components/AdminLoginClean';
import { AdminDashboardClean } from './components/AdminDashboardClean';
import { SeatDamagePanelClean } from './components/SeatDamagePanelClean';
import { AdminBookingsListClean } from './components/AdminBookingsListClean';

type Screen =
  | 'landing'
  | 'studentLogin'
  | 'studentSignup'
  | 'studentDashboard'
  | 'showsList'
  | 'seatSelection'
  | 'ticketConfirmation'
  | 'bookingHistory'
  | 'adminLogin'
  | 'adminDashboard'
  | 'seatDamage'
  | 'adminBookings';

function AppContent() {
  const { user, isAdmin } = useAuth();
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing');
  const [selectedShowId, setSelectedShowId] = useState<string>('');
  const [confirmedBookingId, setConfirmedBookingId] = useState<string>('');

  // Auto-navigate based on auth state
  useEffect(() => {
    if (user && currentScreen === 'studentLogin') {
      setCurrentScreen('studentDashboard');
    } else if (isAdmin && currentScreen === 'adminLogin') {
      setCurrentScreen('adminDashboard');
    }
  }, [user, isAdmin, currentScreen]);

  const handleShowSelect = (showId: string) => {
    setSelectedShowId(showId);
    setCurrentScreen('seatSelection');
  };

  const handleBookingComplete = (bookingId: string) => {
    setConfirmedBookingId(bookingId);
    setCurrentScreen('ticketConfirmation');
  };

  return (
    <div>
      {currentScreen === 'landing' && (
        <LandingPageClean
          onStudentLogin={() => setCurrentScreen('studentLogin')}
          onAdminLogin={() => setCurrentScreen('adminLogin')}
        />
      )}

      {currentScreen === 'studentLogin' && (
        <StudentLoginClean
          onBack={() => setCurrentScreen('landing')}
          onLoginSuccess={() => setCurrentScreen('studentDashboard')}
          onSignupClick={() => setCurrentScreen('studentSignup')}
        />
      )}

      {currentScreen === 'studentSignup' && (
        <StudentSignupClean
          onBack={() => setCurrentScreen('studentLogin')}
          onSignupSuccess={() => setCurrentScreen('studentDashboard')}
        />
      )}

      {currentScreen === 'studentDashboard' && (
        <StudentDashboardClean
          onShowsClick={() => setCurrentScreen('showsList')}
          onBookingsClick={() => setCurrentScreen('bookingHistory')}
        />
      )}

      {currentScreen === 'showsList' && (
        <ShowsListClean
          onBack={() => setCurrentScreen('studentDashboard')}
          onShowSelect={handleShowSelect}
        />
      )}

      {currentScreen === 'seatSelection' && selectedShowId && (
        <SeatSelectionClean
          showId={selectedShowId}
          onBack={() => setCurrentScreen('showsList')}
          onBookingComplete={handleBookingComplete}
        />
      )}

      {currentScreen === 'ticketConfirmation' && confirmedBookingId && (
        <TicketConfirmationClean
          bookingId={confirmedBookingId}
          onBackToDashboard={() => setCurrentScreen('studentDashboard')}
        />
      )}

      {currentScreen === 'bookingHistory' && (
        <BookingHistoryClean onBack={() => setCurrentScreen('studentDashboard')} />
      )}

      {currentScreen === 'adminLogin' && (
        <AdminLoginClean
          onBack={() => setCurrentScreen('landing')}
          onLoginSuccess={() => setCurrentScreen('adminDashboard')}
        />
      )}

      {currentScreen === 'adminDashboard' && (
        <AdminDashboardClean
          onSeatDamageClick={() => setCurrentScreen('seatDamage')}
          onBookingListClick={() => setCurrentScreen('adminBookings')}
        />
      )}

      {currentScreen === 'seatDamage' && (
        <SeatDamagePanelClean onBack={() => setCurrentScreen('adminDashboard')} />
      )}

      {currentScreen === 'adminBookings' && (
        <AdminBookingsListClean onBack={() => setCurrentScreen('adminDashboard')} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
