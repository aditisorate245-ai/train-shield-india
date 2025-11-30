
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const GenerateCertificateForm = ({ onSubmit }) => {
  const [traineeName, setTraineeName] = useState('');
  const [trainingTitle, setTrainingTitle] = useState('');
  const [issueDate, setIssueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ traineeName, trainingTitle, issueDate });
    setTraineeName('');
    setTrainingTitle('');
    setIssueDate('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generate a New Certificate</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Trainee Name"
            value={traineeName}
            onChange={(e) => setTraineeName(e.target.value)}
            required
          />
          <Input
            placeholder="Training Title"
            value={trainingTitle}
            onChange={(e) => setTrainingTitle(e.target.value)}
            required
          />
          <Input
            type="date"
            placeholder="Issue Date"
            value={issueDate}
            onChange={(e) => setIssueDate(e.target.value)}
            required
          />
          <Button type="submit">Generate Certificate</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default GenerateCertificateForm;
