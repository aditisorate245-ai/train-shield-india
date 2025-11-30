import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  GraduationCap, 
  Award, 
  Plus, 
  Clock, 
  Users, 
  MapPin, 
  Camera, 
  Upload,
  Download,
  Wifi,
  WifiOff,
  Globe,
  QrCode,
  Shield
} from "lucide-react";
import { Link } from "react-router-dom";

const MobileApp = () => {
  const [activeTab, setActiveTab] = useState<"trainings" | "create" | "certificates">("trainings");
  const [isOnline, setIsOnline] = useState(true);

  const trainings = [
    { 
      title: "Flood Response Training", 
      date: "Dec 15-17, 2024", 
      participants: 45,
      status: "upcoming",
      location: "Gujarat"
    },
    { 
      title: "Earthquake Preparedness", 
      date: "Dec 10-12, 2024", 
      participants: 38,
      status: "completed",
      location: "Kerala"
    },
    { 
      title: "Fire Safety Basics", 
      date: "Dec 5-7, 2024", 
      participants: 52,
      status: "completed",
      location: "Maharashtra"
    },
  ];

  const certificates = [
    { name: "Flood Response Training", issued: "Dec 12, 2024", id: "CERT-2024-001" },
    { name: "First Aid Training", issued: "Nov 28, 2024", id: "CERT-2024-002" },
    { name: "Search & Rescue", issued: "Nov 15, 2024", id: "CERT-2024-003" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <header className="bg-primary text-primary-foreground p-4 sticky top-0 z-10 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-accent" />
            <div>
              <h1 className="font-bold text-lg">TrainShield</h1>
              <p className="text-xs text-primary-foreground/80">Partner Portal</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-primary-foreground hover:bg-primary-foreground/10"
              onClick={() => setIsOnline(!isOnline)}
            >
              {isOnline ? <Wifi className="w-5 h-5" /> : <WifiOff className="w-5 h-5" />}
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Globe className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {!isOnline && (
          <div className="bg-accent/20 border border-accent/30 rounded-lg p-2 flex items-center gap-2 text-sm">
            <WifiOff className="w-4 h-4" />
            <span>Offline Mode - Changes will sync when online</span>
          </div>
        )}
      </header>

      {/* Tab Navigation */}
      <div className="border-b border-border bg-card sticky top-[88px] z-10">
        <div className="flex">
          <button
            onClick={() => setActiveTab("trainings")}
            className={`flex-1 flex items-center justify-center gap-2 py-4 border-b-2 transition-colors ${
              activeTab === "trainings"
                ? "border-accent text-accent font-semibold"
                : "border-transparent text-muted-foreground"
            }`}
          >
            <GraduationCap className="w-5 h-5" />
            <span>My Trainings</span>
          </button>
          <button
            onClick={() => setActiveTab("create")}
            className={`flex-1 flex items-center justify-center gap-2 py-4 border-b-2 transition-colors ${
              activeTab === "create"
                ? "border-accent text-accent font-semibold"
                : "border-transparent text-muted-foreground"
            }`}
          >
            <Plus className="w-5 h-5" />
            <span>Create</span>
          </button>
          <button
            onClick={() => setActiveTab("certificates")}
            className={`flex-1 flex items-center justify-center gap-2 py-4 border-b-2 transition-colors ${
              activeTab === "certificates"
                ? "border-accent text-accent font-semibold"
                : "border-transparent text-muted-foreground"
            }`}
          >
            <Award className="w-5 h-5" />
            <span>Certificates</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <main className="p-4 pb-20 space-y-4">
        {activeTab === "trainings" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground">My Trainings</h2>
              <Badge variant="outline" className="text-accent border-accent">
                {trainings.length} total
              </Badge>
            </div>

            {trainings.map((training, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-1">{training.title}</CardTitle>
                      <CardDescription className="flex items-center gap-1 text-sm">
                        <MapPin className="w-3 h-3" />
                        {training.location}
                      </CardDescription>
                    </div>
                    <Badge 
                      variant={training.status === "completed" ? "default" : "secondary"}
                      className={training.status === "completed" ? "bg-success" : ""}
                    >
                      {training.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {training.date}
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Users className="w-4 h-4" />
                      {training.participants} participants
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "create" && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">Create New Training</h2>
            
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">
                    Training Title
                  </label>
                  <Input placeholder="e.g., Flood Response Training" />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">
                    Training Type
                  </label>
                  <Input placeholder="e.g., Field Exercise" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">
                      Start Date
                    </label>
                    <Input type="date" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">
                      End Date
                    </label>
                    <Input type="date" />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">
                    Location
                  </label>
                  <Button variant="outline" className="w-full justify-start">
                    <MapPin className="w-4 h-4 mr-2" />
                    Use Current Location
                  </Button>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">
                    Number of Participants
                  </label>
                  <Input type="number" placeholder="e.g., 50" />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">
                    Upload Photos
                  </label>
                  <Button variant="outline" className="w-full justify-start">
                    <Camera className="w-4 h-4 mr-2" />
                    Take Photo / Upload
                  </Button>
                </div>

                <div className="pt-4 space-y-2">
                  <Button variant="hero" className="w-full">
                    <Upload className="w-4 h-4 mr-2" />
                    Create Training
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                    {isOnline ? "Will upload immediately" : "Will sync when online"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "certificates" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground">Certificates</h2>
              <Badge variant="outline" className="text-success border-success">
                {certificates.length} issued
              </Badge>
            </div>

            {certificates.map((cert, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                      <Award className="w-8 h-8 text-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground mb-1 truncate">
                        {cert.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">Issued: {cert.issued}</p>
                      <p className="text-xs text-muted-foreground font-mono mt-1">{cert.id}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm">
                      <QrCode className="w-4 h-4 mr-1" />
                      QR Code
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4">
        <Link to="/">
          <Button variant="outline" className="w-full">
            Back to Landing Page
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default MobileApp;
