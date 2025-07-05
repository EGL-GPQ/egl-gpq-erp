// layout.jsx – Required for Next.js App Router

export const metadata = {
  title: 'EGL GPQ ERP',
  description: 'Track GPQ, QA, and shipment status live',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
