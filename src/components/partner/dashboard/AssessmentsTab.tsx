
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import CreateAssessmentForm from './CreateAssessmentForm'; // This component will be created next

const initialAssessments = [
  { id: 1, title: 'Safety Knowledge Test', training: 'Safety Protocols', passingScore: 80 },
  { id: 2, title: 'Practical Driving Exam', training: 'Heavy Machinery Operation', passingScore: 75 },
];

const AssessmentsTab = () => {
  const [assessments, setAssessments] = useState(initialAssessments);
  const [isCreating, setIsCreating] = useState(false);

  const handleAssessmentCreate = (newAssessment) => {
    setAssessments([...assessments, { ...newAssessment, id: assessments.length + 1 }]);
    setIsCreating(false);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Assessments</CardTitle>
            <CardDescription>Manage and review participant assessments.</CardDescription>
          </div>
          <Button onClick={() => setIsCreating(!isCreating)}>
            {isCreating ? 'Cancel' : 'Create Assessment'}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isCreating ? (
          <CreateAssessmentForm onSubmit={handleAssessmentCreate} />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Associated Training</TableHead>
                <TableHead>Passing Score (%)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assessments.map((assessment) => (
                <TableRow key={assessment.id}>
                  <TableCell>{assessment.title}</TableCell>
                  <TableCell>{assessment.training}</TableCell>
                  <TableCell>{assessment.passingScore}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default AssessmentsTab;
