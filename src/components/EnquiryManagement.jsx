import React, { useState, useEffect } from 'react';
import './EnquiryManagement.css';

const EnquiryManagement = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [updateData, setUpdateData] = useState({ status: '', adminNotes: '' });

  const BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchEnquiries();
    fetchStats();
  }, [currentPage, filterStatus]);

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${BASE_URL}/enquiry/all?page=${currentPage}&limit=10&status=${filterStatus}&sortBy=createdAt&sortOrder=desc`
      );
      const data = await response.json();
      
      if (data.success) {
        setEnquiries(data.data);
        setTotalPages(data.pagination.totalPages);
      }
    } catch (error) {
      console.error('Error fetching enquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(`${BASE_URL}/enquiry/stats/overview`);
      const data = await response.json();
      
      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleStatusUpdate = async () => {
    try {
      const response = await fetch(`${BASE_URL}/enquiry/${selectedEnquiry._id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      const data = await response.json();
      
      if (data.success) {
        setShowModal(false);
        fetchEnquiries();
        fetchStats();
        alert('Enquiry updated successfully!');
      } else {
        alert('Failed to update enquiry');
      }
    } catch (error) {
      console.error('Error updating enquiry:', error);
      alert('Error updating enquiry');
    }
  };

  const handleDeleteEnquiry = async (id) => {
    if (window.confirm('Are you sure you want to delete this enquiry?')) {
      try {
        const response = await fetch(`${BASE_URL}/enquiry/${id}`, {
          method: 'DELETE',
        });

        const data = await response.json();
        
        if (data.success) {
          fetchEnquiries();
          fetchStats();
          alert('Enquiry deleted successfully!');
        } else {
          alert('Failed to delete enquiry');
        }
      } catch (error) {
        console.error('Error deleting enquiry:', error);
        alert('Error deleting enquiry');
      }
    }
  };

  const openUpdateModal = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setUpdateData({
      status: enquiry.status,
      adminNotes: enquiry.adminNotes || ''
    });
    setShowModal(true);
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: '#ffc107',
      'in-progress': '#17a2b8',
      resolved: '#28a745',
      closed: '#6c757d'
    };
    return colors[status] || '#6c757d';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN') + ' ' + 
           new Date(dateString).toLocaleTimeString('en-IN');
  };

  if (loading) {
    return <div className="loading">Loading enquiries...</div>;
  }

  return (
    <div className="enquiry-management">
      <div className="header">
        <h1>Enquiry Management</h1>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Enquiries</h3>
          <p className="stat-number">{stats.total || 0}</p>
        </div>
        <div className="stat-card pending">
          <h3>Pending</h3>
          <p className="stat-number">{stats.pending || 0}</p>
        </div>
        <div className="stat-card in-progress">
          <h3>In Progress</h3>
          <p className="stat-number">{stats.inProgress || 0}</p>
        </div>
        <div className="stat-card resolved">
          <h3>Resolved</h3>
          <p className="stat-number">{stats.resolved || 0}</p>
        </div>
        <div className="stat-card recent">
          <h3>Recent (7 days)</h3>
          <p className="stat-number">{stats.recent || 0}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="filters">
        <select 
          value={filterStatus} 
          onChange={(e) => {
            setFilterStatus(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      {/* Enquiries Table */}
      <div className="table-container">
        <table className="enquiry-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Mobile</th>
              <th>Query</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.map((enquiry) => (
              <tr key={enquiry._id}>
                <td>{enquiry.name}</td>
                <td>{enquiry.mobile}</td>
                <td className="query-cell">
                  {enquiry.query.length > 50 
                    ? `${enquiry.query.substring(0, 50)}...` 
                    : enquiry.query}
                </td>
                <td>
                  <span 
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(enquiry.status) }}
                  >
                    {enquiry.status}
                  </span>
                </td>
                <td>{formatDate(enquiry.createdAt)}</td>
                <td className="actions">
                  <button 
                    className="btn-update"
                    onClick={() => openUpdateModal(enquiry)}
                  >
                    Update
                  </button>
                  <button 
                    className="btn-delete"
                    onClick={() => handleDeleteEnquiry(enquiry._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button 
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        
        <span>Page {currentPage} of {totalPages}</span>
        
        <button 
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {/* Update Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Update Enquiry</h3>
              <button 
                className="modal-close"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <div className="enquiry-details">
                <p><strong>Name:</strong> {selectedEnquiry?.name}</p>
                <p><strong>Mobile:</strong> {selectedEnquiry?.mobile}</p>
                <p><strong>Query:</strong> {selectedEnquiry?.query}</p>
              </div>
              
              <div className="form-group">
                <label>Status:</label>
                <select 
                  value={updateData.status}
                  onChange={(e) => setUpdateData({...updateData, status: e.target.value})}
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Admin Notes:</label>
                <textarea 
                  value={updateData.adminNotes}
                  onChange={(e) => setUpdateData({...updateData, adminNotes: e.target.value})}
                  placeholder="Add notes about this enquiry..."
                  rows="3"
                />
              </div>
            </div>
            
            <div className="modal-footer">
              <button 
                className="btn-cancel"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button 
                className="btn-save"
                onClick={handleStatusUpdate}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnquiryManagement;