import React from 'react';
import RealtimeChart from './RealtimeChart';
import DataSender from './DataSender';

function App() {
  return (
    <div style={{ 
      backgroundColor: '#f8fafc', 
      minHeight: '100vh', 
      padding: '40px 20px',
      fontFamily: "'Inter', -apple-system, sans-serif" 
    }}>
      
      <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '40px' }}>
        
        {/* სათაურის ბლოკი */}
        <header>
          <h1 style={{ margin: '0', fontSize: '32px', color: '#0f172a', fontWeight: '800' }}>
            მონიტორინგი
          </h1>
          <p style={{ margin: '8px 0 0', color: '#64748b', fontSize: '16px' }}>
          მონაცემთა რეალური დროის ანალიზის
          </p>
        </header>

        {/* გრაფიკის ბლოკი - აქ უკვე გაშლილია */}
        <section style={{ width: '100%' }}>
          <RealtimeChart />
        </section>

        {/* მონაცემთა მართვის ბლოკი */}
        <section style={{ 
          backgroundColor: '#ffffff',
          padding: '30px',
          borderRadius: '20px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
        }}>
          <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', color: '#334155' }}>
            მონაცემების გაშვება Firebase ში
          </h3>
          <DataSender />
        </section>

      </div>
    </div>
  );
}

export default App;