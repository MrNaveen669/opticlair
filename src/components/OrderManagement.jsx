

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const OrderManagement = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [updatingStatus, setUpdatingStatus] = useState(false);

//   const BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

//   // Helper function to extract token from local storage
//   const getAdminToken = () => {
//     const token = localStorage.getItem('token') || localStorage.getItem('adminToken');
//     console.log('Admin token from localStorage:', token ? 'Present' : 'Missing');
//     return token;
//   };

//   // Fetch orders from API
//   const fetchOrders = async (page = 1, status = 'all', search = '') => {
//     try {
//       setLoading(true);
//       const token = getAdminToken();
      
//       if (!token) {
//         alert('No admin token found. Please login again.');
//         return;
//       }

//       console.log('Fetching orders from:', `${BASE_URL}/admin/orders`);
//       console.log('With token:', token ? `${token.substring(0, 20)}...` : 'null');
      
//       const response = await axios.get(`${BASE_URL}/admin/orders`, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         params: {
//           page,
//           limit: 20,
//           status: status !== 'all' ? status : undefined,
//           search: search || undefined
//         }
//       });

//       console.log('Orders API response:', response.data);

//       if (response.data.success) {
//         setOrders(response.data.orders || []);
//         setTotalPages(response.data.pagination?.totalPages || 1);
//         setCurrentPage(response.data.pagination?.currentPage || 1);
//       } else {
//         alert('Failed to fetch orders: ' + (response.data.message || 'Unknown error'));
//       }
//     } catch (error) {
//       console.error('Error fetching orders:', error);
//       console.error('Response data:', error.response?.data);
//       console.error('Response status:', error.response?.status);
      
//       if (error.response?.status === 401) {
//         alert('Authentication failed. Please login again.');
//         localStorage.removeItem('token');
//         localStorage.removeItem('adminToken');
//         localStorage.removeItem('user');
//         localStorage.removeItem('isLoggedIn');
//         window.location.href = '/admin/login';
//       } else if (error.response?.status === 403) {
//         alert('Access denied. Admin privileges required.');
//       } else if (error.response?.status === 404) {
//         alert('Admin orders endpoint not found. Please check your backend routes.');
//       } else {
//         alert('Failed to fetch orders: ' + (error.response?.data?.message || error.message));
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Update order status
//   const updateOrderStatus = async (orderId, newStatus, notes = '') => {
//     try {
//       setUpdatingStatus(true);
//       const token = getAdminToken();
      
//       if (!token) {
//         alert('No admin token found. Please login again.');
//         return;
//       }

//       console.log('Updating order status:', `${BASE_URL}/admin/orders/${orderId}/status`);

//       const response = await axios.patch(
//         `${BASE_URL}/admin/orders/${orderId}/status`,
//         { status: newStatus, notes },
//         {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           }
//         }
//       );

//       if (response.data.success) {
//         fetchOrders(currentPage, statusFilter, searchTerm);
//         setIsModalOpen(false);
//         setSelectedOrder(null);
//         alert('Order status updated successfully!');
//       } else {
//         alert('Failed to update order status: ' + response.data.message);
//       }
//     } catch (error) {
//       console.error('Error updating order status:', error);
//       alert('Failed to update order status: ' + (error.response?.data?.message || error.message));
//     } finally {
//       setUpdatingStatus(false);
//     }
//   };

//   // Load orders on component mount and when filters change
//   useEffect(() => {
//     fetchOrders(currentPage, statusFilter, searchTerm);
//   }, [currentPage, statusFilter]);

//   // Handle search
//   const handleSearch = (e) => {
//     e.preventDefault();
//     setCurrentPage(1);
//     fetchOrders(1, statusFilter, searchTerm);
//   };

//   // Helper function to format date
//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-IN', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   // Helper function to get status color
//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Processing':
//         return 'bg-yellow-100 text-yellow-800';
//       case 'Shipped':
//         return 'bg-blue-100 text-blue-800';
//       case 'Delivered':
//         return 'bg-green-100 text-green-800';
//       case 'Cancelled':
//         return 'bg-red-100 text-red-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-6">Order Management</h1>

//       {/* Enhanced Debug Info */}
//       <div className="mb-4 p-4 bg-gray-100 rounded text-sm">
//         <p><strong>API URL:</strong> {BASE_URL}/admin/orders</p>
//         <p><strong>Token:</strong> {getAdminToken() ? 'Present' : 'Missing'}</p>
//         <p><strong>Orders Count:</strong> {orders.length}</p>
//         <p><strong>Current Page:</strong> {currentPage} of {totalPages}</p>
//         <p><strong>Status Filter:</strong> {statusFilter}</p>
//         <p><strong>Search Term:</strong> {searchTerm || 'None'}</p>
//       </div>

//       {/* Test Connection Button */}
//       <div className="mb-4">
//         <button
//           onClick={() => {
//             console.log('Testing connection to:', `${BASE_URL}/admin/orders`);
//             fetchOrders(1, 'all', '');
//           }}
//           className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//         >
//           Test Connection
//         </button>
//       </div>

//       {/* Filters and Search */}
//       <div className="mb-6 flex gap-4 items-center">
//         <select
//           value={statusFilter}
//           onChange={(e) => setStatusFilter(e.target.value)}
//           className="border rounded px-3 py-2"
//         >
//           <option value="all">All Orders</option>
//           <option value="Processing">Processing</option>
//           <option value="Shipped">Shipped</option>
//           <option value="Delivered">Delivered</option>
//           <option value="Cancelled">Cancelled</option>
//         </select>

//         <form onSubmit={handleSearch} className="flex gap-2">
//           <input
//             type="text"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             placeholder="Search by Order ID or customer..."
//             className="border rounded px-3 py-2 w-64"
//           />
//           <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
//             Search
//           </button>
//         </form>
//       </div>

//       {/* Orders Table */}
//       {loading ? (
//         <div className="text-center py-8">Loading orders...</div>
//       ) : orders.length === 0 ? (
//         <div className="text-center py-8">No orders found</div>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="w-full border-collapse border border-gray-300">
//             <thead>
//               <tr className="bg-gray-50">
//                 <th className="border border-gray-300 px-4 py-2">Order ID</th>
//                 <th className="border border-gray-300 px-4 py-2">Customer</th>
//                 <th className="border border-gray-300 px-4 py-2">Date</th>
//                 <th className="border border-gray-300 px-4 py-2">Amount</th>
//                 <th className="border border-gray-300 px-4 py-2">Status</th>
//                 <th className="border border-gray-300 px-4 py-2">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {orders.map((order) => (
//                 <tr key={order._id} className="hover:bg-gray-50">
//                   <td className="border border-gray-300 px-4 py-2 font-mono text-sm">
//                     {order.orderId}
//                   </td>
//                   <td className="border border-gray-300 px-4 py-2">
//                     {order.shippingAddress?.first_name} {order.shippingAddress?.last_name}
//                     <br />
//                     <span className="text-sm text-gray-600">{order.shippingAddress?.email}</span>
//                   </td>
//                   <td className="border border-gray-300 px-4 py-2 text-sm">
//                     {formatDate(order.createdAt)}
//                   </td>
//                   <td className="border border-gray-300 px-4 py-2 font-semibold">
//                     ₹{order.totalAmount}
//                   </td>
//                   <td className="border border-gray-300 px-4 py-2">
//                     <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
//                       {order.status}
//                     </span>
//                   </td>
//                   <td className="border border-gray-300 px-4 py-2">
//                     <button
//                       onClick={() => {
//                         setSelectedOrder(order);
//                         setIsModalOpen(true);
//                       }}
//                       className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 mr-2"
//                     >
//                       View Details
//                     </button>
//                     <select
//                       value={order.status}
//                       onChange={(e) => updateOrderStatus(order.orderId, e.target.value)}
//                       disabled={updatingStatus}
//                       className="text-xs border rounded px-2 py-1"
//                     >
//                       <option value="Processing">Processing</option>
//                       <option value="Shipped">Shipped</option>
//                       <option value="Delivered">Delivered</option>
//                       <option value="Cancelled">Cancelled</option>
//                     </select>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Pagination */}
//       <div className="mt-6 flex justify-center gap-2">
//         <button
//           onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//           disabled={currentPage === 1}
//           className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           Previous
//         </button>
//         <span className="px-3 py-1">
//           Page {currentPage} of {totalPages}
//         </span>
//         <button
//           onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//           disabled={currentPage === totalPages}
//           className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           Next
//         </button>
//       </div>

//       {/* Order Detail Modal */}
//       {isModalOpen && selectedOrder && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-bold">Order Details</h2>
//               <button
//                 onClick={() => {
//                   setIsModalOpen(false);
//                   setSelectedOrder(null);
//                 }}
//                 className="text-gray-500 hover:text-gray-700 text-2xl"
//               >
//                 &times;
//               </button>
//             </div>
            
//             <div className="space-y-4">
//               <div>
//                 <h3 className="font-semibold">Order Information</h3>
//                 <p><strong>Order ID:</strong> {selectedOrder.orderId}</p>
//                 <p><strong>Status:</strong> {selectedOrder.status}</p>
//                 <p><strong>Total Amount:</strong> ₹{selectedOrder.totalAmount}</p>
//                 <p><strong>Created At:</strong> {formatDate(selectedOrder.createdAt)}</p>
//               </div>
              
//               <div>
//                 <h3 className="font-semibold">Shipping Address</h3>
//                 <p>{selectedOrder.shippingAddress?.first_name} {selectedOrder.shippingAddress?.last_name}</p>
//                 <p>{selectedOrder.shippingAddress?.email}</p>
//                 <p>{selectedOrder.shippingAddress?.phone}</p>
//                 <p>{selectedOrder.shippingAddress?.address}</p>
//                 <p>{selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.state} {selectedOrder.shippingAddress?.zip}</p>
//               </div>
              
//               {selectedOrder.items && (
//                 <div>
//                   <h3 className="font-semibold">Order Items</h3>
//                   {selectedOrder.items.map((item, index) => (
//                     <div key={index} className="border-b py-2">
//                       <p><strong>Product:</strong> {item.name || item.productName}</p>
//                       <p><strong>Quantity:</strong> {item.quantity}</p>
//                       <p><strong>Price:</strong> ₹{item.price}</p>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrderManagement;
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