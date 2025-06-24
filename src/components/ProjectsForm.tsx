
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { FolderOpen, Plus, Trash2, X, ExternalLink } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link: string;
}

interface ProjectsFormProps {
  data: Project[];
  onChange: (data: Project[]) => void;
}

const ProjectsForm: React.FC<ProjectsFormProps> = ({ data, onChange }) => {
  const [newTech, setNewTech] = useState<{ [key: string]: string }>({});

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: [],
      link: '',
    };
    onChange([...data, newProject]);
  };

  const updateProject = (id: string, field: keyof Project, value: any) => {
    onChange(data.map(project => 
      project.id === id ? { ...project, [field]: value } : project
    ));
  };

  const removeProject = (id: string) => {
    onChange(data.filter(project => project.id !== id));
  };

  const addTechnology = (projectId: string) => {
    const techValue = newTech[projectId]?.trim();
    if (techValue) {
      const project = data.find(p => p.id === projectId);
      if (project) {
        updateProject(projectId, 'technologies', [...project.technologies, techValue]);
        setNewTech({ ...newTech, [projectId]: '' });
      }
    }
  };

  const removeTechnology = (projectId: string, techIndex: number) => {
    const project = data.find(p => p.id === projectId);
    if (project) {
      const newTechnologies = project.technologies.filter((_, i) => i !== techIndex);
      updateProject(projectId, 'technologies', newTechnologies);
    }
  };

  const handleTechKeyPress = (e: React.KeyboardEvent, projectId: string) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTechnology(projectId);
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50">
        <CardTitle className="flex items-center gap-2">
          <FolderOpen className="text-blue-600" size={24} />
          Projects
        </CardTitle>
        <p className="text-sm text-gray-600">
          Showcase your personal and professional projects (10 points)
        </p>
      </CardHeader>
      <CardContent className="p-6">
        {data.length === 0 ? (
          <div className="text-center py-8">
            <FolderOpen className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-600 mb-4">No projects added yet</p>
            <Button onClick={addProject} className="bg-blue-600 hover:bg-blue-700">
              <Plus size={16} className="mr-2" />
              Add First Project
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {data.map((project, index) => (
              <div key={project.id} className="border rounded-lg p-4 bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Project #{index + 1}
                  </h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeProject(project.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`name-${project.id}`}>Project Name *</Label>
                      <Input
                        id={`name-${project.id}`}
                        placeholder="E-commerce Platform"
                        value={project.name}
                        onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`link-${project.id}`} className="flex items-center gap-1">
                        <ExternalLink size={14} />
                        Project Link
                      </Label>
                      <Input
                        id={`link-${project.id}`}
                        placeholder="https://github.com/username/project"
                        value={project.link}
                        onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`description-${project.id}`}>Description *</Label>
                    <Textarea
                      id={`description-${project.id}`}
                      placeholder="Built a full-stack e-commerce platform using React and Node.js, serving 1000+ users with 99.9% uptime. Implemented secure payment processing and inventory management features."
                      value={project.description}
                      onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-3">
                    <Label>Technologies Used</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="e.g., React, Node.js, MongoDB..."
                        value={newTech[project.id] || ''}
                        onChange={(e) => setNewTech({ ...newTech, [project.id]: e.target.value })}
                        onKeyPress={(e) => handleTechKeyPress(e, project.id)}
                        className="flex-1"
                      />
                      <Button 
                        type="button"
                        onClick={() => addTechnology(project.id)} 
                        size="sm"
                      >
                        <Plus size={16} />
                      </Button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="secondary" className="flex items-center gap-1">
                          {tech}
                          <X 
                            size={12} 
                            className="cursor-pointer hover:text-red-600" 
                            onClick={() => removeTechnology(project.id, techIndex)}
                          />
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <Button onClick={addProject} className="w-full bg-blue-600 hover:bg-blue-700">
              <Plus size={16} className="mr-2" />
              Add Another Project
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectsForm;
