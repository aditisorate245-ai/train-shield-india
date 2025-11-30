import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Building2, 
  Phone, 
  Mail, 
  MapPin,
  Users,
  TrendingUp,
  Award,
  Plus,
  ExternalLink
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const initialPartners = [
  {
    id: "PTR-001",
    name: "Administrative Training Institute (ATI) Gujarat",
    type: "State Training Institute",
    location: "Ahmedabad, Gujarat",
    contact: "Dr. Rajesh Kumar",
    phone: "+91-79-23256789",
    email: "ati.gujarat@gov.in",
    trainings: 24,
    trainees: 1250,
    performance: 95,
    status: "active"
  },
  {
    id: "PTR-002",
    name: "State Disaster Management Authority Kerala",
    type: "SDMA",
    location: "Thiruvananthapuram, Kerala",
    contact: "Priya Menon",
    phone: "+91-471-2339876",
    email: "sdma.kerala@gov.in",
    trainings: 18,
    trainees: 890,
    performance: 92,
    status: "active"
  },
  {
    id: "PTR-003",
    name: "Maharashtra Emergency Services",
    type: "Emergency Response",
    location: "Mumbai, Maharashtra",
    contact: "Anil Singh",
    phone: "+91-22-24567890",
    email: "mes.mh@gov.in",
    trainings: 31,
    trainees: 1580,
    performance: 88,
    status: "active"
  },
];

export const PartnersTab = () => {
  const [partners, setPartners] = useState(() => {
    const savedPartners = localStorage.getItem('partners');
    return savedPartners ? JSON.parse(savedPartners) : initialPartners;
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateDialogOpen, setCreateDialogOpen] = useState(false);
  const [isViewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<any>(null);
  const [newPartner, setNewPartner] = useState({ name: '', type: '', location: '', contact: '', phone: '', email: '' });

  useEffect(() => {
    localStorage.setItem('partners', JSON.stringify(partners));
  }, [partners]);

  const handleSavePartner = () => {
    const newId = `PTR-${String(partners.length + 1).padStart(3, '0')}`;
    const partnerToAdd = { ...newPartner, id: newId, trainings: 0, trainees: 0, performance: 0, status: "active" };
    setPartners([...partners, partnerToAdd]);
    setCreateDialogOpen(false);
    setNewPartner({ name: '', type: '', location: '', contact: '', phone: '', email: '' });
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return "text-success";
    if (score >= 80) return "text-accent";
    return "text-primary";
  };

  const filteredPartners = partners.filter((partner: any) =>
    (partner.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (partner.location || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (partner.type || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Partner Institutions</h2>
          <p className="text-muted-foreground">Manage training partners and their performance</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="hero" className="gap-2">
              <Plus className="w-4 h-4" />
              Add New Partner
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Partner</DialogTitle>
              <DialogDescription>Fill in the details for the new partner institution.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input id="name" value={newPartner.name} onChange={(e) => setNewPartner({ ...newPartner, name: e.target.value })} placeholder="e.g., State Disaster Management Authority" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">Type</Label>
                <Input id="type" value={newPartner.type} onChange={(e) => setNewPartner({ ...newPartner, type: e.target.value })} placeholder="e.g., SDMA" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right">Location</Label>
                <Input id="location" value={newPartner.location} onChange={(e) => setNewPartner({ ...newPartner, location: e.target.value })} placeholder="e.g., Thiruvananthapuram, Kerala" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="contact" className="text-right">Contact Person</Label>
                <Input id="contact" value={newPartner.contact} onChange={(e) => setNewPartner({ ...newPartner, contact: e.target.value })} placeholder="e.g., Priya Menon" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">Phone</Label>
                <Input id="phone" value={newPartner.phone} onChange={(e) => setNewPartner({ ...newPartner, phone: e.target.value })} placeholder="e.g., +91-471-2339876" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">Email</Label>
                <Input id="email" value={newPartner.email} onChange={(e) => setNewPartner({ ...newPartner, email: e.target.value })} placeholder="e.g., sdma.kerala@gov.in" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setCreateDialogOpen(false)}>Cancel</Button>
              <Button type="submit" onClick={handleSavePartner}>Save Partner</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Partners</p>
                <p className="text-2xl font-bold text-foreground">{partners.length}</p>
              </div>
              <Building2 className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Trainings</p>
                <p className="text-2xl font-bold text-accent">
                  {partners.reduce((sum, p) => sum + p.trainings, 0)}
                </p>
              </div>
              <Award className="w-8 h-8 text-accent" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Trainees</p>
                <p className="text-2xl font-bold text-success">
                  {partners.reduce((sum, p) => sum + p.trainees, 0).toLocaleString()}
                </p>
              </div>
              <Users className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Performance</p>
                <p className="text-2xl font-bold text-primary">
                  {partners.length > 0 ? Math.round(partners.reduce((sum, p) => sum + p.performance, 0) / partners.length) : 0}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search partners by name, location, or type..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Partners List */}
      <div className="grid gap-4">
        {filteredPartners.map((partner) => (
          <Card key={partner.id} className="hover:shadow-lg transition-all">
            <CardHeader>
              <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Building2 className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-1">{partner.name}</CardTitle>
                      <CardDescription className="flex flex-wrap items-center gap-2">
                        <Badge variant="outline">{partner.type}</Badge>
                        <span className="text-muted-foreground text-xs font-mono">{partner.id}</span>
                      </CardDescription>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="gap-2" onClick={() => { setSelectedPartner(partner); setViewDialogOpen(true); }}>
                  View Details
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {/* Contact Info */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-muted-foreground">Contact Information</h4>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                      <span>{partner.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-muted-foreground shrink-0" />
                      <span>{partner.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-muted-foreground shrink-0" />
                      <span className="truncate">{partner.email}</span>
                    </div>
                  </div>
                </div>

                {/* Metrics */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-muted-foreground">Training Metrics</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Trainings Conducted</span>
                      <span className="font-semibold">{partner.trainings}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Total Trainees</span>
                      <span className="font-semibold">{partner.trainees.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Avg per Training</span>
                      <span className="font-semibold">{partner.trainings > 0 ? Math.round(partner.trainees / partner.trainings) : 0}</span>
                    </div>
                  </div>
                </div>

                {/* Performance */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-muted-foreground">Performance Score</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`text-3xl font-bold ${getPerformanceColor(partner.performance)}`}>
                        {partner.performance}
                      </span>
                      <TrendingUp className={`w-6 h-6 ${getPerformanceColor(partner.performance)}`} />
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
                        style={{ width: `${partner.performance}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">Based on completion rate, feedback, and compliance</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                  {partner.status}
                </Badge>
                <Badge variant="outline">Primary Contact: {partner.contact}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedPartner?.name}</DialogTitle>
            <DialogDescription>ID: {selectedPartner?.id}</DialogDescription>
          </DialogHeader>
          {selectedPartner && (
            <div className="space-y-4 py-4 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-muted-foreground mb-1">Type</p>
                  <p className="font-medium">{selectedPartner.type}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Location</p>
                  <p className="font-medium">{selectedPartner.location}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Contact Person</p>
                  <p className="font-medium">{selectedPartner.contact}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Phone</p>
                  <p className="font-medium">{selectedPartner.phone}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Email</p>
                  <p className="font-medium">{selectedPartner.email}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Status</p>
                  <p className="font-medium capitalize">{selectedPartner.status}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Trainings Conducted</p>
                  <p className="font-medium">{selectedPartner.trainings}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Total Trainees</p>
                  <p className="font-medium">{selectedPartner.trainees}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Performance Score</p>
                  <p className={`font-bold ${getPerformanceColor(selectedPartner.performance)}`}>{selectedPartner.performance}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button type="button" onClick={() => setViewDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
