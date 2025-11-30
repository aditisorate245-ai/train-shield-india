
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import GenerateCertificateForm from './GenerateCertificateForm'; // This component will be created next

const initialCertificates = [
  { id: 1, traineeName: 'Alice Johnson', trainingTitle: 'Safety Protocols', issueDate: '2023-10-26' },
  { id: 2, traineeName: 'Bob Williams', trainingTitle: 'Heavy Machinery Operation', issueDate: '2023-10-25' },
];

const CertificatesTab = () => {
  const [certificates, setCertificates] = useState(initialCertificates);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleCertificateGenerate = (newCertificate) => {
    setCertificates([...certificates, { ...newCertificate, id: certificates.length + 1 }]);
    setIsGenerating(false);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Certificates</CardTitle>
            <CardDescription>Generate and manage training certificates.</CardDescription>
          </div>
          <Button onClick={() => setIsGenerating(!isGenerating)}>
            {isGenerating ? 'Cancel' : 'Generate Certificate'}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isGenerating ? (
          <GenerateCertificateForm onSubmit={handleCertificateGenerate} />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Trainee Name</TableHead>
                <TableHead>Training Title</TableHead>
                <TableHead>Issue Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {certificates.map((cert) => (
                <TableRow key={cert.id}>
                  <TableCell>{cert.traineeName}</TableCell>
                  <TableCell>{cert.trainingTitle}</TableCell>
                  <TableCell>{cert.issueDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default CertificatesTab;
