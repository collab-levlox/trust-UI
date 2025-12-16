import React, { useState, useEffect } from "react";
// import "./Admin.css";

const Admin = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  // Predefined 24-hour slot times (same as customer page)
  const allSlots = Array.from({ length: 24 }).map((_, i) => {
    const start = i;
    const end = (i + 1) % 24;
    const fmt = (h) => {
      const period = h < 12 ? "AM" : "PM";
      const hour12 = ((h + 11) % 12) + 1;
      return `${String(hour12).padStart(2, "0")}:00 ${period}`;
    };
    return { 
      time: `${fmt(start)} - ${fmt(end)}`, 
      hour: i,
      id: i
    };
  });

  const getTodayString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  // Mock function to simulate fetching bookings from backend
  const fetchBookingsForDate = async (date) => {
    setLoading(true);
    setMessage("");
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock data - in real app, this would come from your backend
    const mockBookings = [
      {
        id: 1,
        userName: "John Doe",
        userMobile: "1234567890",
        sport: "football",
        slots: ["02:00 AM - 03:00 AM", "03:00 AM - 04:00 AM"],
        bookingDate: date,
        bookingTime: new Date().toISOString()
      },
      {
        id: 2,
        userName: "Jane Smith",
        userMobile: "0987654321",
        sport: "cricket",
        slots: ["10:00 AM - 11:00 AM", "11:00 AM - 12:00 PM"],
        bookingDate: date,
        bookingTime: new Date().toISOString()
      },
      {
        id: 3,
        userName: "Mike Johnson",
        userMobile: "5551234567",
        sport: "pickleball",
        slots: ["06:00 PM - 07:00 PM", "07:00 PM - 08:00 PM"],
        bookingDate: date,
        bookingTime: new Date().toISOString()
      }
    ];
    
    setBookings(mockBookings);
    setLoading(false);
    
    if (mockBookings.length === 0) {
      setMessage("No bookings found for selected date");
      setMessageType("info");
    } else {
      setMessage(`Found ${mockBookings.length} bookings for selected date`);
      setMessageType("success");
    }
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    setBookings([]);
    setMessage("");
    
    if (date) {
      fetchBookingsForDate(date);
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      setLoading(true);
      
      // Simulate API call for deletion
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const deletedBooking = bookings.find(b => b.id === bookingId);
      setBookings(prev => prev.filter(booking => booking.id !== bookingId));
      setLoading(false);
      setMessage(`Booking for ${deletedBooking.userName} deleted successfully`);
      setMessageType("success");
    }
  };

  const formatDisplayDate = (dateString) => {
    if (!dateString) return "Select a date to view slots";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Check if a slot is booked and return booking info
  const getSlotBookingInfo = (slotTime) => {
    const booking = bookings.find(booking => 
      booking.slots.includes(slotTime)
    );
    
    return booking || null;
  };

  // Calculate daily statistics
  const calculateDailyStats = () => {
    if (!bookings.length) return null;
    
    const totalSlots = bookings.reduce((total, booking) => 
      total + booking.slots.length, 0
    );
    
    const sportsCount = bookings.reduce((acc, booking) => {
      acc[booking.sport] = (acc[booking.sport] || 0) + 1;
      return acc;
    }, {});
    
    const revenue = totalSlots * 10; // Assuming $10 per slot
    
    return {
      totalBookings: bookings.length,
      totalSlots,
      sportsCount,
      revenue
    };
  };

  const stats = calculateDailyStats();

  return (
    <div className="admin-container">
      {/* Header */}
      <div className="admin-header">
        <div className="header-left">
          <img src="/public/360 - Logo (1).png" className="admin-logo" alt="Mr.360 Logo" />
          <h1>Admin Dashboard</h1>
        </div>
        <div className="header-right">
          <button
            className="btn btn-outline"
            onClick={() => window.location.href = "/"}
          >
            ← Back to Booking
          </button>
        </div>
      </div>

      {/* Date Selection */}
        <div className="admin-section">
          <h2>📅 Select Date</h2>
          <div className="date-selection">
            <input
          type="date"
          className="input-date"
          onChange={handleDateChange}
          min={getTodayString()}
          value={selectedDate}
            />
          </div>
        </div>


        {/* All 24 Slots Grid with admin booking + cancel access */}
        {selectedDate && (
          <div className="admin-section">
            <div className="section-header">
          <h3>📅 {formatDisplayDate(selectedDate)}</h3>
          <div className="slot-legend">
            <div className="legend-item">
              <div className="legend-color available"></div>
              <span>Available</span>
            </div>
            <div className="legend-item">
              <div className="legend-color booked"></div>
              <span>Booked</span>
            </div>
          </div>
                  {/* Holiday management */}
        {selectedDate && (
          <div className="adminn-section">
            <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
              {bookings.some(b => b.id === `holiday-${selectedDate}`) ? (
                <>
                  <button
                    className="btn btn-outline"
                    onClick={() => {
                      if (!window.confirm("Remove holiday for this date?")) return;
                      setBookings(prev => prev.filter(b => b.id !== `holiday-${selectedDate}`));
                      setMessage(`Holiday removed for ${selectedDate}`);
                      setMessageType("success");
                    }}
                  >
                    ✅ Untick Holiday
                  </button>
                  <div style={{ color: "#d9534f" }}>
                    This date is marked as a holiday. All slots are blocked.
                  </div>
                </>
              ) : (
                <>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      if (!window.confirm("Mark this date as a holiday? This will remove any existing bookings for the date.")) return;
                      const holidayBooking = {
                        id: `holiday-${selectedDate}`,
                        userName: "HOLIDAY",
                        userMobile: "",
                        sport: "holiday",
                        slots: allSlots.map(s => s.time),
                        bookingDate: selectedDate,
                        bookingTime: new Date().toISOString(),
                      };
                      // Replace any existing bookings for the selected date with the holiday booking
                      setBookings(prev => [
                        ...prev.filter(b => b.bookingDate !== selectedDate),
                        holidayBooking,
                      ]);
                      setMessage(`Marked ${selectedDate} as holiday — all slots blocked`);
                      setMessageType("info");
                    }}
                  >
                    Holiday
                  </button>
                </>
              )}
            </div>
          </div>
        )}
            </div>

            {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            Loading slots and bookings...
          </div>
            ) : (
          <>
            <div
              className="slots-grid-admin"
              style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "12px",
              }}
            >
            {allSlots.map((slot) => {
            const bookingInfo = getSlotBookingInfo(slot.time);
            const isBooked = !!bookingInfo;

            return (
              <div
                key={slot.id}
                className={`slot-card ${isBooked ? "booked" : "available"}`}
                style={{ cursor: isBooked ? "default" : "pointer" }}
                onClick={() => {
              // Only allow booking when slot is available
              if (isBooked) return;

              // Simple admin booking flow using prompts (no extra state)
              const userName = window.prompt(
                `Create booking for ${slot.time}\nEnter customer name:`
              );
              if (!userName) return;

              const userMobile = window.prompt("Enter customer mobile:");
              if (!userMobile) return;

              const sport = window.prompt("Enter sport (e.g. football):", "football");
              if (!sport) return;

              // Create new booking object and add to bookings
              const newBooking = {
                id: Date.now(), // simple unique id
                userName,
                userMobile,
                sport,
                slots: [slot.time],
                bookingDate: selectedDate,
                bookingTime: new Date().toISOString(),
              };

              setBookings((prev) => [...prev, newBooking]);
              setMessage(
                `Slot ${slot.time} booked for ${userName} (${sport})`
              );
              setMessageType("success");
                }}
              >
                <div className="slot-time">{slot.time}</div>
                <div className="slot-status">
              {isBooked ? (
                <div className="booking-details">
                  <div className="customer-name">{bookingInfo.userName}</div>
                  <div className="sport-type">{bookingInfo.sport}</div>
                  <div className="mobile">{bookingInfo.userMobile}</div>
                  <div style={{ display: "flex", gap: "8px", marginTop: 8 }}>
                <button
                  className="btn-delete"
                  onClick={(e) => {
                    // prevent triggering parent onClick
                    e.stopPropagation();
                    handleDeleteBooking(bookingInfo.id);
                  }}
                  title="Delete Booking"
                >
                  🗑️ Cancel
                </button>
                  </div>
                </div>
              ) : (
                <div className="available-info">
                  <div className="available-text">Available</div>
                </div>
              )}
                </div>
              </div>
            );
              })}
            </div>
          </>
            )}
          </div>
        )}

        {/* Instructions when no date selected */}
      {!selectedDate && (
        <div className="admin-section instruction">
          <div className="instruction-icon">📅</div>
          <h3>Select a date above to view all 24 time slots and their booking status</h3>
          <p>You will be able to see which slots are booked, by whom, and for which sport.</p>
        </div>
      )}
    </div>
  );
};

export default Admin;