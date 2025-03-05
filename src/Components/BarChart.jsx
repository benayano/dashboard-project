import React from 'react';

const BarChart = ({ title, data, barColor = '#93c5fd' }) => {
  if (!data || Object.keys(data).length === 0) return null;
  
  // מציאת הערך המקסימלי לחישוב הגבהים היחסיים
  const maxValue = Math.max(...Object.values(data));
  
  return (
    <div style={{ 
      backgroundColor: 'white', 
      borderRadius: '8px', 
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', 
      padding: '20px',
      height: '100%'
    }}>
      <h3 style={{ fontSize: '18px', marginBottom: '15px', color: '#333' }}>{title}</h3>
      <div className="bar-chart" style={{ 
        display: 'flex', 
        height: '250px', 
        marginTop: '20px',
        alignItems: 'flex-end',
      }}>
        {Object.entries(data).map(([name, value], index) => {
          // חישוב גובה יחסי של העמודה ביחס לערך המקסימלי
          const barHeight = (value / maxValue) * 100;
          
          return (
            <div key={index} style={{ 
              flex: 1, 
              minWidth: '40px',
              margin: '0 5px', 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center',
              height: '100%', // חשוב לתת גובה כולל קבוע
              justifyContent: 'flex-end' // כדי שהעמודות יהיו מיושרות לתחתית
            }}>
              <div 
                className="bar" 
                style={{
                  width: '100%',
                  height: `${barHeight}%`, // הגובה היחסי
                  backgroundColor: barColor,
                  borderRadius: '4px 4px 0 0',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  position: 'relative'
                }}
              >
                <div style={{ 
                  padding: '5px 0', 
                  fontWeight: 'bold', 
                  color: 'white',
                  position: 'absolute',
                  top: '5px'
                }}>
                  {value}
                </div>
              </div>
              <div 
                style={{ 
                  fontSize: '12px', 
                  marginTop: '5px', 
                  textAlign: 'center', 
                  maxWidth: '80px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
                title={name} 
              >
                {name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BarChart;