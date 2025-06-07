import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ManageProduct from './components/ManageProduct';
import OrderManagement from './components/OrderManagement';
import EnquiryManagement from './components/EnquiryManagement';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="manage-product" element={<ManageProduct />} />
          <Route path="orders" element={<OrderManagement />} />
          <Route path="enquiry" element={<EnquiryManagement />} />
          <Route index element={<Navigate to="manage-product" replace />} />
        </Route>
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;