'use client';

import React, { useState } from 'react';
import * as XLSX from 'xlsx';

export default function FabricTracker() {
  const [rows, setRows] = useState([
    {
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
    },
  ]);

  const handleChange = (index, key, value) => {
    const updatedRows = [...rows];
    updatedRows[index][key] = value;
    setRows(updatedRows);
  };

  const addRow = () => {
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
    setRows([...rows, newRow]);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Fabric Tracker');
    XLSX.writeFile(workbook, 'Fabric_Tracker.xlsx');
  };

  const getApprovalColor = (value = '') => {
    const val = value.toLowerCase();
    if (val.includes('approved')) return '#d4edda'; // Green
    if (val.includes('pending')) return '#fff3cd'; // Yellow
    if (val.includes('rejected')) return '#f8d7da'; // Red
    return 'white';
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ fontWeight: 'bold', fontSize: '20px', marginBottom: '15px' }}>
        📌 Fabric Inhouse & Inspection Tracker
      </h2>

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
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.keys(row).map((key) => (
                <td
                  key={key}
                  style={{
                    backgroundColor: key === 'approvedBy' ? getApprovalColor(row[key]) : 'white',
                  }}
                >
                  <input
                    type="text"
                    value={row[key]}
                    onChange={(e) => handleChange(rowIndex, key, e.target.value)}
                    style={{ width: '100%', padding: '4px', border: 'none' }}
                    placeholder={key === 'approvedBy' ? 'Approved / Pending / Rejected' : ''}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '15px' }}>
        <button
          onClick={addRow}
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
