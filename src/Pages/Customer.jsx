import React, { useState } from "react";
// import "./Customer.css";

const Customer = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [userName, setUserName] = useState("");
  const [userMobile, setUserMobile] = useState("");

  // Validation messages
  const [dateError, setDateError] = useState("");
  const [slotError, setSlotError] = useState("");
  const [nameError, setNameError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [bookingMessage, setBookingMessage] = useState("");
  const [bookingMessageType, setBookingMessageType] = useState("");

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setDropdownOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  // Predefined 24-hour slot times
  const allSlots = Array.from({ length: 24 }).map((_, i) => {
    const start = i;
    const end = (i + 1) % 24;
    const fmt = (h) => {
      const period = h < 12 ? "AM" : "PM";
      const hour12 = ((h + 11) % 12) + 1;
      return `${String(hour12).padStart(2, "0")}:00 ${period}`;
    };
    return { time: `${fmt(start)} - ${fmt(end)}`, hour: i };
  });

  const getTodayString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const isSlotDisabled = (slot, selectedDate) => {
    if (!selectedDate) return false;
    const today = new Date();
    const selected = new Date(selectedDate);
    if (
      selected.getDate() === today.getDate() &&
      selected.getMonth() === today.getMonth() &&
      selected.getFullYear() === today.getFullYear()
    ) {
      const currentHour = today.getHours();
      return slot.hour <= currentHour;
    }
    return false;
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    setAvailableSlots(allSlots);
    setSelectedSlots([]);
    setDateError("");
    setSlotError("");
    setBookingMessage("");
  };

  const toggleSlotSelection = (slot) => {
    if (isSlotDisabled(slot, selectedDate)) return;
    setSlotError("");
    setBookingMessage("");
    setSelectedSlots((prev) =>
      prev.includes(slot.time)
        ? prev.filter((s) => s !== slot.time)
        : [...prev, slot.time]
    );
  };

  const handleBookNow = () => {
    // Clear all errors and success before validation
    setDateError("");
    setSlotError("");
    setNameError("");
    setMobileError("");
    setBookingMessage("");

    // Validate inputs
    if (!selectedDate) {
      setDateError("Please select a date before booking!");
      return;
    }
    if (selectedSlots.length === 0) {
      setSlotError("Please select at least one time slot!");
      return;
    }
    if (!userName.trim()) {
      setNameError("Please enter your full name!");
      return;
    }
    if (!userMobile.trim()) {
      setMobileError("Please enter your mobile number!");
      return;
    }

    // Compute next day booking
    const picked = new Date(selectedDate);
    const nextDay = new Date(picked);
    nextDay.setDate(picked.getDate() + 1);
    const yyyy = nextDay.getFullYear();
    const mm = String(nextDay.getMonth() + 1).padStart(2, "0");
    const dd = String(nextDay.getDate()).padStart(2, "0");
    const bookingDateString = `${yyyy}-${mm}-${dd}`;

    setBookingMessageType("success");
    setBookingMessage(
      `✅ Booking confirmed for ${bookingDateString}\n🕒 Slots: ${selectedSlots.join(
        ", "
      )}\n👤 Name: ${userName}\n📞 Mobile: ${userMobile}`
    );
  };

  const formatDisplayDate = (dateString) => {
    if (!dateString) return "[please select a date]";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="container" onClick={closeDropdown}>
      {/* Profile Button */}
      <div className="profile-wrapper text-end">
        <button
          className="profile-btn"
          onClick={(e) => {
            e.stopPropagation();
            // navigate to admin route/page
            window.location.href = "/loginpage";
          }}
        >
          👤
        </button>
      </div>
      <img src="public/360 - Logo (1).png" className="img-fluid" id="logo" alt="Mr.360 Logo" />

      {/* Choose Sport */}
      <div className="section">
        <h2>Choose Your Sport</h2>
        <div className="radio-group">
          <label className="radio-label active">
            <input type="radio" name="sport" value="football" defaultChecked /> ⚽ Football
          </label>
          <label className="radio-label">
            <input type="radio" name="sport" value="cricket" /> 🏏 Cricket
          </label>
          <label className="radio-label">
            <input type="radio" name="sport" value="pickleball" /> 🎾 Pickleball
          </label>
          <label className="radio-label">
            <input type="radio" name="sport" value="stitchball" /> 🏏 Stitchball
          </label>
        </div>
      </div>

      {/* Choose Date */}
      <div className="section">
        <h2>Choose Date</h2>
        <input
          type="date"
          id="bookingDate"
          className="input-date"
          onChange={handleDateChange}
          min={getTodayString()}
          value={selectedDate}
        />
        {dateError && <span className="message error">{dateError}</span>}
      </div>

      {/* Available Slots */}
      <div className="section">
        <h3>
          Available Slots for:{" "}
          <span id="selectedDateText">{formatDisplayDate(selectedDate)}</span>
        </h3>

        {selectedDate && (
          <>
            <div className="slots-grid">
              {availableSlots.map((slot) => {
                const isDisabled = isSlotDisabled(slot, selectedDate);
                return (
                  <button
                    key={slot.time}
                    className={`slot-btn ${
                      selectedSlots.includes(slot.time) ? "selected" : ""
                    } ${isDisabled ? "disabled" : ""}`}
                    onClick={() => toggleSlotSelection(slot)}
                    disabled={isDisabled}
                  >
                    {slot.time}
                  </button>
                );
              })}
            </div>
            {slotError && <span className="message error">{slotError}</span>}
          </>
        )}
      </div>

      {/* Personal Details */}
      <div className="section">
        <h2>Personal Details</h2>

        <div className="mb-3">
          <label htmlFor="userName" className="form-label">
            Name <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            id="userName"
            className="form-control"
            placeholder="Enter your full name"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
              setNameError("");
            }}
          />
          {nameError && <span className="message error">{nameError}</span>}
        </div>

        <div className="mb-3">
          <label htmlFor="userMobile" className="form-label">
            Mobile Number <span className="text-danger">*</span>
          </label>
          <input
            type="tel"
            id="userMobile"
            className="form-control"
            placeholder="Enter your mobile number"
            value={userMobile}
            onChange={(e) => {
              setUserMobile(e.target.value);
              setMobileError("");
            }}
          />
          {mobileError && <span className="message error">{mobileError}</span>}
        </div>
      </div>

      {/* Book Now */}
      <div className="section text-center">
        <div className="wrapper">
          <button className="cta" id="bookNowBtn" onClick={handleBookNow}>
            <span>Book now</span>
          </button>
        </div>
        {bookingMessage && (
          <span
            id="bookinggMessage"
            className={`messagge ${bookingMessageType}`}
            style={{ whiteSpace: "pre-wrap" }}
          >
            {bookingMessage}
          </span>
        )}
      </div>
    </div>
  );
};
export default Customer;
