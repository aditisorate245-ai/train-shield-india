import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CreateTraining = () => {
  const [newTraining, setNewTraining] = useState({
    title: '',
    type: '',
    startDate: '',
    endDate: '',
    location: ''
  });

  const handleInputChange = (e) => {
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
    // Here you would typically handle the form submission, e.g., send data to a server
    console.log("Creating new training:", newTraining);
    alert("Training created successfully!");
    setNewTraining({ title: '', type: '', startDate: '', endDate: '', location: '' });
  };

  return (
    <div className="space-y-4 p-4 md:p-8">
      <h2 className="text-2xl font-bold text-foreground">Create New Training</h2>
      <Card>
        <CardHeader>
          <CardTitle>Training Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">
              Location
            </label>
            <Input name="location" value={newTraining.location} onChange={handleInputChange} placeholder="e.g., Virtual or City Name" />
          </div>
          <Button onClick={handleCreateTraining} className="w-full md:w-auto">Create Training</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateTraining;
