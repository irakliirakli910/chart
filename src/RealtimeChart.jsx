import React, { useEffect, useState } from 'react';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getDatabase, ref, onValue, query, limitToLast } from 'firebase/database';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts';

const firebaseConfig = {
  apiKey: "AIzaSyAdJe5j7BZpILyjeETkC-ITbFq1UNLthaM",
  authDomain: "intercomizacia.firebaseapp.com",
  databaseURL: "https://intercomizacia-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "intercomizacia",
  storageBucket: "intercomizacia.firebasestorage.app",
  messagingSenderId: "279787886930",
  appId: "1:279787886930:web:ee80566371852ef7a1428b",
  measurementId: "G-LPLV4WKFZF"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const database = getDatabase(app);

const RealtimeChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const firewallRef = query(ref(database, 'firewall'), limitToLast(20));
    const unsubscribe = onValue(firewallRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) return;

      const formattedData = Object.keys(data).map((key) => {
        const rawString = data[key];
        let val = typeof rawString === 'string' ? parseFloat(rawString.replace(/"/g, '').trim()) : Number(rawString);
        return { id: key, value: isNaN(val) ? 0 : val };
      });

      formattedData.sort((a, b) => Number(a.id) - Number(b.id));
      setChartData(formattedData);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div style={{ 
      width: '100%', 
      height: '450px', 
      backgroundColor: '#ffffff', 
      padding: '30px', 
      borderRadius: '20px', 
      boxShadow: '0 10px 20px rgba(0,0,0,0.08)',
      border: '1px solid #e2e8f0' 
    }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 30, right: 30, left: 0, bottom: 0 }}>
          {/* აქტიური გრიდი (ბადე) */}
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={true} horizontal={true} />
          
          <XAxis dataKey="id" hide />
          <YAxis domain={['auto', 'auto']} fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
          
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#2563eb" 
            strokeWidth={3} 
            dot={{ r: 5, fill: '#2563eb' }}
            activeDot={{ r: 8 }}
          >
            <LabelList 
              dataKey="value" 
              position="top" 
              offset={15} 
              fontSize={12} 
              fill="#1e293b" 
              fontWeight="600"
              formatter={(val) => val.toFixed(2)} 
            />
          </Line>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RealtimeChart;