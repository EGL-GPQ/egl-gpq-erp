"use client";

import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { db } from "../firebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  onSnapshot,
} from "firebase/firestore";

const FabricTracker = () => {
  const [rows, setRows] = useState([]);

  const fabricRef = collection(db, "fabric_tracker");

  // Load from Firebase when page loads
  useEffect(() => {
    const unsubscribe = onSnapshot(fabricRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setRows(data);
    });

    return () => unsubscribe();
  }, []);

  const handleAddRow = async () => {
    const newRow = {
      date: "",
      style: "",
      fabric: "",
      color: "",
      supplier: "",
      rollQty: "",
      inhouseQty: "",
      inspection: "",
      shade: "",
      shrinkage: "",
      approvedBy: "",
      remarks: "",
    };

    try {
      await addDoc(fabricRef, newRow);
    } catch (error) {
      console.error("Error adding row:", error);
    }
  };

  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Fabric Tracker");
    XLSX.writeFile(workbook, "Fabric_Tracker.xlsx");
  };

  const getApprovalColor = (value) => {
    if (!value) return "white";
    const text = value.toLowerCase();
    if (text.includes("approved")) return "#d4edda";
    if (text.includes("pending")) return "#fff3cd";
    if (text.includes("rejected")) return "#f8d7da";
    return "white";
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">📌 Fabric Inhouse & Inspection Tracker</h1>
      <button
        onClick={handleAddRow}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-2 hover:bg-blue-600"
      >
        ➕ Add Row
      </button>
      <button
        onClick={handleExport}
        className="bg-green-500 text-white px-4 py-2 rounded mb-2 ml-2 hover:bg-green-600"
      >
        📤 Export to Excel
      </button>
      <table className="w-full table-auto border border-collapse">
        <thead>
          <tr className="bg-gray-200 text-sm">
            <th className="border p-2">Date</th>
            <th className="border p-2">Style</th>
            <th className="border p-2">Fabric</th>
            <th className="border p-2">Color</th>
            <th className="border p-2">Supplier</th>
            <th className="border p-2">Roll Qty</th>
            <th className="border p-2">Inhouse Qty</th>
            <th className="border p-2">Inspection</th>
            <th className="border p-2">Shade</th>
            <th className="border p-2">Shrinkage %</th>
            <th className="border p-2">Approved By</th>
            <th className="border p-2">Remarks</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={row.id} className="text-sm">
              {Object.entries(row).map(([key, value], i) =>
                key !== "id" ? (
                  <td
                    key={i}
                    className="border p-2"
                    style={{
                      backgroundColor:
                        key === "approvedBy"
                          ? getApprovalColor(value)
                          : "white",
                    }}
                  >
                    {value}
                  </td>
                ) : null
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FabricTracker;
