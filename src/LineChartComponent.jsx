import React, { useEffect, useState } from 'react';
import { db } from './firebase'; 
import { ref, onValue } from "firebase/database";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const LineChartComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    
    const dataRef = ref(db, '/'); 

    const unsubscribe = onValue(dataRef, (snapshot) => {
      const allValues = snapshot.val();
      console.log("ბაზიდან მიღებული მონაცემები:", allValues);

      if (allValues) {
        let chartArray = [];
        let globalCounter = 1;

  
        const sortedKeys = Object.keys(allValues).sort((a, b) => parseInt(a) - parseInt(b));

        sortedKeys.forEach((key) => {
          const content = allValues[key];
          
          if (typeof content === 'string') {
            
            const numbers = content
              .split(/[\r\n]+/)
              .map(v => v.trim())
              .filter(v => v !== "" && !isNaN(v));

            numbers.forEach((num) => {
              chartArray.push({
                point: globalCounter++,
                val: parseFloat(num),
                id: key 
              });
            });
          }
        });

        setData(chartArray);
      }
    }, (error) => {
      console.error("Firebase კავშირის შეცდომა:", error);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div style={{ width: '100%', padding: '20px' }}>
      <h3 style={{ textAlign: 'center' }}>მონაცემების გრაფიკი (Real-time & History)</h3>
      <div style={{ width: '100%', height: 400, background: '#fff', padding: '10px', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="point" hide={data.length > 50} />
              <YAxis domain={['auto', 'auto']} />
              <Tooltip formatter={(value, name, props) => [value, `ID: ${props.payload.id}`]} />
              <Line 
                type="monotone" 
                dataKey="val" 
                stroke="#2563eb" 
                strokeWidth={2} 
                dot={data.length < 100}
                isAnimationActive={false} 
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div style={{ textAlign: 'center', paddingTop: '150px' }}>მონაცემები არ არის...</div>
        )}
      </div>
    </div>
  );
};

export default LineChartComponent;