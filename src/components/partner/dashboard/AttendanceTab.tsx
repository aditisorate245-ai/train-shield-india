
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import EvidenceUploadForm from "./EvidenceUploadForm";

const trainings = [
  {
    id: "TRN-001",
    title: "Basic First Aid",
    date: "2024-03-15",
    status: "Completed",
  },
  {
    id: "TRN-002",
    title: "Fire Safety Drill",
    date: "2024-04-22",
    status: "Completed",
  },
];

const AttendanceTab = () => {
  const [selectedTraining, setSelectedTraining] = useState(null);

  if (selectedTraining) {
    return <EvidenceUploadForm training={selectedTraining} onBack={() => setSelectedTraining(null)} />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendance & Evidence</CardTitle>
        <CardDescription>Select a training to upload attendance and evidence of completion.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Training ID</TableHead>
              <TableHead>Training Title</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {trainings.map((training) => (
              <TableRow key={training.id}>
                <TableCell className="font-mono">{training.id}</TableCell>
                <TableCell className="font-medium">{training.title}</TableCell>
                <TableCell>{training.date}</TableCell>
                <TableCell><Badge variant="default">{training.status}</Badge></TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" onClick={() => setSelectedTraining(training)}>
                    Upload Evidence
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AttendanceTab;
