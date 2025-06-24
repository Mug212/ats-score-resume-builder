
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { User, Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';

interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  summary: string;
}

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ data, onChange }) => {
  const handleChange = (field: keyof PersonalInfo, value: string) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50">
        <CardTitle className="flex items-center gap-2">
          <User className="text-blue-600" size={24} />
          Personal Information
        </CardTitle>
        <p className="text-sm text-gray-600">
          Complete your contact details and professional summary (20 points)
        </p>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="flex items-center gap-2">
              <User size={16} />
              Full Name *
            </Label>
            <Input
              id="fullName"
              placeholder="John Doe"
              value={data.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              className="border-gray-300 focus:border-blue-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail size={16} />
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="john.doe@email.com"
              value={data.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="border-gray-300 focus:border-blue-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone size={16} />
              Phone Number *
            </Label>
            <Input
              id="phone"
              placeholder="+1 (555) 123-4567"
              value={data.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="border-gray-300 focus:border-blue-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center gap-2">
              <MapPin size={16} />
              Location *
            </Label>
            <Input
              id="location"
              placeholder="New York, NY"
              value={data.location}
              onChange={(e) => handleChange('location', e.target.value)}
              className="border-gray-300 focus:border-blue-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="linkedin" className="flex items-center gap-2">
              <Linkedin size={16} />
              LinkedIn Profile
            </Label>
            <Input
              id="linkedin"
              placeholder="linkedin.com/in/johndoe"
              value={data.linkedin}
              onChange={(e) => handleChange('linkedin', e.target.value)}
              className="border-gray-300 focus:border-blue-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="github" className="flex items-center gap-2">
              <Github size={16} />
              GitHub Profile
            </Label>
            <Input
              id="github"
              placeholder="github.com/johndoe"
              value={data.github}
              onChange={(e) => handleChange('github', e.target.value)}
              className="border-gray-300 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="summary" className="flex items-center gap-2 justify-between">
            <span>Professional Summary *</span>
            <span className={`text-xs ${data.summary.length >= 100 ? 'text-green-600' : 'text-gray-500'}`}>
              {data.summary.length}/100+ characters
            </span>
          </Label>
          <Textarea
            id="summary"
            placeholder="Write a compelling professional summary that highlights your key skills, experience, and career objectives. Aim for 100+ characters for optimal ATS scoring."
            value={data.summary}
            onChange={(e) => handleChange('summary', e.target.value)}
            className="border-gray-300 focus:border-blue-500 min-h-[120px]"
            rows={5}
          />
          <p className="text-xs text-gray-600">
            Tip: Include relevant keywords from your target job descriptions for better ATS matching.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoForm;
