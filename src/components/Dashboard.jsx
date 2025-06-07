import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet, Link } from 'react-router-dom';
// import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loginStatus = localStorage.getItem('isLoggedIn');
    if (loginStatus !== 'true') {
      navigate('/login');
    } else {
      setIsLoggedIn(true);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  if (!isLoggedIn) return null;

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh'
    }}>
      {/* Sidebar */}
      <div style={{
        width: '250px',
        backgroundColor: '#fff',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{
          fontSize: '24px',
          fontWeight: 'bold',
          marginBottom: '30px',
          color: '#ff6347',
          textAlign: 'center'
        }}>
          Admin Panel
        </div>

        <nav>
          <div style={{ marginBottom: '20px' }}>
            <Link
              to="/dashboard/manage-product"
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px',
                textDecoration: 'none',
                color: '#333',
                backgroundColor: window.location.pathname.includes('manage-product') ? '#fff3f0' : 'transparent',
                borderRadius: '8px'
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  marginRight: '10px',
                  color: window.location.pathname.includes('manage-product') ? '#ff6347' : '#888'
                }}
              >
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              Manage Products
            </Link>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <Link
              to="/dashboard/orders"
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px',
                textDecoration: 'none',
                color: '#333',
                backgroundColor: window.location.pathname.includes('orders') ? '#fff3f0' : 'transparent',
                borderRadius: '8px'
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  marginRight: '10px',
                  color: window.location.pathname.includes('orders') ? '#ff6347' : '#888'
                }}
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              Order Management
            </Link>
            <Link
              to="/dashboard/enquiry"
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px',
                textDecoration: 'none',
                color: '#333',
                backgroundColor: window.location.pathname.includes('manage-product') ? '#fff3f0' : 'transparent',
                borderRadius: '8px'
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  marginRight: '10px',
                  color: window.location.pathname.includes('enquiry') ? '#ff6347' : '#888'
                }}
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M8 14l4 4 4-4M12 6v12"></path>
              </svg>

              Enquiry Management
            </Link>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <Link
              to="/dashboard/appointments"
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px',
                textDecoration: 'none',
                color: '#333',
                backgroundColor: window.location.pathname.includes('appointments') ? '#fff3f0' : 'transparent',
                borderRadius: '8px'
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  marginRight: '10px',
                  color: window.location.pathname.includes('appointments') ? '#ff6347' : '#888'
                }}
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              Appointments
            </Link>
          </div>
        </nav>
      </div>

      {/* Main Content Area */}
      <div style={{
        flex: 1,
        padding: '20px',
        backgroundColor: '#f5f5f5',
        overflowY: 'auto',
        position: 'relative'
      }}>
        {/* Logout Button */}
        {/* <button 
          onClick={handleLogout}
          style={{
            position: 'absolute',
            top: '10px',
            right: '20px',
            padding: '8px 16px',
            backgroundColor: '#ff6347',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Logout
        </button> */}

        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
