
import React, { useState, useEffect } from 'react';
import './OrderManagement.css';
import { ORDER_MANAGEMENT_URL, ORDER_STATUS_UPDATE_URL } from '../config/api';

const BASE_URL = process.env.REACT_APP_BACKEND_URL ;

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  // Helper function to extract token from local storage
  const getAdminToken = () => {
    const token = localStorage.getItem('token') || localStorage.getItem('adminToken');
    console.log('Admin token from localStorage:', token ? 'Present' : 'Missing');
    return token;
  };

  // Fetch orders from API
  const fetchOrders = async (page = 1, status = 'all', search = '') => {
    try {
      setLoading(true);
      const token = getAdminToken();
      
      if (!token) {
        alert('No admin token found. Please login again.');
        return;
      }

      console.log('Fetching orders from:', ORDER_MANAGEMENT_URL);
      console.log('With token:', token ? `${token.substring(0, 20)}...` : 'null');
      
      const response = await fetch(`${ORDER_MANAGEMENT_URL}?${new URLSearchParams({
        page,
        limit: 20,
        ...(status !== 'all' && { status }),
        ...(search && { search })
      })}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      console.log('Orders API response:', data);

      if (data.success) {
        setOrders(data.orders || []);
        setTotalPages(data.pagination?.totalPages || 1);
        setCurrentPage(data.pagination?.currentPage || 1);
      } else {
        alert('Failed to fetch orders: ' + (data.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      
      if (error.status === 401) {
        alert('Authentication failed. Please login again.');
        localStorage.removeItem('token');
        localStorage.removeItem('adminToken');
        localStorage.removeItem('user');
        localStorage.removeItem('isLoggedIn');
        window.location.href = '/admin/login';
      } else if (error.status === 403) {
        alert('Access denied. Admin privileges required.');
      } else if (error.status === 404) {
        alert('Admin orders endpoint not found. Please check your backend routes.');
      } else {
        alert('Failed to fetch orders: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // Update order status
  const updateOrderStatus = async (orderId, newStatus, notes = '') => {
    try {
      setUpdatingStatus(true);
      const token = getAdminToken();
      
      if (!token) {
        alert('No admin token found. Please login again.');
        return;
      }

      const updateUrl = ORDER_STATUS_UPDATE_URL(orderId);
      console.log('Updating order status:', updateUrl);

      const response = await fetch(updateUrl, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus, notes })
      });

      const data = await response.json();

      if (data.success) {
        fetchOrders(currentPage, statusFilter, searchTerm);
        setIsModalOpen(false);
        setSelectedOrder(null);
        alert('Order status updated successfully!');
      } else {
        alert('Failed to update order status: ' + data.message);
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Failed to update order status: ' + error.message);
    } finally {
      setUpdatingStatus(false);
    }
  };

  // Load orders on component mount and when filters change
  useEffect(() => {
    fetchOrders(currentPage, statusFilter, searchTerm);
  }, [currentPage, statusFilter]);

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchOrders(1, statusFilter, searchTerm);
  };

  // Helper function to format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Helper function to get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Processing':
        return 'status-processing';
      case 'Shipped':
        return 'status-shipped';
      case 'Delivered':
        return 'status-delivered';
      case 'Cancelled':
        return 'status-cancelled';
      default:
        return 'status-default';
    }
  };

  // Get order statistics
  const getOrderStats = () => {
    const total = orders.length;
    const processing = orders.filter(order => order.status === 'Processing').length;
    const shipped = orders.filter(order => order.status === 'Shipped').length;
    const delivered = orders.filter(order => order.status === 'Delivered').length;
    const cancelled = orders.filter(order => order.status === 'Cancelled').length;
    
    return { total, processing, shipped, delivered, cancelled };
  };

  const stats = getOrderStats();
  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <h1 className="dashboard-title">Order Management</h1>
          <div className="header-actions">
            <button
              onClick={() => fetchOrders(1, 'all', '')}
              className="btn btn-refresh"
              disabled={loading}
            >
              {loading ? '↻' : '⟳'} Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-content">
            <div className="stat-number">{stats.total}</div>
            <div className="stat-label">Total Orders</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <div className="stat-number">{stats.processing}</div>
            <div className="stat-label">Processing</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🚚</div>
          <div className="stat-content">
            <div className="stat-number">{stats.shipped}</div>
            <div className="stat-label">Shipped</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <div className="stat-number">{stats.delivered}</div>
            <div className="stat-label">Delivered</div>
          </div>
        </div>
      </div>

      {/* Debug Panel (Collapsible) */}
      <details className="debug-panel">
        <summary>Debug Information</summary>
        <div className="debug-content">
          <div className="debug-item">
            <strong>API URL:</strong> {BASE_URL}/admin/orders
          </div>
          <div className="debug-item">
            <strong>Token:</strong> {getAdminToken() ? 'Present' : 'Missing'}
          </div>
          <div className="debug-item">
            <strong>Orders Count:</strong> {orders.length}
          </div>
          <div className="debug-item">
            <strong>Current Page:</strong> {currentPage} of {totalPages}
          </div>
          <div className="debug-item">
            <strong>Status Filter:</strong> {statusFilter}
          </div>
          <div className="debug-item">
            <strong>Search Term:</strong> {searchTerm || 'None'}
          </div>
        </div>
      </details>

      {/* Filters and Search */}
      <div className="controls-section">
        <div className="filters-container">
          <div className="filter-group">
            <label className="filter-label">Status Filter</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Orders</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div className="search-form">
            <div className="search-group">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by Order ID or customer..."
                className="search-input"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
              />
              <button onClick={handleSearch} className="btn btn-search">
                🔍 Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="table-container">
        {loading ? (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <h3>No orders found</h3>
            <p>There are no orders matching your current filters.</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="order-row">
                    <td className="order-id">
                      <span className="id-text">{order.orderId}</span>
                    </td>
                    <td className="customer-info">
                      <div className="customer-name">
                        {order.shippingAddress?.first_name} {order.shippingAddress?.last_name}
                      </div>
                      <div className="customer-email">
                        {order.shippingAddress?.email}
                      </div>
                    </td>
                    <td className="order-date">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="order-amount">
                      ₹{order.totalAmount?.toLocaleString('en-IN')}
                    </td>
                    <td className="order-status">
                      <span className={`status-badge ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="order-actions">
                      <button
                        onClick={() => {
                          setSelectedOrder(order);
                          setIsModalOpen(true);
                        }}
                        className="btn btn-view"
                      >
                        👁️ View
                      </button>
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.orderId, e.target.value)}
                        disabled={updatingStatus}
                        className="status-select"
                      >
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination-container">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="btn btn-pagination"
          >
            ← Previous
          </button>
          <div className="pagination-info">
            <span className="page-current">Page {currentPage}</span>
            <span className="page-separator">of</span>
            <span className="page-total">{totalPages}</span>
          </div>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="btn btn-pagination"
          >
            Next →
          </button>
        </div>
      )}

      {/* Order Detail Modal */}
      {isModalOpen && selectedOrder && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Order Details</h2>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedOrder(null);
                }}
                className="modal-close"
              >
                ✕
              </button>
            </div>
            
            <div className="modal-body">
              <div className="detail-section">
                <h3 className="section-title">📋 Order Information</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">Order ID:</span>
                    <span className="detail-value">{selectedOrder.orderId}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Status:</span>
                    <span className={`status-badge ${getStatusColor(selectedOrder.status)}`}>
                      {selectedOrder.status}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Total Amount:</span>
                    <span className="detail-value amount">₹{selectedOrder.totalAmount?.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Created At:</span>
                    <span className="detail-value">{formatDate(selectedOrder.createdAt)}</span>
                  </div>
                </div>
              </div>
              
              <div className="detail-section">
                <h3 className="section-title">🏠 Shipping Address</h3>
                <div className="address-info">
                  <div className="address-name">
                    {selectedOrder.shippingAddress?.first_name} {selectedOrder.shippingAddress?.last_name}
                  </div>
                  <div className="address-contact">
                    📧 {selectedOrder.shippingAddress?.email}
                  </div>
                  <div className="address-contact">
                    📞 {selectedOrder.shippingAddress?.phone}
                  </div>
                  <div className="address-full">
                    {selectedOrder.shippingAddress?.address}<br/>
                    {selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.state} {selectedOrder.shippingAddress?.zip}
                  </div>
                </div>
              </div>
              
              {selectedOrder.items && (
                <div className="detail-section">
                  <h3 className="section-title">🛍️ Order Items</h3>
                  <div className="items-list">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="item-card">
                        <div className="item-info">
                          <div className="item-name">{item.name || item.productName}</div>
                          <div className="item-details">
                            <span className="item-quantity">Qty: {item.quantity}</span>
                            <span className="item-price">₹{item.price?.toLocaleString('en-IN')}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;