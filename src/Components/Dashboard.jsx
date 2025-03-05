import React, { useState } from 'react';
import DashboardSummary from './DashboardSummary';
import StatCard from './StatCard';
import StatusPieChart from './StatusPieChart';
import BarChart from './BarChart';

// נתוני דוגמה לצורך הצגת הקומפוננטות
const mockData = {
  totalOpen: 3,
  responseTimeAvg: 0.81,
  resolutionTimeAvg: 7.75,
  slaBreaches: 1,
  byStatus: {
    "open": 2,
    "completed": 23,
    "canceled": 1,
    "in_progress": 1
  },
  byCategory: {
    "תפעול/אנסטלציה/סתימה": 11,
    "תפעול/אנסטלציה/התקנה": 3,
    "תפעול/אנסטלציה/תקלה": 6,
    "תפעול/ניקיון חוסר": 1,
    "תפעול/חשמל כללי": 1
  },
  byLocation: {
    "בניין A (עזריאלי חולון)": 11,
    "בניין D (עזריאלי חולון)": 4,
    "בניין B (עזריאלי חולון)": 7,
    "עזריאלי חולון 2": 5
  }
};

// רשימת הדשבורדים האפשריים
const dashboards = [
  { id: 'full', name: 'דשבורד מלא (מחובר ל-API)' },
  { id: 'components', name: 'דשבורד עם כל הקומפוננטות (נתוני דוגמה)' },
  { id: 'stat-cards', name: 'רק כרטיסי סטטיסטיקה' },
  { id: 'charts', name: 'רק גרפים' }
];

function Dashboard() {
  const [selectedDashboard, setSelectedDashboard] = useState('full');

  const renderDashboardContent = () => {
    switch (selectedDashboard) {
      case 'full':
        return <DashboardSummary />;
      
      case 'components':
        return (
          <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>דשבורד בקשות שירות - כל הקומפוננטות</h1>
            
            {/* כרטיסי סטטיסטיקה */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', marginBottom: '20px' }}>
              <StatCard 
                title="בקשות פתוחות" 
                value={mockData.totalOpen} 
                subtitle="סה״כ בקשות" 
                color="#2563eb"
              />
              
              <StatCard 
                title="זמן תגובה (ממוצע)" 
                value={mockData.responseTimeAvg} 
                subtitle="שעות" 
                color="#10b981"
              />
              
              <StatCard 
                title="זמן טיפול (ממוצע)" 
                value={mockData.resolutionTimeAvg} 
                subtitle="שעות" 
                color="#8b5cf6"
              />
              
              <StatCard 
                title="חריגות SLA" 
                value={mockData.slaBreaches} 
                subtitle="חריגות" 
                color="#ef4444"
              />
            </div>
            
            {/* גרף עוגה */}
            <div style={{ marginBottom: '20px' }}>
              <StatusPieChart statusData={mockData.byStatus} />
            </div>
            
            {/* גרפי עמודות */}
            <div style={{ marginBottom: '20px' }}>
              <BarChart 
                title="התפלגות לפי קטגוריה" 
                data={mockData.byCategory} 
                barColor="#93c5fd"
              />
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <BarChart 
                title="התפלגות לפי מיקום" 
                data={mockData.byLocation} 
                barColor="#82ca9d"
              />
            </div>
          </div>
        );
      
      case 'stat-cards':
        // רק כרטיסי סטטיסטיקה
        return (
          <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>כרטיסי סטטיסטיקה</h1>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', marginBottom: '20px' }}>
              <StatCard 
                title="בקשות פתוחות" 
                value={mockData.totalOpen} 
                subtitle="סה״כ בקשות" 
                color="#2563eb"
              />
              
              <StatCard 
                title="זמן תגובה (ממוצע)" 
                value={mockData.responseTimeAvg} 
                subtitle="שעות" 
                color="#10b981"
              />
              
              <StatCard 
                title="זמן טיפול (ממוצע)" 
                value={mockData.resolutionTimeAvg} 
                subtitle="שעות" 
                color="#8b5cf6"
              />
              
              <StatCard 
                title="חריגות SLA" 
                value={mockData.slaBreaches} 
                subtitle="חריגות" 
                color="#ef4444"
              />
            </div>
          </div>
        );
      
      case 'charts':
        // רק גרפים
        return (
          <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>גרפים</h1>
            
            <div style={{ marginBottom: '20px' }}>
              <StatusPieChart statusData={mockData.byStatus} />
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <BarChart 
                title="התפלגות לפי קטגוריה" 
                data={mockData.byCategory} 
                barColor="#93c5fd"
              />
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <BarChart 
                title="התפלגות לפי מיקום" 
                data={mockData.byLocation} 
                barColor="#82ca9d"
              />
            </div>
          </div>
        );
      
      default:
        return <div>בחר דשבורד מהרשימה</div>;
    }
  };

  return (
    <div className="App" dir="rtl">
      {/* סרגל ניווט עליון עם בחירת הדשבורד */}
      <div style={{ 
        backgroundColor: '#1e40af',
        color: 'white',
        padding: '10px 20px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <h2 style={{ margin: 0 }}>דשבורד בקשות שירות - עזריאלי חולון</h2>
          
          <div>
            <label htmlFor="dashboard-select" style={{ marginLeft: '10px' }}>בחר דשבורד:</label>
            <select 
              id="dashboard-select"
              value={selectedDashboard}
              onChange={(e) => setSelectedDashboard(e.target.value)}
              style={{ 
                padding: '8px',
                borderRadius: '4px',
                border: 'none',
                backgroundColor: 'white',
                color: '#333'
              }}
            >
              {dashboards.map(dashboard => (
                <option key={dashboard.id} value={dashboard.id}>
                  {dashboard.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* תוכן הדשבורד הנבחר */}
      <div style={{ backgroundColor: '#f5f5f5', minHeight: 'calc(100vh - 60px)' }}>
        {renderDashboardContent()}
      </div>
    </div>
  );
}

export default Dashboard;