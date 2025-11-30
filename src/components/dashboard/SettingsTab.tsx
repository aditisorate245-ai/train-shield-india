import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Bell, 
  Shield, 
  Save,
  Upload,
  AlertTriangle
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const initialSettings = {
    profile: {
        fullName: "Nitin Kumar",
        designation: "NDMA Coordinator",
        email: "nitin.kumar@ndma.gov.in",
        phone: "+91-11-26701700",
        department: "training",
        location: "New Delhi",
    },
    notifications: {
        email: true,
        trainingUpdates: true,
        partnerActivities: true,
        systemAlerts: true,
        weeklyReports: false,
        sms: false,
    },
};

export const SettingsTab = () => {
  const [settings, setSettings] = useState(() => {
    const savedSettings = localStorage.getItem('settings');
    return savedSettings ? JSON.parse(savedSettings) : initialSettings;
  });

  const [profile, setProfile] = useState(settings.profile);
  const [notifications, setNotifications] = useState(settings.notifications);

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify({ profile, notifications }));
  }, [profile, notifications]);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setProfile(prev => ({ ...prev, [id]: value }));
  };

  const handleNotificationChange = (id: string, checked: boolean) => {
    setNotifications(prev => ({ ...prev, [id]: checked }));
  };

  const handleSaveChanges = () => {
    setSettings({ profile, notifications });
    alert('Settings saved successfully!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Settings</h2>
        <p className="text-muted-foreground">Manage your account and system preferences</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            <CardTitle>Profile Settings</CardTitle>
          </div>
          <CardDescription>Update your personal information and profile details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center text-accent-foreground text-2xl font-bold">
              {profile.fullName.split(' ').map((n: string) => n[0]).join('')}
            </div>
            <div className="space-y-2">
              <Button variant="outline" size="sm">
                <Upload className="w-4 h-4 mr-2" />
                Upload Photo
              </Button>
              <p className="text-xs text-muted-foreground">JPG, PNG or GIF. Max 2MB.</p>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" value={profile.fullName} onChange={handleProfileChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="designation">Designation</Label>
              <Input id="designation" value={profile.designation} onChange={handleProfileChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" value={profile.email} onChange={handleProfileChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" value={profile.phone} onChange={handleProfileChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Select value={profile.department} onValueChange={(value) => setProfile(prev => ({...prev, department: value}))}>
                <SelectTrigger id="department">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="training">Training & Capacity Building</SelectItem>
                  <SelectItem value="operations">Operations</SelectItem>
                  <SelectItem value="admin">Administration</SelectItem>
                  <SelectItem value="tech">Technology</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" value={profile.location} onChange={handleProfileChange} />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline">Cancel</Button>
            <Button variant="default" onClick={handleSaveChanges}>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-accent" />
            <CardTitle>Notification Preferences</CardTitle>
          </div>
          <CardDescription>Manage how you receive updates and alerts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
             <div className="flex items-center justify-between py-3">
                <div className="flex-1">
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive updates via email</p>
                </div>
                <Switch checked={notifications.email} onCheckedChange={(checked) => handleNotificationChange("email", checked)} />
            </div>
            <Separator />
            <div className="flex items-center justify-between py-3">
                <div className="flex-1">
                    <p className="font-medium">Training Updates</p>
                    <p className="text-sm text-muted-foreground">New trainings and schedule changes</p>
                </div>
                <Switch checked={notifications.trainingUpdates} onCheckedChange={(checked) => handleNotificationChange("trainingUpdates", checked)} />
            </div>
             <Separator />
            <div className="flex items-center justify-between py-3">
                <div className="flex-1">
                    <p className="font-medium">Partner Activities</p>
                    <p className="text-sm text-muted-foreground">Partner submissions and reports</p>
                </div>
                <Switch checked={notifications.partnerActivities} onCheckedChange={(checked) => handleNotificationChange("partnerActivities", checked)} />
            </div>
            <Separator />
            <div className="flex items-center justify-between py-3">
                <div className="flex-1">
                    <p className="font-medium">System Alerts</p>
                    <p className="text-sm text-muted-foreground">Critical system notifications</p>
                </div>
                <Switch checked={notifications.systemAlerts} onCheckedChange={(checked) => handleNotificationChange("systemAlerts", checked)} />
            </div>
            <Separator />
            <div className="flex items-center justify-between py-3">
                <div className="flex-1">
                    <p className="font-medium">Weekly Reports</p>
                    <p className="text-sm text-muted-foreground">Automated weekly summary emails</p>
                </div>
                <Switch checked={notifications.weeklyReports} onCheckedChange={(checked) => handleNotificationChange("weeklyReports", checked)} />
            </div>
             <Separator />
            <div className="flex items-center justify-between py-3">
                <div className="flex-1">
                    <p className="font-medium">SMS Notifications</p>
                    <p className="text-sm text-muted-foreground">Urgent alerts via text message</p>
                </div>
                <Switch checked={notifications.sms} onCheckedChange={(checked) => handleNotificationChange("sms", checked)} />
            </div>
          </div>
        </CardContent>
      </Card>

       <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-success" />
            <CardTitle>Security & Privacy</CardTitle>
          </div>
          <CardDescription>Manage your password and security preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input id="currentPassword" type="password" placeholder="Enter current password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input id="newPassword" type="password" placeholder="Enter new password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input id="confirmPassword" type="password" placeholder="Confirm new password" />
            </div>
             <div className="flex justify-end">
            <Button variant="default">
              <Save className="w-4 h-4 mr-2" />
              Update Password
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
