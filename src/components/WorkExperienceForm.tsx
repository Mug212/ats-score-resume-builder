
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Briefcase, Plus, Trash2, TrendingUp } from 'lucide-react';

interface WorkExperience {
  id: string;
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  current: boolean;
  achievements: string[];
}

interface WorkExperienceFormProps {
  data: WorkExperience[];
  onChange: (data: WorkExperience[]) => void;
}

const WorkExperienceForm: React.FC<WorkExperienceFormProps> = ({ data, onChange }) => {
  const addExperience = () => {
    const newExperience: WorkExperience = {
      id: Date.now().toString(),
      jobTitle: '',
      company: '',
      startDate: '',
      endDate: '',
      current: false,
      achievements: [''],
    };
    onChange([...data, newExperience]);
  };

  const updateExperience = (id: string, field: keyof WorkExperience, value: any) => {
    onChange(data.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const removeExperience = (id: string) => {
    onChange(data.filter(exp => exp.id !== id));
  };

  const addAchievement = (id: string) => {
    const experience = data.find(exp => exp.id === id);
    if (experience) {
      updateExperience(id, 'achievements', [...experience.achievements, '']);
    }
  };

  const updateAchievement = (id: string, index: number, value: string) => {
    const experience = data.find(exp => exp.id === id);
    if (experience) {
      const newAchievements = [...experience.achievements];
      newAchievements[index] = value;
      updateExperience(id, 'achievements', newAchievements);
    }
  };

  const removeAchievement = (id: string, index: number) => {
    const experience = data.find(exp => exp.id === id);
    if (experience && experience.achievements.length > 1) {
      const newAchievements = experience.achievements.filter((_, i) => i !== index);
      updateExperience(id, 'achievements', newAchievements);
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50">
        <CardTitle className="flex items-center gap-2">
          <Briefcase className="text-blue-600" size={24} />
          Work Experience
        </CardTitle>
        <p className="text-sm text-gray-600">
          Add your work experience with quantified achievements (30 points)
        </p>
      </CardHeader>
      <CardContent className="p-6">
        {data.length === 0 ? (
          <div className="text-center py-8">
            <Briefcase className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-600 mb-4">No work experience added yet</p>
            <Button onClick={addExperience} className="bg-blue-600 hover:bg-blue-700">
              <Plus size={16} className="mr-2" />
              Add First Experience
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {data.map((experience, index) => (
              <div key={experience.id} className="border rounded-lg p-4 bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Experience #{index + 1}
                  </h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeExperience(experience.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <Label htmlFor={`jobTitle-${experience.id}`}>Job Title *</Label>
                    <Input
                      id={`jobTitle-${experience.id}`}
                      placeholder="Software Engineer"
                      value={experience.jobTitle}
                      onChange={(e) => updateExperience(experience.id, 'jobTitle', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`company-${experience.id}`}>Company *</Label>
                    <Input
                      id={`company-${experience.id}`}
                      placeholder="Tech Company Inc."
                      value={experience.company}
                      onChange={(e) => updateExperience(experience.id, 'company', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`startDate-${experience.id}`}>Start Date</Label>
                    <Input
                      id={`startDate-${experience.id}`}
                      type="month"
                      value={experience.startDate}
                      onChange={(e) => updateExperience(experience.id, 'startDate', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`endDate-${experience.id}`}>End Date</Label>
                    <Input
                      id={`endDate-${experience.id}`}
                      type="month"
                      value={experience.endDate}
                      onChange={(e) => updateExperience(experience.id, 'endDate', e.target.value)}
                      disabled={experience.current}
                    />
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`current-${experience.id}`}
                        checked={experience.current}
                        onCheckedChange={(checked) => {
                          updateExperience(experience.id, 'current', checked);
                          if (checked) {
                            updateExperience(experience.id, 'endDate', '');
                          }
                        }}
                      />
                      <Label htmlFor={`current-${experience.id}`} className="text-sm">
                        I currently work here
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center gap-2">
                      <TrendingUp size={16} />
                      Key Achievements *
                    </Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addAchievement(experience.id)}
                    >
                      <Plus size={16} className="mr-1" />
                      Add Achievement
                    </Button>
                  </div>

                  {experience.achievements.map((achievement, achievementIndex) => (
                    <div key={achievementIndex} className="flex gap-2">
                      <Textarea
                        placeholder="• Increased team productivity by 30% through implementation of automated testing procedures, reducing bug reports by 45% and saving 10 hours per week"
                        value={achievement}
                        onChange={(e) => updateAchievement(experience.id, achievementIndex, e.target.value)}
                        className="flex-1"
                        rows={2}
                      />
                      {experience.achievements.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeAchievement(experience.id, achievementIndex)}
                          className="text-red-600"
                        >
                          <Trash2 size={16} />
                        </Button>
                      )}
                    </div>
                  ))}
                  
                  <p className="text-xs text-gray-600">
                    💡 Tip: Use numbers and metrics! Start with action verbs and quantify your impact.
                  </p>
                </div>
              </div>
            ))}

            <Button onClick={addExperience} className="w-full bg-blue-600 hover:bg-blue-700">
              <Plus size={16} className="mr-2" />
              Add Another Experience
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WorkExperienceForm;
