import React, { useEffect, useState } from "react";
import { dashboardAPI } from "../Hoc/api";
import moment from "moment";


export default function Dashboard({
  courts = [],
  bookingsToday = [],
  lastMonthTotal = 0,
}) {
  const activeCourts = courts.filter((c) => c.isActive);
  const noActive = activeCourts.length === 0;
  const [formstate, setFormstate] = useState(null);
  const [dashboardForm, setDashboardForm] = useState({
    date: moment().format("YYYY-MM-DD"),
  })
  const [loading, setLoading] = useState(true);


  console.log(formstate, 'formstate');

  const bookingsCount = bookingsToday.length;

  // Build timings for UI: show each court's today's timing or a message
  const formatTime = (t) => {
    if (!t) return "—";
    // expects t in HH:mm or a Date string — try to normalize
    if (typeof t === "string") return t;
    const d = new Date(t);
    if (isNaN(d)) return String(t);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const fetchDashboardData = async () => {
    setLoading(true);
    dashboardAPI({
      date: dashboardForm.date
    }).then((data) => {
      setFormstate(data.data);
      setLoading(false);
    }).catch((error) => {
      setLoading(false);
      console.error("Error fetching dashboard data:", error);
    });
  }

  const onRefresh = () => {
    fetchDashboardData()
  }

  useEffect(() => {
    fetchDashboardData();
  }, [dashboardForm.date])


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Court Dashboard</h1>


        <input
          type="date"
          name="selectedDate"
          className="input-date"
          placeholder="sss"
          onChange={(e) => {
            setDashboardForm((prev) => {
              return {
                ...prev,
                date: e.target.value,
              }
            })
          }}
          // min={getTodayString()}
          value={dashboardForm.date || ""}
        />

        <div className="flex gap-2">
          <button
            onClick={onRefresh}
            className="px-3 py-1.5 rounded-lg border hover:bg-gray-50"
          >
            Refresh
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Card 1: Active court status */}
        <div className="p-4 rounded-2xl shadow-sm bg-white border">
          <h2 className="text-sm text-gray-500">Selected Day Booking </h2>
          <div className="mt-3">
            {/* {noActive ? (
              <div className="text-red-600 font-medium">No active court now</div>
            ) : (
              <ul className="space-y-2">
                {activeCourts.map((c) => (
                  <li
                    key={c.id}
                    className="flex items-center justify-between bg-gray-50 p-2 rounded-md"
                  >
                    <div>
                      <div className="font-medium">{c.name}</div>
                      <div className="text-xs text-gray-500">Open: {formatTime(c.openingTime)} — {formatTime(c.closingTime)}</div>
                    </div>
                    <div className="text-green-600 text-sm">Active</div>
                  </li>
                ))}
              </ul>
            )} */}
            <h3>{formstate?.selectedDateTotalBooking}</h3>
          </div>
        </div>

        <div className="p-4 rounded-2xl shadow-sm bg-white border">
          <h2 className="text-sm text-gray-500">Selected Day Earing  </h2>
          <div className="mt-3 flex items-center justify-between">
            <h3>{formstate?.selectedDateTotalEaring}</h3>
          </div>
        </div>


        <div className="p-4 rounded-2xl shadow-sm bg-white border">
          <h2 className="text-sm text-gray-500">Selected Day Slot Count  </h2>
          <div className="mt-3 flex items-center justify-between">
            <h3>{formstate?.selectedDaytotalSlotBookingCount}</h3>
          </div>
        </div>


        <div className="p-4 rounded-2xl shadow-sm bg-white border">
          <h2 className="text-sm text-gray-500">This Month 30 day slot cout </h2>
          <div className="mt-3 flex items-center justify-between">
            <h3>{formstate?.totalSlotBooingCount}</h3>
          </div>
        </div>


        {/* Card 2: Booking today */}
        <div className="p-4 rounded-2xl shadow-sm bg-white border">
          <h2 className="text-sm text-gray-500">This Month total Booing</h2>
          <div className="mt-3 flex items-center justify-between">
            <h3>{formstate?.totalBooking}</h3>
          </div>
        </div>
      </div>



      <div className="p-4 rounded-2xl shadow-sm bg-white border">
        <h2 className="text-sm text-gray-500">This Month Total Earing  </h2>
        <div className="mt-3 flex items-center justify-between">
          <h3>{formstate?.totalBookingAmount}</h3>
        </div>
      </div>
    </div >
  );
}