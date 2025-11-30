
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import CreateTrainingForm from './CreateTrainingForm'; // Import the form component

const trainings = [
    {
        id: 'TRN001',
        title: 'Advanced CPR',
        date: '2024-08-15',
        participants: 20,
        status: 'Scheduled',
    },
    {
        id: 'TRN002',
        title: 'Wilderness First Aid',
        date: '2024-09-01',
        participants: 15,
        status: 'Scheduled',
    },
];

const TrainingsTab = () => {
    const [isCreating, setIsCreating] = useState(false);

    // Dummy function for form submission
    const handleCreateTraining = (data) => {
        console.log('New Training Data:', data);
        setIsCreating(false); // Go back to the list after creation
    };

    if (isCreating) {
        return (
            <CreateTrainingForm 
                onSubmit={handleCreateTraining} 
                onBack={() => setIsCreating(false)} 
            />
        );
    }

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Trainings</CardTitle>
                    <CardDescription>Manage your upcoming and past training sessions.</CardDescription>
                </div>
                <Button onClick={() => setIsCreating(true)}>Create New Training</Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Participants</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {trainings.map((training) => (
                            <TableRow key={training.id}>
                                <TableCell>{training.id}</TableCell>
                                <TableCell>{training.title}</TableCell>
                                <TableCell>{training.date}</TableCell>
                                <TableCell>{training.participants}</TableCell>
                                <TableCell>
                                    <Badge>{training.status}</Badge>
                                </TableCell>
                                <TableCell>
                                    <Button variant="outline" size="sm">View</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default TrainingsTab;
