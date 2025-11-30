  
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CreateAssessmentForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [training, setTraining] = useState('');
  const [passingScore, setPassingScore] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, training, passingScore: Number(passingScore) });
    setTitle('');
    setTraining('');
    setPassingScore('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create a New Assessment</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Assessment Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Input
            placeholder="Associated Training"
            value={training}
            onChange={(e) => setTraining(e.target.value)}
            required
          />
          <Input
            type="number"
            placeholder="Passing Score (%)"
            value={passingScore}
            onChange={(e) => setPassingScore(e.target.value)}
            required
          />
          <Button type="submit">Create Assessment</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateAssessmentForm;
