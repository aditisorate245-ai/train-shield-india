
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const trainings = [
  { id: 1, title: 'Advanced First Aid', type: 'First Aid', startDate: '2023-11-15', endDate: '2023-11-17', status: 'In Progress' },
  { id: 2, title: 'Fire Safety', type: 'Fire Safety', startDate: '2023-10-18', endDate: '2023-10-20', status: 'Completed' },
  { id: 3, title: 'Emergency Response', type: 'Emergency Response', startDate: '2023-12-01', endDate: '2023-12-03', status: 'Not Started' },
];

const MyTrainingsTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Trainings</CardTitle>
        <CardDescription>A list of your enrolled trainings.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {trainings.map((training) => (
              <TableRow key={training.id}>
                <TableCell>{training.title}</TableCell>
                <TableCell>{training.type}</TableCell>
                <TableCell>{training.startDate}</TableCell>
                <TableCell>{training.endDate}</TableCell>
                <TableCell>{training.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default MyTrainingsTab;
