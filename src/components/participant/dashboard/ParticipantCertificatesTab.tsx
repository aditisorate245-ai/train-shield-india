
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from '@/components/ui/button';

const certificates = [
  { id: 1, title: 'Fire Safety Certificate', issueDate: '2023-10-20', expiryDate: '2025-10-20' },
  { id: 2, title: 'Basic First Aid', issueDate: '2023-09-15', expiryDate: '2025-09-15' },
];

const ParticipantCertificatesTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Certificates</CardTitle>
        <CardDescription>Your earned certificates.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Certificate Title</TableHead>
              <TableHead>Issue Date</TableHead>
              <TableHead>Expiry Date</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {certificates.map((cert) => (
              <TableRow key={cert.id}>
                <TableCell>{cert.title}</TableCell>
                <TableCell>{cert.issueDate}</TableCell>
                <TableCell>{cert.expiryDate}</TableCell>
                <TableCell>
                  <Button size="sm" variant="outline">View Certificate</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ParticipantCertificatesTab;
