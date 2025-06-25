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
      <div className="container mx-auto px-2 sm:px-4 lg:px-6 xl:px-8 py-4 sm:py-6 lg:py-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-2">
            Resume Builder Pro
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-4 sm:mb-6 px-4">
            Create ATS-optimized resumes that get you hired
          </p>

          {/* ATS Score Display */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mb-4 sm:mb-6">
            <div className="w-full sm:w-auto">
              <ATSScoreCard score={currentScore} />
            </div>
            <div className="flex flex-col xs:flex-row gap-2 w-full sm:w-auto">
              <Button
                variant={showPreview ? "default" : "outline"}
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center justify-center gap-2 w-full xs:w-auto text-sm"
                size="sm"
              >
                <Eye size={14} className="sm:w-4 sm:h-4" />
                {showPreview ? 'Edit' : 'Preview'}
              </Button>
              <Button className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 w-full xs:w-auto text-sm" size="sm">
                <Download size={14} className="sm:w-4 sm:h-4" />
                Download PDF
              </Button>
            </div>
          </div>

          {/* Progress Indicators */}
          <div className="grid grid-cols-3 sm:flex sm:flex-wrap justify-center items-center gap-2 sm:gap-3 lg:gap-4 mb-6 sm:mb-8 px-2">
            {progressSections.map((section) => {
              const Icon = section.icon;
              return (
                <div
                  key={section.id}
                  className={`flex flex-col items-center gap-1 p-2 sm:p-3 rounded-lg transition-all cursor-pointer min-w-0 ${
                    activeTab === section.id
                      ? 'bg-blue-100 text-blue-700 shadow-sm'
                      : section.completed
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                  }`}
                  onClick={() => setActiveTab(section.id)}
                >
                  <Icon size={16} className="sm:w-5 sm:h-5 flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-medium text-center leading-tight">
                    {section.name}
                  </span>
                  {section.completed && (
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col xl:grid xl:grid-cols-4 xl:gap-8">
          {/* Forms/Preview Section */}
          <div className="xl:col-span-3 mb-6 xl:mb-0">
            {showPreview ? (
              <div className="w-full overflow-hidden">
                <ResumePreview data={resumeData} />
              </div>
            ) : (
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                {/* Mobile/Tablet Tab Navigation */}
                <div className="block xl:hidden mb-4">
                  <TabsList className="grid w-full grid-cols-2 h-auto gap-1 p-1">
                    <TabsTrigger value="personal" className="text-xs p-2">Personal</TabsTrigger>
                    <TabsTrigger value="experience" className="text-xs p-2">Experience</TabsTrigger>
                  </TabsList>
                  <TabsList className="grid w-full grid-cols-2 h-auto gap-1 p-1 mt-2">
                    <TabsTrigger value="education" className="text-xs p-2">Education</TabsTrigger>
                    <TabsTrigger value="skills" className="text-xs p-2">Skills</TabsTrigger>
                  </TabsList>
                  <TabsList className="grid w-full grid-cols-2 h-auto gap-1 p-1 mt-2">
                    <TabsTrigger value="projects" className="text-xs p-2">Projects</TabsTrigger>
                    <TabsTrigger value="certifications" className="text-xs p-2">Certifications</TabsTrigger>
                  </TabsList>
                </div>

                {/* Desktop Tab Navigation */}
                <div className="hidden xl:block mb-4">
                  <TabsList className="grid w-full grid-cols-6 h-auto">
                    <TabsTrigger value="personal" className="text-sm">Personal</TabsTrigger>
                    <TabsTrigger value="experience" className="text-sm">Experience</TabsTrigger>
                    <TabsTrigger value="education" className="text-sm">Education</TabsTrigger>
                    <TabsTrigger value="skills" className="text-sm">Skills</TabsTrigger>
                    <TabsTrigger value="projects" className="text-sm">Projects</TabsTrigger>
                    <TabsTrigger value="certifications" className="text-sm">Certifications</TabsTrigger>
                  </TabsList>
                </div>

                <div className="w-full overflow-hidden">
                  <TabsContent value="personal" className="mt-0">
                    <PersonalInfoForm
                      data={resumeData.personalInfo}
                      onChange={(data) => updateResumeData('personalInfo', data)}
                    />
                  </TabsContent>

                  <TabsContent value="experience" className="mt-0">
                    <WorkExperienceForm
                      data={resumeData.workExperience}
                      onChange={(data) => updateResumeData('workExperience', data)}
                    />
                  </TabsContent>

                  <TabsContent value="education" className="mt-0">
                    <EducationForm
                      data={resumeData.education}
                      onChange={(data) => updateResumeData('education', data)}
                    />
                  </TabsContent>

                  <TabsContent value="skills" className="mt-0">
                    <SkillsForm
                      data={resumeData.skills}
                      onChange={(data) => updateResumeData('skills', data)}
                    />
                  </TabsContent>

                  <TabsContent value="projects" className="mt-0">
                    <ProjectsForm
                      data={resumeData.projects}
                      onChange={(data) => updateResumeData('projects', data)}
                    />
                  </TabsContent>

                  <TabsContent value="certifications" className="mt-0">
                    <CertificationsForm
                      data={resumeData.certifications}
                      onChange={(data) => updateResumeData('certifications', data)}
                    />
                  </TabsContent>
                </div>
              </Tabs>
            )}
          </div>

          {/* ATS Score Sidebar - Only show on desktop when not in preview mode */}
          {!showPreview && (
            <div className="xl:col-span-1">
              {/* Mobile/Tablet: Horizontal card at top */}
              <div className="block xl:hidden mb-6">
                <Card className="w-full">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">ATS Score</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ATSScoreCard score={currentScore} />
                  </CardContent>
                </Card>
              </div>
              
              {/* Desktop: Sticky sidebar */}
              <div className="hidden xl:block sticky top-4">
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle className="text-xl">ATS Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ATSScoreCard score={currentScore} />
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;