
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Download, Eye, User, Briefcase, GraduationCap, Code, FolderOpen, Award } from 'lucide-react';
import PersonalInfoForm from '@/components/PersonalInfoForm';
import WorkExperienceForm from '@/components/WorkExperienceForm';
import EducationForm from '@/components/EducationForm';
import SkillsForm from '@/components/SkillsForm';
import ProjectsForm from '@/components/ProjectsForm';
import CertificationsForm from '@/components/CertificationsForm';
import ResumePreview from '@/components/ResumePreview';
import ATSScoreCard from '@/components/ATSScoreCard';

export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
    summary: string;
  };
  workExperience: Array<{
    id: string;
    jobTitle: string;
    company: string;
    startDate: string;
    endDate: string;
    current: boolean;
    achievements: string[];
  }>;
  education: Array<{
    id: string;
    degree: string;
    school: string;
    graduationDate: string;
    gpa: string;
  }>;
  skills: {
    technical: string[];
    soft: string[];
  };
  projects: Array<{
    id: string;
    name: string;
    description: string;
    technologies: string[];
    link: string;
  }>;
  certifications: Array<{
    id: string;
    name: string;
    issuer: string;
    date: string;
  }>;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [showPreview, setShowPreview] = useState(false);
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      github: '',
      summary: '',
    },
    workExperience: [],
    education: [],
    skills: {
      technical: [],
      soft: [],
    },
    projects: [],
    certifications: [],
  });

  const updateResumeData = (section: keyof ResumeData, data: any) => {
    setResumeData(prev => ({
      ...prev,
      [section]: data,
    }));
  };

  const calculateATSScore = (): number => {
    let score = 0;
    
    // Personal Information (20 points)
    const { personalInfo } = resumeData;
    if (personalInfo.fullName) score += 3;
    if (personalInfo.email) score += 3;
    if (personalInfo.phone) score += 3;
    if (personalInfo.location) score += 3;
    if (personalInfo.linkedin) score += 2;
    if (personalInfo.github) score += 2;
    if (personalInfo.summary && personalInfo.summary.length >= 100) score += 4;

    // Work Experience (30 points)
    if (resumeData.workExperience.length > 0) score += 10;
    const totalAchievements = resumeData.workExperience.reduce((acc, exp) => acc + exp.achievements.length, 0);
    if (totalAchievements >= 3) score += 10;
    if (totalAchievements >= 6) score += 10;

    // Education (15 points)
    if (resumeData.education.length > 0) score += 15;

    // Skills (20 points)
    if (resumeData.skills.technical.length >= 5) score += 10;
    if (resumeData.skills.technical.length >= 8) score += 5;
    if (resumeData.skills.soft.length >= 3) score += 5;

    // Projects (10 points)
    if (resumeData.projects.length >= 1) score += 5;
    if (resumeData.projects.length >= 3) score += 5;

    // Overall Structure (5 points)
    const completedSections = [
      resumeData.personalInfo.fullName,
      resumeData.workExperience.length > 0,
      resumeData.education.length > 0,
      resumeData.skills.technical.length > 0,
    ].filter(Boolean).length;
    
    if (completedSections >= 3) score += 5;

    return Math.min(score, 100);
  };

  const getScoreColor = (score: number): string => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressSections = () => {
    return [
      {
        id: 'personal',
        name: 'Personal Info',
        icon: User,
        completed: !!(resumeData.personalInfo.fullName && resumeData.personalInfo.email),
      },
      {
        id: 'experience',
        name: 'Experience',
        icon: Briefcase,
        completed: resumeData.workExperience.length > 0,
      },
      {
        id: 'education',
        name: 'Education',
        icon: GraduationCap,
        completed: resumeData.education.length > 0,
      },
      {
        id: 'skills',
        name: 'Skills',
        icon: Code,
        completed: resumeData.skills.technical.length > 0,
      },
      {
        id: 'projects',
        name: 'Projects',
        icon: FolderOpen,
        completed: resumeData.projects.length > 0,
      },
      {
        id: 'certifications',
        name: 'Certifications',
        icon: Award,
        completed: resumeData.certifications.length > 0,
      },
    ];
  };

  const currentScore = calculateATSScore();
  const progressSections = getProgressSections();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Resume Builder Pro
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Create ATS-optimized resumes that get you hired
          </p>
          
          {/* ATS Score Display */}
          <div className="flex justify-center items-center gap-6 mb-6">
            <ATSScoreCard score={currentScore} />
            <div className="flex gap-2">
              <Button
                variant={showPreview ? "default" : "outline"}
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center gap-2"
              >
                <Eye size={16} />
                {showPreview ? 'Edit' : 'Preview'}
              </Button>
              <Button className="flex items-center gap-2 bg-green-600 hover:bg-green-700">
                <Download size={16} />
                Download PDF
              </Button>
            </div>
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center items-center gap-4 mb-8">
            {progressSections.map((section) => {
              const Icon = section.icon;
              return (
                <div
                  key={section.id}
                  className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all cursor-pointer ${
                    activeTab === section.id
                      ? 'bg-blue-100 text-blue-700'
                      : section.completed
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                  onClick={() => setActiveTab(section.id)}
                >
                  <Icon size={20} />
                  <span className="text-xs font-medium">{section.name}</span>
                  {section.completed && (
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        {showPreview ? (
          <ResumePreview data={resumeData} />
        ) : (
          <div className="max-w-4xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="hidden">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="certifications">Certifications</TabsTrigger>
              </TabsList>

              <TabsContent value="personal">
                <PersonalInfoForm
                  data={resumeData.personalInfo}
                  onChange={(data) => updateResumeData('personalInfo', data)}
                />
              </TabsContent>

              <TabsContent value="experience">
                <WorkExperienceForm
                  data={resumeData.workExperience}
                  onChange={(data) => updateResumeData('workExperience', data)}
                />
              </TabsContent>

              <TabsContent value="education">
                <EducationForm
                  data={resumeData.education}
                  onChange={(data) => updateResumeData('education', data)}
                />
              </TabsContent>

              <TabsContent value="skills">
                <SkillsForm
                  data={resumeData.skills}
                  onChange={(data) => updateResumeData('skills', data)}
                />
              </TabsContent>

              <TabsContent value="projects">
                <ProjectsForm
                  data={resumeData.projects}
                  onChange={(data) => updateResumeData('projects', data)}
                />
              </TabsContent>

              <TabsContent value="certifications">
                <CertificationsForm
                  data={resumeData.certifications}
                  onChange={(data) => updateResumeData('certifications', data)}
                />
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
