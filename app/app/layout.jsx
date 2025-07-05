// app/layout.jsx
import './globals.css'; // If you're using Tailwind or global styles

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
