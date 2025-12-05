import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LandingPageClean } from './components/LandingPageClean';
import { StudentLoginClean } from './components/StudentLoginClean';
import { StudentSignupClean } from './components/StudentSignupClean';
import { StudentDashboardClean } from './components/StudentDashboardClean';
import { ShowsListClean } from './components/ShowsListClean';
import { SeatSelectionClean } from './components/SeatSelectionClean';
import { BookingHistoryClean } from './components/BookingHistoryClean';
import { AdminLoginClean } from './components/AdminLoginClean';
import { AdminDashboardClean } from './components/AdminDashboardClean';
import { SeatDamagePanelClean } from './components/SeatDamagePanelClean';
import { AdminBookingsListClean } from './components/AdminBookingsListClean';
import { TicketConfirmationClean } from './components/TicketConfirmationClean';
import { ForgotPasswordClean } from './components/ForgotPasswordClean';
import { ResetPasswordClean } from './components/ResetPasswordClean';

type Screen =
  | 'landing'
  | 'studentLogin'
  | 'studentSignup'
  | 'forgotPassword'
  | 'resetPassword'
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
  const [resetEmail, setResetEmail] = useState<string>('');
  const [resetToken, setResetToken] = useState<string>('');

  // Auto-navigate based on auth state
  useEffect(() => {
    if (user && currentScreen === 'studentLogin') {
      setCurrentScreen('studentDashboard');
    } else if (isAdmin && currentScreen === 'adminLogin') {
      setCurrentScreen('adminDashboard');
    } else if (!user && !isAdmin && currentScreen !== 'landing' && currentScreen !== 'studentLogin' && currentScreen !== 'studentSignup' && currentScreen !== 'forgotPassword' && currentScreen !== 'resetPassword' && currentScreen !== 'adminLogin') {
      // User logged out, navigate back to landing
      setCurrentScreen('landing');
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
          onForgotPasswordClick={() => setCurrentScreen('forgotPassword')}
        />
      )}

      {currentScreen === 'forgotPassword' && (
        <ForgotPasswordClean
          onBack={() => setCurrentScreen('studentLogin')}
          onResetRequested={(email, token) => {
            setResetEmail(email);
            setResetToken(token);
            setCurrentScreen('resetPassword');
          }}
        />
      )}

      {currentScreen === 'resetPassword' && (
        <ResetPasswordClean
          onBack={() => setCurrentScreen('forgotPassword')}
          onResetSuccess={() => setCurrentScreen('studentLogin')}
          prefillEmail={resetEmail}
          prefillToken={resetToken}
        />
      )}

      {currentScreen === 'studentSignup' && (
        <StudentSignupClean
          onBack={() => setCurrentScreen('studentLogin')}
          onSignupSuccess={() => setCurrentScreen('studentDashboard')}
          onLoginClick={() => setCurrentScreen('studentLogin')}
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

import { ErrorBoundary } from './components/ErrorBoundary';

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ErrorBoundary>
  );
}
