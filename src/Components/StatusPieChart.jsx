import React from 'react';

const StatusPieChart = ({ statusData }) => {
  if (!statusData) return null;
  
  const total = Object.values(statusData).reduce((sum, value) => sum + value, 0);
  
  const statusColors = {
    'open': '#fcd34d',
    'in_progress': '#60a5fa',
    'completed': '#34d399',
    'canceled': '#f87171',
    'pending': '#a8a29e'
  };
  
  let gradientString = '';
  let startPercentage = 0;
  
  const legendItems = Object.entries(statusData).map(([status, count]) => {
    const percentage = (count / total) * 100;
    const endPercentage = startPercentage + percentage;
    const color = statusColors[status] || '#ccc';
    
    gradientString += `${color} ${startPercentage}% ${endPercentage}%, `;
    startPercentage = endPercentage;
    
    return (
      <div className="legend-item" key={status}>
        <div 
          className="legend-color" 
          style={{ 
            width: '15px', 
            height: '15px', 
            borderRadius: '3px', 
            backgroundColor: color 
          }}
        ></div>
        <span>{status} ({count})</span>
      </div>
    );
  });
  
  gradientString = gradientString.slice(0, -2);
  
  return (
    <div style={{ 
      backgroundColor: 'white', 
      borderRadius: '8px', 
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', 
      padding: '20px', 
      height: '100%'
    }}>
      <h3 style={{ fontSize: '18px', marginBottom: '15px', color: '#333' }}>התפלגות לפי סטטוס</h3>
      <div className="pie-container" style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
        <div 
          className="pie-chart" 
          style={{
            position: 'relative',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: `conic-gradient(${gradientString})`
          }}
        ></div>
        <div className="legend" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {legendItems}
        </div>
      </div>
    </div>
  );
};

export default StatusPieChart;