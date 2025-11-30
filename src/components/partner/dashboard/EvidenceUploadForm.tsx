
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const EvidenceUploadForm = () => {
  return (
    <Card className="max-w-2xl mx-auto my-8">
      <CardHeader>
        <CardTitle>Upload Evidence</CardTitle>
        <CardDescription>Select a training and upload the corresponding evidence file.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="training-select">Select Training</Label>
          <Select>
            <SelectTrigger id="training-select">
              <SelectValue placeholder="Select a training session" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="TRN001">Basic First Aid - 2024-03-15</SelectItem>
              <SelectItem value="TRN002">Fire Safety Drill - 2024-04-22</SelectItem>
              <SelectItem value="TRN003">Emergency Response Coordination - 2024-05-10</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="evidence-file">Evidence File</Label>
          <Input id="evidence-file" type="file" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" placeholder="Briefly describe the evidence..." />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Submit Evidence</Button>
      </CardFooter>
    </Card>
  );
};

export default EvidenceUploadForm;
