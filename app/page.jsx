
// Starter ERP Web App for GPQ - React + Tailwind

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart2, ClipboardList, Truck, LayoutDashboard } from 'lucide-react';

export default function Home() {
  return (
    <main className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="shadow-md border-2 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <LayoutDashboard className="text-blue-600" size={32} />
            <div>
              <h2 className="text-xl font-semibold">Style Tracker</h2>
              <p className="text-sm text-gray-600">Monitor progress from Fabric to Shipment</p>
            </div>
          </div>
          <Button className="mt-4">Open Module</Button>
        </CardContent>
      </Card>

      <Card className="shadow-md border-2 border-green-200">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <ClipboardList className="text-green-600" size={32} />
            <div>
              <h2 className="text-xl font-semibold">Sample Management</h2>
              <p className="text-sm text-gray-600">PP, Size Set, Gold Seal Tracking</p>
            </div>
          </div>
          <Button className="mt-4">Open Module</Button>
        </CardContent>
      </Card>

      <Card className="shadow-md border-2 border-yellow-200">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <BarChart2 className="text-yellow-600" size={32} />
            <div>
              <h2 className="text-xl font-semibold">QA Check</h2>
              <p className="text-sm text-gray-600">Inline / Final Audit Reporting</p>
            </div>
          </div>
          <Button className="mt-4">Open Module</Button>
        </CardContent>
      </Card>

      <Card className="shadow-md border-2 border-purple-200">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <Truck className="text-purple-600" size={32} />
            <div>
              <h2 className="text-xl font-semibold">Shipment Info</h2>
              <p className="text-sm text-gray-600">Carton Status, Booking, and Readiness</p>
            </div>
          </div>
          <Button className="mt-4">Open Module</Button>
        </CardContent>
      </Card>
    </main>
  );
}
