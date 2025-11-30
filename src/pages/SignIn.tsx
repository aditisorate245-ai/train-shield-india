import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import users from "@/data/users.json";

const SignIn = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        const user = users.find(
          (u) => u.email === email && u.password === password
        );
        if (user) {
          localStorage.setItem("userRole", user.role);
          toast({
            title: "Login Successful",
            description: `Welcome back!`,
          });
          if (user.role === 'ndma') {
            navigate("/dashboard");
          } else if (user.role === 'partner') {
            navigate("/partner-view");
          }
        } else {
          toast({
            title: "Login Failed",
            description: "Invalid email or password.",
            variant: "destructive",
          });
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <Card className="w-[450px]">
            <CardHeader>
              <CardTitle className="text-center">Sign In</CardTitle>
              <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="Enter your email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="Enter your password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <Button type="submit" className="w-full">Sign In</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      );
};

export default SignIn;
