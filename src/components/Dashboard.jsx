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
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              Orders
            </Link>
          </div>

          {/* New Prescriptions Section */}
          {/* <div style={{ marginBottom: '20px' }}>
            <Link
              to="/dashboard/orders?filter=prescriptions"
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px',
                textDecoration: 'none',
                color: '#333',
                backgroundColor: window.location.pathname.includes('prescriptions') ? '#fff3f0' : 'transparent',
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
                  color: window.location.pathname.includes('prescriptions') ? '#ff6347' : '#888'
                }}
              >
                <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/>
                <path d="M12 12h3m3 0h-3m0 0V9m0 3v3"/>
              </svg>
              Prescriptions
            </Link>
          </div> */}

          <div style={{ marginBottom: '20px' }}>
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
          <div style={{ marginBottom: '20px' }}>
            <Link
              to="/dashboard/prescriptions"
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px',
                textDecoration: 'none',
                color: '#333',
                backgroundColor: window.location.pathname.includes('prescriptions') ? '#fff3f0' : 'transparent',
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
                  color: window.location.pathname.includes('prescriptions') ? '#ff6347' : '#888'
                }}
              >
                <circle cx="6" cy="15" r="4"></circle>
                <circle cx="18" cy="15" r="4"></circle>
                <path d="M6 15c1.5-2 10.5-2 12 0"></path>
                <path d="M2 12l2-2h2"></path>
                <path d="M22 12l-2-2h-2"></path>
              </svg>
              Prescription Detail
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

        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
