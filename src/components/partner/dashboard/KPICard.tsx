import { Briefcase, CheckCircle, MapPin, FileText } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string;
  icon: 'training' | 'completed' | 'location' | 'reports';
}

const KPICard = ({ title, value, icon }: KPICardProps) => {
  const renderIcon = () => {
    switch (icon) {
      case 'training':
        return <Briefcase className="w-8 h-8 text-[#FFB100]" />;
      case 'completed':
        return <CheckCircle className="w-8 h-8 text-[#28A745]" />;
      case 'location':
        return <MapPin className="w-8 h-8 text-[#1A3E8D]" />;
      case 'reports':
        return <FileText className="w-8 h-8 text-[#DC3545]" />;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-6 hover:shadow-lg transition-shadow duration-300">
      {renderIcon()}
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-[#1A1A1A]">{value}</p>
      </div>
    </div>
  );
};

export default KPICard;