
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Code, User, Plus, X } from 'lucide-react';

interface Skills {
  technical: string[];
  soft: string[];
}

interface SkillsFormProps {
  data: Skills;
  onChange: (data: Skills) => void;
}

const SkillsForm: React.FC<SkillsFormProps> = ({ data, onChange }) => {
  const [newTechnicalSkill, setNewTechnicalSkill] = useState('');
  const [newSoftSkill, setNewSoftSkill] = useState('');

  const addTechnicalSkill = () => {
    if (newTechnicalSkill.trim()) {
      onChange({
        ...data,
        technical: [...data.technical, newTechnicalSkill.trim()]
      });
      setNewTechnicalSkill('');
    }
  };

  const addSoftSkill = () => {
    if (newSoftSkill.trim()) {
      onChange({
        ...data,
        soft: [...data.soft, newSoftSkill.trim()]
      });
      setNewSoftSkill('');
    }
  };

  const removeTechnicalSkill = (index: number) => {
    onChange({
      ...data,
      technical: data.technical.filter((_, i) => i !== index)
    });
  };

  const removeSoftSkill = (index: number) => {
    onChange({
      ...data,
      soft: data.soft.filter((_, i) => i !== index)
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent, type: 'technical' | 'soft') => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (type === 'technical') {
        addTechnicalSkill();
      } else {
        addSoftSkill();
      }
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50">
        <CardTitle className="flex items-center gap-2">
          <Code className="text-blue-600" size={24} />
          Skills
        </CardTitle>
        <p className="text-sm text-gray-600">
          Add your technical and soft skills (20 points - aim for 8+ technical, 5+ soft)
        </p>
      </CardHeader>
      <CardContent className="p-6 space-y-8">
        {/* Technical Skills */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-2 text-base font-semibold">
              <Code size={18} />
              Technical Skills
              <span className={`text-sm font-normal ${data.technical.length >= 8 ? 'text-green-600' : 'text-gray-500'}`}>
                ({data.technical.length}/8+)
              </span>
            </Label>
          </div>
          
          <div className="flex gap-2">
            <Input
              placeholder="e.g., JavaScript, React, Python, AWS..."
              value={newTechnicalSkill}
              onChange={(e) => setNewTechnicalSkill(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, 'technical')}
              className="flex-1"
            />
            <Button onClick={addTechnicalSkill} size="sm">
              <Plus size={16} />
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {data.technical.map((skill, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                {skill}
                <X 
                  size={12} 
                  className="cursor-pointer hover:text-red-600" 
                  onClick={() => removeTechnicalSkill(index)}
                />
              </Badge>
            ))}
          </div>

          {data.technical.length < 8 && (
            <p className="text-xs text-gray-600">
              💡 Add more technical skills to improve your ATS score. Include programming languages, frameworks, tools, and technologies.
            </p>
          )}
        </div>

        {/* Soft Skills */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-2 text-base font-semibold">
              <User size={18} />
              Soft Skills
              <span className={`text-sm font-normal ${data.soft.length >= 5 ? 'text-green-600' : 'text-gray-500'}`}>
                ({data.soft.length}/5+)
              </span>
            </Label>
          </div>
          
          <div className="flex gap-2">
            <Input
              placeholder="e.g., Leadership, Communication, Problem Solving..."
              value={newSoftSkill}
              onChange={(e) => setNewSoftSkill(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, 'soft')}
              className="flex-1"
            />
            <Button onClick={addSoftSkill} size="sm">
              <Plus size={16} />
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {data.soft.map((skill, index) => (
              <Badge key={index} variant="outline" className="flex items-center gap-1">
                {skill}
                <X 
                  size={12} 
                  className="cursor-pointer hover:text-red-600" 
                  onClick={() => removeSoftSkill(index)}
                />
              </Badge>
            ))}
          </div>

          {data.soft.length < 5 && (
            <p className="text-xs text-gray-600">
              💡 Add more soft skills to reach the optimal ATS score. Include interpersonal and professional skills.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillsForm;
