
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { GraduationCap, Plus, Trash2 } from 'lucide-react';

interface Education {
  id: string;
  degree: string;
  school: string;
  graduationDate: string;
  gpa: string;
}

interface EducationFormProps {
  data: Education[];
  onChange: (data: Education[]) => void;
}

const EducationForm: React.FC<EducationFormProps> = ({ data, onChange }) => {
  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      degree: '',
      school: '',
      graduationDate: '',
      gpa: '',
    };
    onChange([...data, newEducation]);
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    onChange(data.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  const removeEducation = (id: string) => {
    onChange(data.filter(edu => edu.id !== id));
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50">
        <CardTitle className="flex items-center gap-2">
          <GraduationCap className="text-blue-600" size={24} />
          Education
        </CardTitle>
        <p className="text-sm text-gray-600">
          Add your educational background (15 points)
        </p>
      </CardHeader>
      <CardContent className="p-6">
        {data.length === 0 ? (
          <div className="text-center py-8">
            <GraduationCap className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-600 mb-4">No education added yet</p>
            <Button onClick={addEducation} className="bg-blue-600 hover:bg-blue-700">
              <Plus size={16} className="mr-2" />
              Add Education
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {data.map((education, index) => (
              <div key={education.id} className="border rounded-lg p-4 bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Education #{index + 1}
                  </h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeEducation(education.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`degree-${education.id}`}>Degree *</Label>
                    <Input
                      id={`degree-${education.id}`}
                      placeholder="Bachelor of Science in Computer Science"
                      value={education.degree}
                      onChange={(e) => updateEducation(education.id, 'degree', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`school-${education.id}`}>School/University *</Label>
                    <Input
                      id={`school-${education.id}`}
                      placeholder="University of Technology"
                      value={education.school}
                      onChange={(e) => updateEducation(education.id, 'school', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`graduationDate-${education.id}`}>Graduation Date</Label>
                    <Input
                      id={`graduationDate-${education.id}`}
                      type="month"
                      value={education.graduationDate}
                      onChange={(e) => updateEducation(education.id, 'graduationDate', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`gpa-${education.id}`}>GPA (Optional)</Label>
                    <Input
                      id={`gpa-${education.id}`}
                      placeholder="3.8/4.0"
                      value={education.gpa}
                      onChange={(e) => updateEducation(education.id, 'gpa', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}

            <Button onClick={addEducation} className="w-full bg-blue-600 hover:bg-blue-700">
              <Plus size={16} className="mr-2" />
              Add Another Education
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EducationForm;
