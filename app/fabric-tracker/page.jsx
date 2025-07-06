'use client';

import React, { useState } from 'react';

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
      status: '',
      shade: '',
      shrinkage: '',
      approvedBy: '',
      remarks: '',
    },
  ]);

  const handleChange = (index, key, value) => {
    const updated = [...rows];
    updated[index][key] = value;
    setRows(updated);
  };

  const addRow = () => {
    setRows([...rows, { ...rows[0] }]);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontWeight: 'bold', marginBottom: '10px' }}>🧾 Fabric Inhouse & Inspection Tracker</h1>
      <table border="1" cellPadding="5" style={{ width: '100%', fontSize: '14px' }}>
        <thead>
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
            <tr key={i}>
              {Object.keys(row).map((key) => (
                <td key={key}>
                  <input
                    type="text"
                    value={row[key]}
                    onChange={(e) => handleChange(i, key, e.target.value)}
                    style={{ width: '100%' }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={addRow} style={{ marginTop: '10px', padding: '6px 12px' }}>
        ➕ Add Row
      </button>
    </div>
  );
}
