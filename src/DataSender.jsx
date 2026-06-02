import React, { useEffect, useState } from 'react';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getDatabase, ref, set, query, limitToLast, get } from 'firebase/database';


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

const DataSender = () => {
  const [isSending, setIsSending] = useState(false);
  const [lastSent, setLastSent] = useState(null);

  useEffect(() => {
    let intervalId = null;

    if (isSending) {
      intervalId = setInterval(async () => {
        try {
        
          const firewallRef = query(ref(database, 'firewall'), limitToLast(1));
          const snapshot = await get(firewallRef);
          
          let nextId = 1; 

          if (snapshot.exists()) {
            const data = snapshot.val();
            const keys = Object.keys(data);
           
            const lastId = Math.max(...keys.map(k => Number(k)));
            
           
            if (lastId < 99999999) { 
              nextId = lastId + 1;
            } else {
              nextId = 1; 
            }
          }

     
          const randomValue = Math.random().toFixed(4);
          //const dataToFormat = ""`${randomValue}\n`;

          const dataToFormat=`\"\"${randomValue}\\r\\n\"\"`;

          
          const nextIdStr = nextId.toString();
          const dataRef = ref(database, `firewall/${nextIdStr}`);
          
          await set(dataRef, dataToFormat);
          setLastSent({ id: nextIdStr, val: randomValue });

        } catch (error) {
          console.error("მონაცემის გაგზავნის შეცდომა:", error);
        }

      }, 2000); // ყოველ 2 წამში
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isSending]);

  return (
    <div style={{
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh', 
      fontFamily: 'sans-serif',
      backgroundColor: '#f3f4f6'
    }}>
      <div style={{
        padding: '30px', 
        borderRadius: '12px', 
        backgroundColor: '#fff', 
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        textAlign: 'center',
        minWidth: '300px'
      }}>
        <h2>Firebase მონაცემების გამგზავნი</h2>
        <p>სტატუსი: <strong style={{ color: isSending ? '#10b981' : '#ef4444' }}>{isSending ? "აქტიური" : "გაჩერებული"}</strong></p>
        
        <button 
          onClick={() => setIsSending(!isSending)}
          style={{
            padding: '12px 30px',
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#fff',
            backgroundColor: isSending ? '#ef4444' : '#10b981',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            marginBottom: '20px'
          }}
        >
          {isSending ? "სიმულაციის გაჩერება" : "სიმულაციის ჩართვა"}
        </button>

        {lastSent && (
          <div style={{ marginTop: '10px', fontSize: '14px', color: '#4b5563', borderTop: '1px solid #e5e7eb', paddingTop: '10px' }}>
            <strong>ბოლო გაგზავნილი:</strong>
            <div style={{ marginTop: '5px' }}>მოკლე ID: <span style={{ fontFamily: 'monospace', fontWeight: 'bold' }}>{lastSent.id}</span></div>
            <div style={{ color: '#2563eb', fontWeight: 'bold' }}>მნიშვნელობა: {lastSent.val}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataSender;