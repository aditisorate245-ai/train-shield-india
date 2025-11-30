import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Activity,
  Users,
  TrendingUp,
  BarChart3,
  Clock,
  Shield
} from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const stateData = [
  { state: "Gujarat", trainings: 24, trainees: 1250, completion: 95, lat: 22.2587, lng: 71.1924 },
  { state: "Kerala", trainings: 18, trainees: 890, completion: 92, lat: 10.8505, lng: 76.2711 },
  { state: "Maharashtra", trainings: 31, trainees: 1580, completion: 88, lat: 19.7515, lng: 75.7139 },
  { state: "Odisha", trainings: 15, trainees: 680, completion: 90, lat: 20.9517, lng: 85.0985 },
  { state: "Uttarakhand", trainings: 12, trainees: 520, completion: 85, lat: 30.0668, lng: 79.0193 },
  { state: "Tamil Nadu", trainings: 22, trainees: 1100, completion: 91, lat: 11.1271, lng: 78.6569 },
  { state: "West Bengal", trainings: 19, trainees: 950, completion: 89, lat: 22.9868, lng: 87.8550 },
];

const monthlyTrend = [
  { month: "Jul", trainings: 18 },
  { month: "Aug", trainings: 22 },
  { month: "Sep", trainings: 25 },
  { month: "Oct", trainings: 28 },
  { month: "Nov", trainings: 32 },
  { month: "Dec", trainings: 35 },
];

const budgetUtilization = [
    { name: 'Utilized', value: 375000 },
    { name: 'Remaining', value: 125000 }
];
const COLORS = ['#00C49F', '#FF8042'];

interface KPICardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  trend: "up" | "down";
}

const KPICard = ({ title, value, change, icon, trend }: KPICardProps) => {
  return (
    <Card className="hover:shadow-lg transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="text-accent">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-foreground">{value}</div>
        <div className={`flex items-center gap-1 text-sm mt-2 ${trend === "up" ? "text-success" : "text-destructive"}`}>
          <TrendingUp className={`w-4 h-4 ${trend === "down" ? "rotate-180" : ""}`} />
          <span>{change}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export const DashboardTab = () => {
  const recentActivities = [
    { title: "New training session uploaded", location: "Gujarat", time: "2 hours ago" },
    { title: "Assessment completed", location: "Kerala", time: "4 hours ago" },
    { title: "Certificate issued", location: "Maharashtra", time: "6 hours ago" },
    { title: "Training approved", location: "Tamil Nadu", time: "8 hours ago" },
  ];

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <KPICard
          title="Active Trainings"
          value="142"
          change="+12% from last month"
          icon={<Activity className="w-5 h-5" />}
          trend="up"
        />
        <KPICard
          title="Total Trainees"
          value="35,847"
          change="+18% from last month"
          icon={<Users className="w-5 h-5" />}
          trend="up"
        />
        <KPICard
          title="Completion Rate"
          value="94.2%"
          change="+3.2% from last month"
          icon={<TrendingUp className="w-5 h-5" />}
          trend="up"
        />
        <KPICard
          title="Partner Performance"
          value="87.5"
          change="+5.1% from last month"
          icon={<BarChart3 className="w-5 h-5" />}
          trend="up"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Map Visualization */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Training Coverage Map</CardTitle>
            <CardDescription>Interactive visualization of training density across India</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video rounded-lg border">
              <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {stateData.map(state => (
                  <Marker key={state.state} position={[state.lat, state.lng]}>
                    <Popup>
                      <b>{state.state}</b><br />
                      Trainings: {state.trainings}<br />
                      Trainees: {state.trainees}<br />
                      Completion: {state.completion}%
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest updates from across the platform</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex gap-3 pb-4 border-b last:border-0 last:pb-0">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-foreground truncate">{activity.title}</p>
                  <p className="text-xs text-muted-foreground">{activity.location}</p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Performance Analytics */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Performance Analytics</CardTitle>
            <CardDescription>State-wise training metrics and trends</CardDescription>
          </CardHeader>
          <CardContent className="grid sm:grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="text-md font-semibold text-center mb-2">State Coverage</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={stateData} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis type="category" dataKey="state" hide />
                  <Tooltip />
                  <Bar dataKey="trainings" fill="#8884d8" name="Trainings" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div>
                <h3 className="text-md font-semibold text-center mb-2">Monthly Trend</h3>
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={monthlyTrend}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="trainings" fill="#82ca9d" name="Trainings" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div>
                <h3 className="text-md font-semibold text-center mb-2">Budget Utilization</h3>
                <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                        <Pie data={budgetUtilization} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} fill="#8884d8" label>
                            {budgetUtilization.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* AI Insight */}
        <Card className="lg:col-span-3 border-accent/50 bg-accent/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-accent" />
              AI-Powered Insight
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground">
              <strong>This month:</strong> Training completion rose by 18% in flood-prone states. 
              Bihar and Assam show increased engagement. Consider scheduling 2 additional sessions 
              in low-coverage districts to meet Q4 targets.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
