import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Appointments.css'; // Assuming you have a CSS file for styling
import { APPOINTMENTS_URL } from '../config/api';

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('latest');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${APPOINTMENTS_URL}`);
        setAppointments(res.data);
        setFilteredAppointments(res.data);
      } catch (error) {
        console.error('Failed to fetch appointments:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Sort appointments based on date and time
  useEffect(() => {
    if (appointments.length > 0) {
      const sorted = [...appointments].sort((a, b) => {
        const dateA = new Date(`${a.date} ${a.time}`);
        const dateB = new Date(`${b.date} ${b.time}`);
        
        if (sortOrder === 'latest') {
          return dateB - dateA; // Latest first
        } else {
          return dateA - dateB; // Oldest first
        }
      });
      setFilteredAppointments(sorted);
    }
  }, [appointments, sortOrder]);

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="appointments-container">
      <div className="appointments-header">
        <h1 className="appointments-title">📅 Booked Appointments</h1>
        
        {/* Small sort box in top right */}
        {appointments.length > 0 && (
          <div className="sort-box">
            <select 
              value={sortOrder} 
              onChange={handleSortChange}
              className="sort-select"
            >
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        )}
      </div>

      {appointments.length === 0 ? (
        <div className="no-appointments">
          <p>No appointments booked yet.</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="appointments-table">
            <thead>
              <tr>
                <th>
                  <span className="header-with-icon">
                    <span className="icon">👤</span>
                    Name
                  </span>
                </th>
                <th>
                  <span className="header-with-icon">
                    <span className="icon">📧</span>
                    Email
                  </span>
                </th>
                <th>
                  <span className="header-with-icon">
                    <span className="icon">📅</span>
                    Date
                  </span>
                </th>
                <th>
                  <span className="header-with-icon">
                    <span className="icon">⏰</span>
                    Time
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((appt) => (
                <tr key={appt._id}>
                  <td>{appt.name}</td>
                  <td>{appt.email}</td>
                  <td>{appt.date}</td>
                  <td>{appt.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}