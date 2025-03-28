import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet, Link } from 'react-router-dom';

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
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f5f5f5' }}>
      {/* Sidebar */}
      <div style={{ 
        width: '250px', 
        backgroundColor: 'white', 
        borderRight: '1px solid #e0e0e0',
        padding: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
          <h1 style={{ color: '#ff6347', margin: 0, fontWeight: 'bold' }}>OptiClair</h1>
          <span style={{ marginLeft: '10px', color: '#888', fontSize: '14px' }}>Admin Panel</span>
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
        </nav>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, padding: '20px', backgroundColor: '#f5f5f5', overflowY: 'auto', position: 'relative' }}>
        {/* Logout Button Moved to Top Right */}
        <button 
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
        </button>

        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
