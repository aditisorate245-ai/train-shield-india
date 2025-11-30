
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SettingsTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Manage your account and notification settings.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <h3 className="font-semibold">Account Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="John Doe" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="john.doe@example.com" />
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold">Notifications</h3>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <p className="text-sm">Email Notifications</p>
            <Button variant="outline">Toggle</Button>
          </div>
        </div>
        <Button>Save Changes</Button>
      </CardContent>
    </Card>
  );
};

export default SettingsTab;
