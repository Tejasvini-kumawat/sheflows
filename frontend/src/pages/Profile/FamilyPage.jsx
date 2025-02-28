// src/pages/Profile/FamilyPage.jsx
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FaRegCalendarAlt, FaCheck } from "react-icons/fa";
import { AppContext } from "../../context/AppContext";
import { AuthContext } from "../../context/AuthContext";

const FamilyPage = () => {
  const { backendUrl } = useContext(AppContext);
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    startTime: "",
    endTime: "",
    priority: 2, // default Medium: 1 = High, 2 = Medium, 3 = Low
  });
  const [overallHours, setOverallHours] = useState(0);

  // Fetch family tasks from the backend
  const fetchTasks = () => {
    if (user) {
      axios
        .get(`${backendUrl}/api/familyTask`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((res) => {
          const sortedTasks = res.data.tasks.sort((a, b) => {
            if (a.priority !== b.priority) {
              return a.priority - b.priority;
            } else {
              return new Date(a.startTime) - new Date(b.startTime);
            }
          });
          setTasks(sortedTasks);
          calculateOverallHours(sortedTasks);
        })
        .catch((err) => console.error("Error fetching family tasks:", err));
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [backendUrl, user]);

  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${backendUrl}/api/familyTask`, newTask, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        fetchTasks();
        setNewTask({ title: "", description: "", startTime: "", endTime: "", priority: 2 });
      })
      .catch((err) => console.error("Error creating family task:", err));
  };

  // Mark a task as completed
  const handleComplete = (taskId) => {
    axios
      .put(
        `${backendUrl}/api/familyTask/${taskId}`,
        { completed: true },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      )
      .then(() => fetchTasks())
      .catch((err) => console.error("Error completing family task:", err));
  };

  // Calculate overall hours for completed tasks in the current week
  const calculateOverallHours = (tasks) => {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay()); // Sunday as start
    let totalHours = 0;
    tasks.forEach((task) => {
      if (task.completed && new Date(task.startTime) >= startOfWeek) {
        totalHours += task.duration || 0;
      }
    });
    setOverallHours(totalHours);
  };
  
  // Separate tasks into incomplete and completed arrays
  const incompleteTasks = tasks.filter((task) => !task.completed);
  const completeTasks = tasks.filter((task) => task.completed);

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg border border-orange-100 transform transition-all duration-500 hover:scale-105">
      {/* Responsive Header: On small screens, header is static; on medium and above, it's absolute at top right */}
      <div className="sm:static md:absolute top-4 right-4 flex flex-col items-center">
        <img
          src={user?.profileImage || "https://via.placeholder.com/40"}
          alt="User Profile"
          className="w-10 h-10 rounded-full object-cover border border-orange-300"
        />
        <p className="mt-1 text-xs font-medium text-orange-600">{user?.name}</p>
      </div>

      {/* Main Header with extra top padding on small screens */}
      <h1 className="pt-12 text-3xl font-bold text-orange-600 mb-8 text-center animate-fadeIn">
        Family & Household Management
      </h1>
      
      {/* Centered Add Family Task Form Section */}
      <div className="flex justify-center mb-8">
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-3 animate-fadeIn">
          <input
            type="text"
            name="title"
            value={newTask.title}
            onChange={handleChange}
            placeholder="Family Task Title"
            className="w-full p-2 border border-gray-300 rounded transition-colors focus:border-orange-500"
            required
          />
          <textarea
            name="description"
            value={newTask.description}
            onChange={handleChange}
            placeholder="Family Task Description"
            className="w-full p-2 border border-gray-300 rounded transition-colors focus:border-orange-500"
          ></textarea>
          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="flex-1">
              <label className="block text-gray-700 text-sm mb-1">Start Time</label>
              <input
                type="datetime-local"
                name="startTime"
                value={newTask.startTime}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded transition-colors focus:border-orange-500"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 text-sm mb-1">End Time</label>
              <input
                type="datetime-local"
                name="endTime"
                value={newTask.endTime}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded transition-colors focus:border-orange-500"
                required
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <label className="text-gray-700 text-sm">Priority:</label>
            <select
              name="priority"
              value={newTask.priority}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded transition-colors focus:border-orange-500 text-sm"
            >
              <option value="1">High</option>
              <option value="2">Medium</option>
              <option value="3">Low</option>
            </select>
          </div>
          <div className="flex justify-center my-4">
            <button
              type="submit"
              className="bg-orange-500 text-white px-4 py-1 rounded text-sm hover:bg-orange-600 transition-colors duration-300"
            >
              Add Family Task
            </button>
          </div>
        </form>
      </div>
      
      {/* Family Tasks List in Two Columns */}
      <div className="animate-fadeIn mb-8">
        <h2 className="text-2xl font-semibold text-orange-600 mb-4 text-center">
          Your Family Tasks
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Incomplete Tasks */}
          <div>
            <h3 className="text-xl font-semibold text-orange-600 mb-2 text-center">Incomplete</h3>
            {incompleteTasks.length === 0 ? (
              <p className="text-sm text-center">No incomplete tasks.</p>
            ) : (
              incompleteTasks.map((task) => (
                <div
                  key={task._id}
                  className="mb-4 p-3 border rounded flex flex-col transition-all duration-300 hover:scale-105 bg-white border-gray-300 text-sm"
                >
                  <h3 className="font-bold">{task.title}</h3>
                  <p>{task.description}</p>
                  <p className="text-xs">
                    <strong>Start:</strong> {new Date(task.startTime).toLocaleString()}
                  </p>
                  <p className="text-xs">
                    <strong>End:</strong> {new Date(task.endTime).toLocaleString()}
                  </p>
                  <p className="text-xs">
                    <strong>Duration:</strong> {task.duration ? task.duration.toFixed(2) : 0} hrs
                  </p>
                  <p className="text-xs">
                    <strong>Priority:</strong> {task.priority === 1 ? "High" : task.priority === 2 ? "Medium" : "Low"}
                  </p>
                  <button
                    onClick={() => handleComplete(task._id)}
                    className="mt-2 flex items-center justify-center bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600 transition-colors"
                  >
                    <FaCheck className="mr-1" /> Complete
                  </button>
                </div>
              ))
            )}
          </div>
          {/* Completed Tasks */}
          <div>
            <h3 className="text-xl font-semibold text-orange-600 mb-2 text-center">Completed</h3>
            {completeTasks.length === 0 ? (
              <p className="text-sm text-center">No completed tasks.</p>
            ) : (
              completeTasks.map((task) => (
                <div
                  key={task._id}
                  className="mb-4 p-3 border rounded flex flex-col transition-all duration-300 hover:scale-105 bg-green-100 border-green-300 text-sm"
                >
                  <h3 className="font-bold">{task.title}</h3>
                  <p>{task.description}</p>
                  <p className="text-xs">
                    <strong>Start:</strong> {new Date(task.startTime).toLocaleString()}
                  </p>
                  <p className="text-xs">
                    <strong>End:</strong> {new Date(task.endTime).toLocaleString()}
                  </p>
                  <p className="text-xs">
                    <strong>Duration:</strong> {task.duration ? task.duration.toFixed(2) : 0} hrs
                  </p>
                  <p className="text-xs">
                    <strong>Priority:</strong> {task.priority === 1 ? "High" : task.priority === 2 ? "Medium" : "Low"}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      
      {/* Overall Family Work Done Box */}
      <div className="mt-8">
        <div className="mx-auto inline-block p-3 bg-orange-50 border border-orange-300 rounded shadow text-sm transition-transform duration-300 hover:scale-105 animate-fadeIn">
          <div className="flex items-center justify-center space-x-1">
            <FaRegCalendarAlt className="text-orange-600" />
            <h3 className="text-lg font-bold text-orange-600">
              Weekly Hours: {overallHours.toFixed(2)} hrs
            </h3>
          </div>
        </div>
      </div>

      {/* Inline CSS Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default FamilyPage;
