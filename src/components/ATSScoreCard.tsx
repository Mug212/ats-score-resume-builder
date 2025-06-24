
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

interface ATSScoreCardProps {
  score: number;
}

const ATSScoreCard: React.FC<ATSScoreCardProps> = ({ score }) => {
  const getScoreStatus = () => {
    if (score >= 90) return { label: 'Excellent', color: 'bg-green-100 text-green-800', icon: CheckCircle };
    if (score >= 70) return { label: 'Good', color: 'bg-yellow-100 text-yellow-800', icon: TrendingUp };
    return { label: 'Needs Work', color: 'bg-red-100 text-red-800', icon: AlertCircle };
  };

  const getProgressColor = () => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const status = getScoreStatus();
  const StatusIcon = status.icon;

  return (
    <Card className="w-64 shadow-lg border-2">
      <CardContent className="p-6">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <TrendingUp className="text-blue-600" size={20} />
            <span className="font-semibold text-gray-700">ATS Score</span>
          </div>
          
          <div className="text-4xl font-bold text-gray-900 mb-2">
            {score}
            <span className="text-lg text-gray-500">/100</span>
          </div>
          
          <Progress 
            value={score} 
            className="mb-3 h-2"
          />
          
          <Badge className={`${status.color} flex items-center gap-1`}>
            <StatusIcon size={12} />
            {status.label}
          </Badge>
          
          {score < 90 && (
            <p className="text-xs text-gray-600 mt-2">
              Add more details to reach 90+ score
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ATSScoreCard;
