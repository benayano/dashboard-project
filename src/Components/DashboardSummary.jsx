import React, { useState, useEffect } from 'react';
import StatCard from './StatCard';
import StatusPieChart from './StatusPieChart';
import BarChart from './BarChart';

// פונקציה פנימית לפורמט תאריך
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const DashboardSummary = () => {
  // ניהול מצב הדשבורד
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [summaryData, setSummaryData] = useState(null);
  
  // פרמטרים לשאילתה
  const [dateFrom, setDateFrom] = useState(formatDate(new Date(new Date().setMonth(new Date().getMonth() - 1))));
  const [dateTo, setDateTo] = useState(formatDate(new Date()));
  const [departmentId, setDepartmentId] = useState("");
  const [tenantId, setTenantId] = useState("");
  const [locationId, setLocationId] = useState("");

  // פונקציה לשליפת נתוני הדשבורד
  const fetchDashboardData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // בניית ה-URL עבור הבקשה
      const url = `/dashboard/summary?departmentId=${departmentId || ''}&tenantId=${tenantId || ''}&locationId=${locationId || ''}&dateFrom=${dateFrom}&dateTo=${dateTo}`;
      
      // ביצוע קריאת GET לשרת
      const response = await fetch(url);
      
      // בדיקה שהתקבלה תשובה תקינה מהשרת
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // המרת התשובה לפורמט JSON
      const data = await response.json();
      
      // עדכון המצב עם הנתונים מהשרת
      setSummaryData(data);
      setIsLoading(false);
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError(`אירעה שגיאה בטעינת הנתונים: ${error.message}`);
      setIsLoading(false);
    }
  };

  // טעינה ראשונית של נתונים
  useEffect(() => {
    fetchDashboardData();
  }, []);

  // טיפול בשליחת הטופס
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchDashboardData();
  };

  return (
    <div dir="rtl" style={{ backgroundColor: '#f5f5f5', padding: '20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ color: '#333', marginBottom: '20px', textAlign: 'center' }}>דשבורד בקשות שירות - עזריאלי חולון</h1>
        
        {/* טופס סינון */}
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', marginBottom: '20px' }}>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', marginBottom: '15px' }}>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px' }}>
                  מתאריך<span style={{ color: 'red' }}> *</span>
                </label>
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  required
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                />
              </div>
              
              <div style={{ flex: 1, minWidth: '200px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px' }}>
                  עד תאריך<span style={{ color: 'red' }}> *</span>
                </label>
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  required
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                />
              </div>
              
              <div style={{ flex: 1, minWidth: '200px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px' }}>
                  מחלקה
                </label>
                <select
                  value={departmentId}
                  onChange={(e) => setDepartmentId(e.target.value)}
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                >
                  <option value="">כל המחלקות</option>
                  <option value="1">אחזקה</option>
                  <option value="2">ניקיון</option>
                  <option value="3">חניון</option>
                  <option value="4">מוקד בקרה</option>
                </select>
              </div>
              
              <div style={{ flex: 1, minWidth: '200px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px' }}>
                  שוכר
                </label>
                <select
                  value={tenantId}
                  onChange={(e) => setTenantId(e.target.value)}
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                >
                  <option value="">כל השוכרים</option>
                  <option value="1">בנק הפועלים</option>
                  <option value="2">טלדור</option>
                  <option value="3">מפעל הפיס</option>
                  <option value="4">בזק</option>
                </select>
              </div>
              
              <div style={{ flex: 1, minWidth: '200px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px' }}>
                  מיקום
                </label>
                <select
                  value={locationId}
                  onChange={(e) => setLocationId(e.target.value)}
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                >
                  <option value="">כל המיקומים</option>
                  <option value="1">בניין A</option>
                  <option value="2">בניין B</option>
                  <option value="3">בניין C</option>
                  <option value="4">בניין D</option>
                </select>
              </div>
            </div>
            
            <button
              type="submit"
              style={{
                backgroundColor: '#2563eb',
                color: 'white',
                border: 'none',
                padding: '10px 15px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              הצג נתונים
            </button>
          </form>
        </div>
        
        {error && (
          <div style={{ backgroundColor: '#fee2e2', color: '#b91c1c', borderRadius: '8px', padding: '15px', marginBottom: '20px' }}>
            {error}
          </div>
        )}
        
        {isLoading && (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                margin: '0 auto',
                border: '5px solid #f3f3f3',
                borderTop: '5px solid #2563eb',
                borderRadius: '50%',
                animation: 'spin 2s linear infinite'
              }}
            ></div>
            <p>טוען נתונים...</p>
            <style>
              {`
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              `}
            </style>
          </div>
        )}
        
        {/* תוכן הדשבורד */}
        {!isLoading && !error && summaryData && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', marginBottom: '20px' }}>
              <StatCard 
                title="בקשות פתוחות" 
                value={summaryData.totalOpen} 
                subtitle="סה״כ בקשות" 
                color="#2563eb"
              />
              
              <StatCard 
                title="זמן תגובה (ממוצע)" 
                value={summaryData.responseTimeAvg} 
                subtitle="שעות" 
                color="#10b981"
              />
              
              <StatCard 
                title="זמן טיפול (ממוצע)" 
                value={summaryData.resolutionTimeAvg} 
                subtitle="שעות" 
                color="#8b5cf6"
              />
              
              <StatCard 
                title="חריגות SLA" 
                value={summaryData.slaBreaches} 
                subtitle="חריגות" 
                color="#ef4444"
              />
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <StatusPieChart statusData={summaryData.byStatus} />
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <BarChart 
                title="התפלגות לפי קטגוריה" 
                data={summaryData.byCategory} 
                barColor="#93c5fd"
              />
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <BarChart 
                title="התפלגות לפי מיקום" 
                data={summaryData.byLocation} 
                barColor="#82ca9d"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardSummary;