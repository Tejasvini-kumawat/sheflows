// src/pages/Calendar/CalendarPage.jsx
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { AppContext } from "../../context/AppContext";
import { AuthContext } from "../../context/AuthContext";

const localizer = momentLocalizer(moment);

const CalendarPage = () => {
  const { backendUrl } = useContext(AppContext);
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    if (!user) return;
    const fetchAllEvents = async () => {
      try {
        // Fetch Work tasks
        const workRes = await axios.get(`${backendUrl}/api/task`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        // Fetch Family tasks
        const familyRes = await axios.get(`${backendUrl}/api/familyTask`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        // Fetch SelfCare activities
        const hobbiesRes = await axios.get(`${backendUrl}/api/selfcare`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        const workEvents = (workRes.data.tasks || []).map((task) => ({
          id: task._id,
          title: task.title,
          start: new Date(task.startTime),
          end: new Date(task.endTime),
          completed: task.completed,
          source: "Work",
        }));

        const familyEvents = (familyRes.data.tasks || []).map((task) => ({
          id: task._id,
          title: task.title,
          start: new Date(task.startTime),
          end: new Date(task.endTime),
          completed: task.completed,
          source: "Family",
        }));

        const hobbiesEvents = (hobbiesRes.data.activities || []).map((act) => ({
          id: act._id,
          title: act.title,
          start: new Date(act.startTime),
          end: new Date(act.endTime),
          completed: act.completed,
          source: "Hobbies",
        }));

        const allEvents = [...workEvents, ...familyEvents, ...hobbiesEvents];
        setEvents(allEvents);
      } catch (err) {
        console.error("Error fetching aggregated events:", err);
      }
    };

    fetchAllEvents();
  }, [user, backendUrl]);

  // Customize event styling based on completion status
  const eventPropGetter = (event) => {
    let backgroundColor = event.completed ? "#6EE7B7" : "#FBBF24";
    return {
      style: {
        backgroundColor,
        borderRadius: "4px",
        opacity: 0.9,
        color: "#1F2937",
        border: "0px",
        display: "block",
      },
    };
  };

  return (
    <div className="relative p-8 bg-white border border-orange-100 rounded shadow-lg">
      {/* User Info: Profile Image and Username at Top Right */}
      <div className="absolute top-4 right-4 flex flex-col items-center">
        <img
          src={user?.profileImage || "https://via.placeholder.com/40"}
          alt="User Profile"
          className="w-10 h-10 rounded-full object-cover border border-orange-300"
        />
        <p className="mt-1 text-xs font-medium text-orange-600">{user?.name}</p>
      </div>

      <h1 className="text-3xl font-bold text-orange-600 mb-4 text-center">
        Unified Calendar
      </h1>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        date={date}
        onNavigate={(newDate) => setDate(newDate)}
        defaultView="month"
        views={{ month: true }}
        toolbar={true}
        eventPropGetter={eventPropGetter}
        style={{ height: "80vh" }}
      />
    </div>
  );
};

export default CalendarPage;
