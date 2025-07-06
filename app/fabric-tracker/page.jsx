'use client';

import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { db } from '@/app/firebaseConfig';
import {
  collection,
  getDocs,
  addDoc,
  onSnapshot,
} from 'firebase/firestore';

export default function FabricTracker() {
  const [rows, setRows] = useState([]);

  const fabricRef = collection(db, 'fabric_tracker');

  useEffect(() => {
    const unsubscribe = onSnapshot(fabricRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setRows(data);
    });

    return () => unsubscribe();
  }, []);

  const handleAddRow = async () => {
    const newRow = {
      date: '',
      style: '',
      fabric: '',
      color: '',
      supplier: '',
      rollQty: '',
      inhouseQty: '',
      inspection: '',
      shade: '',
      shrinkage: '',
      approvedBy: '',
      remarks: '',
    };

    try {
      await addDoc(fabricRef, newRow);
    } catch (error) {
      console.error('Error adding row:', error);
    }
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Fabric Tracker');
    XLSX.writeFile(workbook, 'Fabric_Tracker.xlsx');
  };

  const getApprovalColor = (value = '') => {
    const val = value.toLowerCase();
    if (val.includes('approved')) return '#d4edda';
    if (val.includes('pending')) return '#fff3cd';
    if (val.includes('rejected')) return '#f8d7da';
    return 'white';
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontWeight: 'bold', marginBottom: '10px' }}>
        📌 Fabric Inhouse & Inspection Tracker
      </h1>

      <table
        border="1"
        cellPadding="5"
        style={{
          width: '100%',
          fontSize: '14px',
          borderCollapse: 'collapse',
          textAlign: 'center',
        }}
      >
        <thead style={{ backgroundColor: '#f0f0f0' }}>
          <tr>
            <th>Date</th>
            <th>Style</th>
            <th>Fabric</th>
            <th>Color</th>
            <th>Supplier</th>
            <th>Roll Qty</th>
            <th>Inhouse Qty</th>
            <th>Inspection</th>
            <th>Shade</th>
            <th>Shrinkage %</th>
            <th>Approved By</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.id}>
              <td>{row.date}</td>
              <td>{row.style}</td>
              <td>{row.fabric}</td>
              <td>{row.color}</td>
              <td>{row.supplier}</td>
              <td>{row.rollQty}</td>
              <td>{row.inhouseQty}</td>
              <td>{row.inspection}</td>
              <td>{row.shade}</td>
              <td>{row.shrinkage}</td>
              <td
                style={{
                  backgroundColor: getApprovalColor(row.approvedBy),
                }}
              >
                {row.approvedBy}
              </td>
              <td>{row.remarks}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '15px' }}>
        <button
          onClick={handleAddRow}
          style={{
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            marginRight: '10px',
          }}
        >
          ➕ Add Row
        </button>

        <button
          onClick={exportToExcel}
          style={{
            backgroundColor: '#28a745',
            color: '#fff',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          📤 Export to Excel
        </button>
      </div>
    </div>
  );
}
