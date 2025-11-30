import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const NotAuthorized = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle className="text-center">Not Authorized</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center mb-4">You do not have permission to access this page.</p>
          <Link to="/">
            <Button className="w-full">Go to Homepage</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotAuthorized;
