// app/layout.jsx
import React from 'react';

export const metadata = {
  title: 'EGL GPQ ERP',
  description: 'Track GPQ, QA, and shipment status live',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>{children}</body>
    </html>
  );
}
