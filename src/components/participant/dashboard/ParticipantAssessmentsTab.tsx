
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from '@/components/ui/button';

const assessments = [
  { id: 1, title: 'First Aid Knowledge Test', training: 'Advanced First Aid', score: '-', status: 'Pending' },
  { id: 2, title: 'Fire Safety Practical Exam', training: 'Fire Safety', score: '92%', status: 'Completed' },
  { id: 3, title: 'Emergency Response Simulation', training: 'Emergency Response', score: '-', status: 'Not Started' },
];

const ParticipantAssessmentsTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Assessments</CardTitle>
        <CardDescription>Your performance in various assessments.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Associated Training</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assessments.map((assessment) => (
              <TableRow key={assessment.id}>
                <TableCell>{assessment.title}</TableCell>
                <TableCell>{assessment.training}</TableCell>
                <TableCell>{assessment.score}</TableCell>
                <TableCell>{assessment.status}</TableCell>
                <TableCell>
                  {assessment.status === 'Pending' && <Button size="sm">Start Assessment</Button>}
                  {assessment.status === 'Completed' && <Button size="sm" variant="outline">View Results</Button>}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ParticipantAssessmentsTab;
