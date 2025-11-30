import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Download, 
  Calendar, 
  Filter,
  Share2,
  FileSpreadsheet,
  File
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const initialReports = [
  {
    id: "RPT-001",
    title: "Q4 2024 Training Summary",
    type: "Training Summary",
    date: "2024-12-01",
    size: "2.4 MB",
    format: "PDF",
    downloads: 45
  },
  {
    id: "RPT-002",
    title: "Participant Analytics Q3 2024",
    type: "Participant Analytics",
    date: "2024-10-05",
    size: "1.8 MB",
    format: "EXCEL",
    downloads: 32
  },
  {
    id: "RPT-003",
    title: "Geographic Coverage - 2024",
    type: "Geographic Coverage",
    date: "2024-11-15",
    size: "3.1 MB",
    format: "PDF",
    downloads: 18
  },
  {
    id: "RPT-004",
    title: "FY2024 Certificate Report",
    type: "Certificate Report",
    date: "2024-12-10",
    size: "5.5 MB",
    format: "CSV",
    downloads: 67
  },
];

// Helper function to generate mock data
const generateMockData = (reportType: string) => {
  const data = [];
  const rowCount = 20;

  switch (reportType) {
    case 'Training Summary':
      for (let i = 1; i <= rowCount; i++) {
        data.push([`TRG-0${i}`, `Training Program ${i}`, `Partner ${i % 5 + 1}`, new Date().toLocaleDateString(), `${Math.floor(Math.random() * 50) + 20}`]);
      }
      return {
        columns: ['Training ID', 'Program Name', 'Partner', 'Date', 'Participants'],
        data: data,
      };
    case 'Participant Analytics':
        for (let i = 1; i <= rowCount; i++) {
            data.push([`USR-0${i}`, `Participant ${i}`, `Department ${i % 3 + 1}`, `${Math.floor(Math.random() * 30) + 70}%`, 'Completed']);
        }
        return {
            columns: ['User ID', 'Name', 'Department', 'Score', 'Status'],
            data: data,
        };
    default:
        for (let i = 1; i <= rowCount; i++) {
            data.push([`Data ${i}-1`, `Data ${i}-2`, `Data ${i}-3`, `Data ${i}-4`]);
        }
      return {
        columns: ['Column 1', 'Column 2', 'Column 3', 'Column 4'],
        data: data,
      };
  }
};

export const ReportsTab = () => {
  const [reports, setReports] = useState(() => {
    const savedReportsJSON = localStorage.getItem('reports');
    const savedReports = savedReportsJSON ? JSON.parse(savedReportsJSON) : [];
    const savedReportIds = new Set(savedReports.map((r: any) => r.id));
    const combinedReports = [
      ...savedReports,
      ...initialReports.filter((initialReport) => !savedReportIds.has(initialReport.id))
    ];
    return combinedReports;
  });

  const [reportType, setReportType] = useState("training");
  const [timePeriod, setTimePeriod] = useState("q4");
  const [exportFormat, setExportFormat] = useState("pdf");

  useEffect(() => {
    localStorage.setItem('reports', JSON.stringify(reports));
  }, [reports]);

  const handleDownload = (reportToDownload: any) => {
    const updatedReports = reports.map((r: any) => 
      r.id === reportToDownload.id ? { ...r, downloads: (r.downloads || 0) + 1 } : r
    );
    setReports(updatedReports);

    const format = reportToDownload.format.toUpperCase();

    if (format === 'PDF') {
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text(`Report: ${reportToDownload.title}`, 14, 22);
      doc.setFontSize(11);
      doc.setTextColor(100);
      doc.text(`Report ID: ${reportToDownload.id}`, 14, 30);
      doc.text(`Date Generated: ${reportToDownload.date}`, 14, 36);

      const mockData = generateMockData(reportToDownload.type);

      autoTable(doc, {
        startY: 50,
        head: [mockData.columns],
        body: mockData.data,
      });

      doc.save(`${reportToDownload.id}.pdf`);
    } else {
      const mockData = generateMockData(reportToDownload.type);
      const dataStr = JSON.stringify({ report: reportToDownload, data: mockData }, null, 2);
      const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', `${reportToDownload.id}.${format.toLowerCase()}`);
      linkElement.click();
    }
  };

  const handleShare = (report: any) => {
    const shareData = {
      title: report.title,
      text: `Check out this report: ${report.title}`,
      url: window.location.href,
    };
    if (navigator.share) {
      navigator.share(shareData).catch(console.error);
    } else {
      navigator.clipboard.writeText(`${shareData.text} - ${shareData.url}`);
      alert('Report link copied to clipboard!');
    }
  };

  const handleGenerateReport = () => {
    const typeMap: { [key: string]: string } = {
      training: "Training Summary",
      participant: "Participant Analytics",
      geographic: "Geographic Coverage",
      certificate: "Certificate Report",
      compliance: "Compliance & Audit",
      budget: "Budget Utilization",
    };

    const newReport = {
      id: `RPT-${String(reports.length + 1).padStart(3, '0')}`,
      title: `${typeMap[reportType]} - ${timePeriod.toUpperCase()}`,
      type: typeMap[reportType],
      date: new Date().toISOString().split('T')[0],
      size: `${(Math.random() * 4 + 1).toFixed(1)} MB`,
      format: exportFormat.toUpperCase(),
      downloads: 0,
    };

    setReports([newReport, ...reports]);
    handleDownload(newReport);
  };

  const getFormatIcon = (format: string) => {
    switch (format) {
      case "PDF": return <File className="w-4 h-4 text-destructive" />;
      case "EXCEL": return <FileSpreadsheet className="w-4 h-4 text-success" />;
      case "CSV":
      case "JSON": return <FileText className="w-4 h-4 text-accent" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
       <div>
        <h2 className="text-2xl font-bold text-foreground">Reports & Analytics</h2>
        <p className="text-muted-foreground">Generate, download, and share comprehensive reports</p>
      </div>

      <Card className="border-accent/50">
        <CardHeader>
          <CardTitle>Generate New Report</CardTitle>
          <CardDescription>Select a template and customize your report parameters</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger><SelectValue placeholder="Select Report Type" /></SelectTrigger>
              <SelectContent>
                  <SelectItem value="training">Training Summary</SelectItem>
                  <SelectItem value="participant">Participant Analytics</SelectItem>
                  <SelectItem value="geographic">Geographic Coverage</SelectItem>
                  <SelectItem value="certificate">Certificate Report</SelectItem>
                  <SelectItem value="compliance">Compliance & Audit</SelectItem>
                  <SelectItem value="budget">Budget Utilization</SelectItem>
              </SelectContent>
            </Select>
            <Select value={timePeriod} onValueChange={setTimePeriod}>
              <SelectTrigger><SelectValue placeholder="Select Time Period" /></SelectTrigger>
              <SelectContent>
                  <SelectItem value="current">Current Month</SelectItem>
                  <SelectItem value="last">Last Month</SelectItem>
                  <SelectItem value="q4">Q4 2024</SelectItem>
                  <SelectItem value="q3">Q3 2024</SelectItem>
                  <SelectItem value="2024">Full Year 2024</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
            <Select value={exportFormat} onValueChange={setExportFormat}>
              <SelectTrigger><SelectValue placeholder="Select Export Format" /></SelectTrigger>
              <SelectContent>
                  <SelectItem value="pdf">PDF Document</SelectItem>
                  <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                  <SelectItem value="csv">CSV Data</SelectItem>
                  <SelectItem value="json">JSON Data</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button variant="hero" onClick={handleGenerateReport} className="w-full sm:w-auto">
            <Download className="w-4 h-4 mr-2" />
            Generate & Download Report
          </Button>
        </CardContent>
      </Card>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Recent Reports</h3>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
        <div className="space-y-3">
          {reports.map((report: any) => (
            <Card key={report.id} className="hover:shadow-md transition-all">
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      {getFormatIcon(report.format)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{report.title}</h4>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                        <Badge variant="outline">{report.type}</Badge>
                        <span>•</span>
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{report.date}</span>
                        <span>•</span>
                        <span>{report.size}</span>
                        <span>•</span>
                        <span>{report.downloads} downloads</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleDownload(report)}>
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleShare(report)}>
                      <Share2 className="w-4 h-4 mr-1" />
                      Share
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
