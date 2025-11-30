
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CreateTrainingForm = ({ onSubmit, onBack }) => {
    const [newTraining, setNewTraining] = useState({
        title: '',
        type: '',
        startDate: '',
        endDate: '',
        location: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewTraining(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name, value) => {
        setNewTraining(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newTraining.title || !newTraining.type || !newTraining.startDate || !newTraining.endDate || !newTraining.location) {
            alert("Please fill all fields.");
            return;
        }
        onSubmit(newTraining);
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Create New Training</CardTitle>
                        <CardDescription>Fill in the details below to schedule a new training session.</CardDescription>
                    </div>
                    <Button variant="ghost" onClick={onBack}>Back to List</Button>
                </div>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="title">Training Title</label>
                        <Input id="title" name="title" value={newTraining.title} onChange={handleChange} placeholder="e.g., Advanced First Aid" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                             <label htmlFor="type">Training Type</label>
                            <Select name="type" onValueChange={(value) => handleSelectChange('type', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="On-site">On-site</SelectItem>
                                    <SelectItem value="Online">Online</SelectItem>
                                    <SelectItem value="Hybrid">Hybrid</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="location">Location</label>
                            <Input id="location" name="location" value={newTraining.location} onChange={handleChange} placeholder="e.g., Mumbai" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="startDate">Start Date</label>
                            <Input id="startDate" name="startDate" type="date" value={newTraining.startDate} onChange={handleChange} />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="endDate">End Date</label>
                            <Input id="endDate" name="endDate" type="date" value={newTraining.endDate} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <Button type="submit">Create Training</Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

export default CreateTrainingForm;
