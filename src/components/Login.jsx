// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { ADMIN_LOGIN_URL } from '../config/api';

// function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     try {
//       // Ensure the username is treated as an email
//       const response = await axios.post(ADMIN_LOGIN_URL, {
//         username: username.includes('@') ? username : 'admin@opticlair.com',
//         password
//       });

//       if (response.data.success) {        // Store admin info
//         localStorage.setItem('token', response.data.token);
//         localStorage.setItem('user', JSON.stringify({
//           ...response.data.user,
//           isAdmin: true
//         }));
//         localStorage.setItem('isLoggedIn', 'true');
        
//         // Navigate to dashboard orders page
//         navigate('/dashboard/orders');
//       } else {
//         setError('Invalid credentials');
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       setError(error.response?.data?.message || 'Login failed. Please check your credentials.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ 
//       display: 'flex', 
//       justifyContent: 'center', 
//       alignItems: 'center', 
//       height: '100vh',
//       backgroundColor: '#f0f2f5'
//     }}>
//       <form 
//         onSubmit={handleLogin} 
//         style={{
//           backgroundColor: 'white',
//           padding: '20px',
//           borderRadius: '8px',
//           boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
//           width: '300px'
//         }}
//       >
//         <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Admin Login</h2>
//         {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
//         <div style={{ marginBottom: '15px' }}>          <label htmlFor="username" style={{ display: 'block', marginBottom: '5px' }}>
//             Email
//           </label>
//           <input
//             type="email"
//             id="username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             style={{
//               width: '100%',
//               padding: '10px',
//               borderRadius: '4px',
//               border: '1px solid #ddd'
//             }}
//             required
//             disabled={loading}
//           />
//         </div>
//         <div style={{ marginBottom: '15px' }}>
//           <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>
//             Password
//           </label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             style={{
//               width: '100%',
//               padding: '10px',
//               borderRadius: '4px',
//               border: '1px solid #ddd'
//             }}
//             required
//             disabled={loading}
//           />
//         </div>
//         <button
//           type="submit"
//           style={{
//             width: '100%',
//             padding: '10px',
//             backgroundColor: '#4CAF50',
//             color: 'white',
//             border: 'none',
//             borderRadius: '4px',
//             cursor: loading ? 'not-allowed' : 'pointer',
//             opacity: loading ? 0.7 : 1
//           }}
//           disabled={loading}
//         >
//           {loading ? 'Logging in...' : 'Login'}
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Login;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ADMIN_LOGIN_URL } from '../config/api';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Ensure the username is treated as an email
      const response = await axios.post(ADMIN_LOGIN_URL, {
        username: username.includes('@') ? username : 'admin@opticlair.com',
        password
      });

      if (response.data.success) {        // Store admin info
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify({
          ...response.data.user,
          isAdmin: true
        }));
        localStorage.setItem('isLoggedIn', 'true');
        
        // Navigate to dashboard orders page
        navigate('/dashboard/orders');
      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      backgroundColor: '#f0f2f5'
    }}>
      <form 
        onSubmit={handleLogin} 
        style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          width: '300px'
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Admin Login</h2>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        <div style={{ marginBottom: '15px' }}>          <label htmlFor="username" style={{ display: 'block', marginBottom: '5px' }}>
            Email
          </label>
          <input
            type="email"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #ddd'
            }}
            required
            disabled={loading}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #ddd'
            }}
            required
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1
          }}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default Login;