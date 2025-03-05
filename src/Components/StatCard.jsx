import React from 'react';

const StatCard = ({ title, value, subtitle, color = '#2563eb' }) => {
  return (
    <div style={{ 
      backgroundColor: 'white', 
      borderRadius: '8px', 
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', 
      padding: '20px',
      height: '100%'
    }}>
      <h3 style={{ fontSize: '18px', marginBottom: '15px', color: '#333' }}>{title}</h3>
      <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '5px', color: color }}>{value}</div>
      <div style={{ color: '#666', fontSize: '14px' }}>{subtitle}</div>
    </div>
  );
};

export default StatCard;