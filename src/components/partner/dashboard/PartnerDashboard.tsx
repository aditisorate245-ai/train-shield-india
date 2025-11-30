
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Briefcase, Users, Award } from "lucide-react";

// Mock data for demonstration, you'll replace this with real data
const trainings = [
  { id: 1, title: "Safety Procedures", type: "On-site", startDate: "2024-08-15", endDate: "2024-08-17", location: "Mumbai" },
  { id: 2, title: "First-Aid Training", type: "Online", startDate: "2024-09-01", endDate: "2024-09-02", location: "Remote" },
  { id: 3, title: "Fire Safety Drill", type: "On-site", startDate: "2024-09-10", endDate: "2024-09-10", location: "Delhi" },
];

const PartnerDashboard = () => {

  const kpis = [
    { title: "Total Trainings", value: "12", icon: <Briefcase className="w-6 h-6 text-muted-foreground" />, change: "+5 from last month" },
    { title: "Active Participants", value: "256", icon: <Users className="w-6 h-6 text-muted-foreground" />, change: "+12%" },
    { title: "Certificates Issued", value: "189", icon: <Award className="w-6 h-6 text-muted-foreground" />, change: "+2 from last week" },
  ];

  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {kpis.map((kpi, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              {kpi.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <p className="text-xs text-muted-foreground">{kpi.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Trainings Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Trainings</CardTitle>
        </CardHeader>
        <CardContent>
          {trainings.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Location</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trainings.map((training) => (
                  <TableRow key={training.id}>
                    <TableCell>{training.title}</TableCell>
                    <TableCell>{training.type}</TableCell>
                    <TableCell>{training.startDate}</TableCell>
                    <TableCell>{training.endDate}</TableCell>
                    <TableCell>{training.location}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center text-muted-foreground py-8">
              No recent trainings to display.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PartnerDashboard;
