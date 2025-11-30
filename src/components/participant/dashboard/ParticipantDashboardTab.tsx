
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';

const data = [
  { name: 'Completed', value: 3 },
  { name: 'In Progress', value: 1 },
  { name: 'Not Started', value: 2 },
];

const ParticipantDashboardTab = () => {
  return (
    <div>
        <h2 className="text-2xl font-bold mb-4">Welcome, Participant!</h2>
        <p className="text-muted-foreground mb-8">Here is a summary of your training progress.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Trainings Overview</CardTitle>
                    <CardDescription>Your progress across all trainings.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                            <BarChart data={data}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="value" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Next Training</CardTitle>
                <CardDescription>Your upcoming training session.</CardDescription>
              </CardHeader>
              <CardContent>
                <h3 className="font-bold text-lg">Advanced First Aid</h3>
                <p className="text-muted-foreground">Date: 2023-11-15</p>
                <p className="text-muted-foreground">Location: Online</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Achievement</CardTitle>
                <CardDescription>Your latest unlocked certificate.</CardDescription>
              </CardHeader>
              <CardContent>
                 <h3 className="font-bold text-lg">Fire Safety Certificate</h3>
                 <p className="text-muted-foreground">Issued on: 2023-10-20</p>
              </CardContent>
            </Card>
        </div>
    </div>
  );
};

export default ParticipantDashboardTab;
