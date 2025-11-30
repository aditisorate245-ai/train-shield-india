import { useState, ChangeEvent } from 'react';
import { Home, Plus, FileText } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Training {
  id: string;
  title: string;
  type: string;
  startDate: string;
  endDate: string;
  location: string;
}

const PartnerMobileDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [newTraining, setNewTraining] = useState({
    title: '',
    type: '',
    startDate: '',
    endDate: '',
    location: ''
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTraining(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCreateTraining = () => {
    if (!newTraining.title || !newTraining.type || !newTraining.startDate || !newTraining.endDate || !newTraining.location) {
      alert("Please fill all fields.");
      return;
    }
    const trainingToAdd: Training = { ...newTraining, id: `TRN-${Date.now()}` };
    setTrainings(prevTrainings => [...prevTrainings, trainingToAdd]);
    setNewTraining({ title: '', type: '', startDate: '', endDate: '', location: '' });
    setActiveTab('dashboard');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">My Trainings</h2>
            {trainings.length > 0 ? (
              <div className="space-y-4">
                {trainings.map(training => (
                  <Card key={training.id}>
                    <CardHeader>
                      <CardTitle>{training.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p><strong>Type:</strong> {training.type}</p>
                      <p><strong>Date:</strong> {training.startDate} to {training.endDate}</p>
                      <p><strong>Location:</strong> {training.location}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500 mt-2">No trainings created yet.</p>
                <Button onClick={() => setActiveTab('create')} className="mt-4">
                  Create your first training
                </Button>
              </div>
            )}
          </div>
        );
      case 'create':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">Create New Training</h2>
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">
                    Training Title
                  </label>
                  <Input name="title" value={newTraining.title} onChange={handleInputChange} placeholder="e.g., Flood Response Training" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">
                    Training Type
                  </label>
                  <Input name="type" value={newTraining.type} onChange={handleInputChange} placeholder="e.g., Simulation" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">
                    Start Date
                  </label>
                  <Input name="startDate" type="date" value={newTraining.startDate} onChange={handleInputChange} />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">
                    End Date
                  </label>
                  <Input name="endDate" type="date" value={newTraining.endDate} onChange={handleInputChange} />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">
                    Location
                  </label>
                  <Input name="location" value={newTraining.location} onChange={handleInputChange} placeholder="e.g., Virtual or City Name" />
                </div>
                <Button onClick={handleCreateTraining} className="w-full">Create Training</Button>
              </CardContent>
            </Card>
          </div>
        );
      case 'reports':
        return (
            <div>
                <h2 className="text-xl font-bold text-foreground">Reports</h2>
                <p className="text-gray-500 mt-2">Reporting and analytics will be available here.</p>
            </div>
        );
      default:
        return <div>Dashboard Content</div>;
    }
  };

  return (
    <div className="p-4 md:hidden pb-20">
      {renderContent()}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-2 flex justify-around">
        <Button variant={activeTab === 'dashboard' ? 'secondary' : 'ghost'} onClick={() => setActiveTab('dashboard')} className="flex-1 flex-col h-16">
          <Home className="w-6 h-6 mb-1" />
          Dashboard
        </Button>
        <Button variant={activeTab === 'create' ? 'secondary' : 'ghost'} onClick={() => setActiveTab('create')} className="flex-1 flex-col h-16">
          <Plus className="w-6 h-6 mb-1" />
          Create
        </Button>
        <Button variant={activeTab === 'reports' ? 'secondary' : 'ghost'} onClick={() => setActiveTab('reports')} className="flex-1 flex-col h-16">
          <FileText className="w-6 h-6 mb-1" />
          Reports
        </Button>
      </div>
    </div>
  );
};

export default PartnerMobileDashboard;