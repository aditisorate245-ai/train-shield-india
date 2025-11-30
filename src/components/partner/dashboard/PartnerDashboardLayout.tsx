
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  LayoutDashboard, 
  GraduationCap, 
  Search, 
  Bell, 
  Moon, 
  Sun,
  Shield,
  LogOut,
  FileText,
  BarChart3,
  Settings
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import PartnerDashboard from "./PartnerDashboard";
import AnalyticsTab from "./AnalyticsTab";
import AssessmentsTab from "./AssessmentsTab";
import AttendanceTab from "./AttendanceTab";
import CertificatesTab from "./CertificatesTab";
import SettingsTab from "./SettingsTab";
import TrainingsTab from "./TrainingsTab";

type TabType = "dashboard" | "trainings" | "assessments" | "attendance" | "certificates" | "analytics" | "settings";

const PartnerDashboardLayout = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const navigate = useNavigate();

  const navItems = [
    { id: "dashboard" as TabType, icon: <LayoutDashboard className="w-5 h-5" />, label: "Dashboard" },
    { id: "trainings" as TabType, icon: <GraduationCap className="w-5 h-5" />, label: "Trainings" },
    { id: "assessments" as TabType, icon: <FileText className="w-5 h-5" />, label: "Assessments" },
    { id: "attendance" as TabType, icon: <FileText className="w-5 h-5" />, label: "Attendance" },
    { id: "certificates" as TabType, icon: <Shield className="w-5 h-5" />, label: "Certificates" },
    { id: "analytics" as TabType, icon: <BarChart3 className="w-5 h-5" />, label: "Analytics" },
    { id: "settings" as TabType, icon: <Settings className="w-5 h-5" />, label: "Settings" },
  ];

  const handleSignOut = () => {
    localStorage.clear();
    navigate("/");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <PartnerDashboard />;
      case "trainings":
        return <TrainingsTab />;
      case "assessments":
        return <AssessmentsTab />;
      case "attendance":
        return <AttendanceTab />;
      case "certificates":
        return <CertificatesTab />;
      case "analytics":
        return <AnalyticsTab />;
      case "settings":
        return <SettingsTab />;
      default:
        return <PartnerDashboard />;
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      <div className="flex min-h-screen bg-background">
        {/* Sidebar */}
        <aside className="hidden lg:flex w-64 bg-card border-r border-border flex-col">
          <div className="p-6 border-b border-border">
            <div className="flex items-center gap-2">
              <Shield className="w-8 h-8 text-accent" />
              <div>
                <h1 className="font-bold text-lg text-foreground">TrainShield</h1>
                <p className="text-xs text-muted-foreground">Partner Portal</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === item.id
                    ? "bg-accent text-accent-foreground shadow-md"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}>
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-border">
            <Link to="/">
              <Button variant="ghost" className="w-full justify-start">
                Back to Landing
              </Button>
            </Link>
             <Button variant="ghost" className="w-full justify-start" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 border-b border-border bg-card flex items-center justify-between px-4 lg:px-8">
            <div className="flex items-center gap-4 flex-1">
              <h2 className="text-xl font-semibold text-foreground hidden sm:block capitalize">{activeTab.replace(/-/g, ' ')}</h2>
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Search..." 
                  className="pl-10 bg-background"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
              </Button>
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-semibold text-sm">
                P
              </div>
            </div>
          </header>

          {/* Content Area */}
          <main className="flex-1 p-4 lg:p-8 overflow-auto">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default PartnerDashboardLayout;
