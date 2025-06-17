import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PRESCRIPTIONS_URL, PRESCRIPTION_STATUS_URL } from '../config/api';
import './PrescriptionManagement.css';

const PrescriptionManagement = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [filteredPrescriptions, setFilteredPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  useEffect(() => {
    filterPrescriptions();
  }, [searchTerm, statusFilter, prescriptions]);

  const fetchPrescriptions = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(PRESCRIPTIONS_URL, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setPrescriptions(response.data.prescriptions);
      } else {
        alert('Failed to fetch prescriptions');
      }
    } catch (error) {
      alert('Error fetching prescriptions: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const filterPrescriptions = () => {
    let filtered = [...prescriptions];
    if (statusFilter !== 'all') {
      filtered = filtered.filter(p => p.status === statusFilter);
    }
    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      filtered = filtered.filter(p =>
        p.name?.toLowerCase().includes(lower) ||
        p.phone?.toLowerCase().includes(lower)
      );
    }
    setFilteredPrescriptions(filtered);
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        PRESCRIPTION_STATUS_URL(id),
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPrescriptions(prev =>
        prev.map(p => (p._id === id ? { ...p, status: newStatus } : p))
      );
    } catch (error) {
      alert('Error updating status: ' + error.message);
    }
  };

  const handleViewDetails = (prescription) => {
    setSelectedPrescription(prescription);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedPrescription(null);
    setShowModal(false);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container">
      <h1 style={{ display: 'flex', alignItems: 'center' }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ marginRight: '10px' }}
          viewBox="0 0 24 24"
        >
          <circle cx="6" cy="15" r="4"></circle>
          <circle cx="18" cy="15" r="4"></circle>
          <path d="M6 15c1.5-2 10.5-2 12 0"></path>
          <path d="M2 12l2-2h2"></path>
          <path d="M22 12l-2-2h-2"></path>
        </svg>
        Prescription Management
      </h1>

      <button onClick={fetchPrescriptions} style={{ marginBottom: '10px' }}>Refresh</button>

      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Search by name or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="reviewed">Reviewed</option>
          <option value="processed">Processed</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <table border="1" cellPadding="8" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>
              <span style={{ display: 'flex', alignItems: 'center' }}>
                📅 <span style={{ marginLeft: 5 }}>Date</span>
              </span>
            </th>
            <th>
              <span style={{ display: 'flex', alignItems: 'center' }}>
                👤 <span style={{ marginLeft: 5 }}>Name</span>
              </span>
            </th>
            <th>
              <span style={{ display: 'flex', alignItems: 'center' }}>
                📞 <span style={{ marginLeft: 5 }}>Phone</span>
              </span>
            </th>
            <th>
              <span style={{ display: 'flex', alignItems: 'center' }}>
                📄 <span style={{ marginLeft: 5 }}>Type</span>
              </span>
            </th>
            <th>
              <span style={{ display: 'flex', alignItems: 'center' }}>
                ⚙️ <span style={{ marginLeft: 5 }}>Status</span>
              </span>
            </th>
            <th>
              <span style={{ display: 'flex', alignItems: 'center' }}>
                👁️ <span style={{ marginLeft: 5 }}>Action</span>
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredPrescriptions.map(p => (
            <tr key={p._id}>
              <td>{new Date(p.createdAt).toLocaleDateString()}</td>
              <td>{p.name}</td>
              <td>{p.phone}</td>
              <td>{p.uploadType}</td>
              <td>
                <select
                  value={p.status}
                  onChange={(e) => handleStatusChange(p._id, e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="processed">Processed</option>
                  <option value="completed">Completed</option>
                </select>
              </td>
              <td>
                <button onClick={() => handleViewDetails(p)} style={{ display: 'flex', alignItems: 'center' }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ marginRight: '5px' }}
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && selectedPrescription && (
        <div className="modal" style={{ border: '1px solid #000', padding: '20px', backgroundColor: '#fff', marginTop: '20px' }}>
          <h2>Prescription Details</h2>
          <p><strong>Name:</strong> {selectedPrescription.name}</p>
          <p><strong>Phone:</strong> {selectedPrescription.phone}</p>
          <p><strong>Type:</strong> {selectedPrescription.uploadType}</p>
          <p><strong>Content:</strong> {selectedPrescription.content}</p>
          <p><strong>Status:</strong> {selectedPrescription.status}</p>
          <p><strong>Date:</strong> {new Date(selectedPrescription.createdAt).toLocaleString()}</p>
          <p><strong>Notes:</strong> {selectedPrescription.notes}</p>
          <button onClick={closeModal}>Close</button>
        </div>
      )}
    </div>
  );
};

export default PrescriptionManagement;
