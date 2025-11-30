import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Plus, 
  MapPin, 
  Users, 
  Eye,
  Edit,
  Download
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

const initialTrainings = [
  {
    id: "TRN-001",
    title: "Flood Response Training",
    type: "Field Exercise",
    location: "Gujarat",
    startDate: "2024-12-15",
    endDate: "2024-12-17",
    participants: 45,
    status: "upcoming",
    trainer: "Dr. Rajesh Kumar",
    completion: 0
  },
  {
    id: "TRN-002",
    title: "Earthquake Preparedness Workshop",
    type: "Classroom",
    location: "Kerala",
    startDate: "2024-12-10",
    endDate: "2024-12-12",
    participants: 38,
    status: "completed",
    trainer: "Priya Menon",
    completion: 100
  },
  {
    id: "TRN-003",
    title: "Fire Safety & First Aid",
    type: "Hybrid",
    location: "Maharashtra",
    startDate: "2024-12-20",
    endDate: "2024-12-22",
    participants: 52,
    status: "in-progress",
    trainer: "Anil Singh",
    completion: 65
  },
];

export const TrainingsTab = () => {
  const [trainings, setTrainings] = useState(() => {
    const savedTrainings = localStorage.getItem('trainings');
    return savedTrainings ? JSON.parse(savedTrainings) : initialTrainings;
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [isCreateDialogOpen, setCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedTraining, setSelectedTraining] = useState<any>(null);
  const [newTraining, setNewTraining] = useState({ title: '', type: '', location: '', startDate: '', endDate: '', participants: '', trainer: '' });

  useEffect(() => {
    localStorage.setItem('trainings', JSON.stringify(trainings));
  }, [trainings]);

  const handleSaveTraining = () => {
    const newId = `TRN-${String(trainings.length + 1).padStart(3, '0')}`;
    const trainingToAdd = { ...newTraining, id: newId, status: 'upcoming', completion: 0, participants: Number(newTraining.participants) || 0 };
    setTrainings([...trainings, trainingToAdd]);
    setCreateDialogOpen(false);
    setNewTraining({ title: '', type: '', location: '', startDate: '', endDate: '', participants: '', trainer: '' });
  };

  const handleUpdateTraining = () => {
    if (!selectedTraining) return;
    const updatedTrainings = trainings.map((t: any) => t.id === selectedTraining.id ? selectedTraining : t);
    setTrainings(updatedTrainings);
    setEditDialogOpen(false);
    setSelectedTraining(null);
  };

  const handleExport = (training: any) => {
    const dataStr = JSON.stringify(training, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = `${training.id}.json`;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: { variant: "default", className: "bg-success" },
      "in-progress": { variant: "secondary", className: "bg-accent text-accent-foreground" },
      upcoming: { variant: "outline", className: "" },
    } as const;
    return variants[status as keyof typeof variants] || variants.upcoming;
  };

  const filteredTrainings = trainings.filter((training: any) => {
    const matchesSearch = (training.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (training.location || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || training.status === statusFilter;
    const matchesType = typeFilter === "all" || training.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Training Programs</h2>
          <p className="text-muted-foreground">Manage and monitor all training sessions</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="hero" className="gap-2">
              <Plus className="w-4 h-4" />
              Create New Training
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Training</DialogTitle>
              <DialogDescription>Fill in the details for the new training program.</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="col-span-2 space-y-2">
                <Label htmlFor="title">Training Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Advanced First Aid"
                  value={newTraining.title}
                  onChange={(e) => setNewTraining({ ...newTraining, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Training Type</Label>
                <Select
                  value={newTraining.type}
                  onValueChange={(value) => setNewTraining({ ...newTraining, type: value })}
                >
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Field Exercise">Field Exercise</SelectItem>
                    <SelectItem value="Classroom">Classroom</SelectItem>
                    <SelectItem value="Online">Online</SelectItem>
                    <SelectItem value="Hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="e.g., New Delhi"
                  value={newTraining.location}
                  onChange={(e) => setNewTraining({ ...newTraining, location: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={newTraining.startDate}
                  onChange={(e) => setNewTraining({ ...newTraining, startDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={newTraining.endDate}
                  onChange={(e) => setNewTraining({ ...newTraining, endDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="participants">No. of Participants</Label>
                <Input
                  id="participants"
                  type="number"
                  placeholder="e.g., 50"
                  value={newTraining.participants}
                  onChange={(e) => setNewTraining({ ...newTraining, participants: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="trainer">Trainer</Label>
                <Input
                  id="trainer"
                  placeholder="e.g., Dr. Jane Doe"
                  value={newTraining.trainer}
                  onChange={(e) => setNewTraining({ ...newTraining, trainer: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setCreateDialogOpen(false)}>Cancel</Button>
              <Button type="submit" onClick={handleSaveTraining}>Save Training</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      {/* ... */}

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search trainings..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Field Exercise">Field Exercise</SelectItem>
                <SelectItem value="Classroom">Classroom</SelectItem>
                <SelectItem value="Online">Online</SelectItem>
                <SelectItem value="Hybrid">Hybrid</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Trainings List */}
      <div className="space-y-4">
        {filteredTrainings.map((training) => (
          <Card key={training.id} className="hover:shadow-lg transition-all">
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-2">
                    <CardTitle className="text-xl">{training.title}</CardTitle>
                    <Badge {...getStatusBadge(training.status)}>
                      {training.status.replace("-", " ")}
                    </Badge>
                  </div>
                  <CardDescription className="space-y-1">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4" />
                      <span>{training.location}</span>
                      <span className="text-muted-foreground">•</span>
                      <span className="font-mono text-xs">{training.id}</span>
                    </div>
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => { setSelectedTraining(training); setViewDialogOpen(true); }}>
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => { setSelectedTraining(training); setEditDialogOpen(true); }}>
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleExport(training)}>
                    <Download className="w-4 h-4 mr-1" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Type</p>
                  <p className="text-sm font-medium">{training.type}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Duration</p>
                  <p className="text-sm font-medium">
                    {training.startDate} to {training.endDate}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Participants</p>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <p className="text-sm font-medium">{training.participants}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Trainer</p>
                  <p className="text-sm font-medium">{training.trainer}</p>
                </div>
              </div>
              {training.status === "in-progress" && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{training.completion}%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-accent transition-all duration-300"
                      style={{ width: `${training.completion}%` }}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Dialog */}
      {/* ... */}

      {/* View Dialog */}
      {/* ... */}
    </div>
  );
};
