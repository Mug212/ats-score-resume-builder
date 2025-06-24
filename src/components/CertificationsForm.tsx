
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Award, Plus, Trash2 } from 'lucide-react';

interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

interface CertificationsFormProps {
  data: Certification[];
  onChange: (data: Certification[]) => void;
}

const CertificationsForm: React.FC<CertificationsFormProps> = ({ data, onChange }) => {
  const addCertification = () => {
    const newCertification: Certification = {
      id: Date.now().toString(),
      name: '',
      issuer: '',
      date: '',
    };
    onChange([...data, newCertification]);
  };

  const updateCertification = (id: string, field: keyof Certification, value: string) => {
    onChange(data.map(cert => 
      cert.id === id ? { ...cert, [field]: value } : cert
    ));
  };

  const removeCertification = (id: string) => {
    onChange(data.filter(cert => cert.id !== id));
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50">
        <CardTitle className="flex items-center gap-2">
          <Award className="text-blue-600" size={24} />
          Certifications
        </CardTitle>
        <p className="text-sm text-gray-600">
          Add your professional certifications and credentials (bonus points)
        </p>
      </CardHeader>
      <CardContent className="p-6">
        {data.length === 0 ? (
          <div className="text-center py-8">
            <Award className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-600 mb-4">No certifications added yet</p>
            <Button onClick={addCertification} className="bg-blue-600 hover:bg-blue-700">
              <Plus size={16} className="mr-2" />
              Add Certification
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {data.map((certification, index) => (
              <div key={certification.id} className="border rounded-lg p-4 bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Certification #{index + 1}
                  </h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeCertification(certification.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor={`name-${certification.id}`}>Certification Name *</Label>
                    <Input
                      id={`name-${certification.id}`}
                      placeholder="AWS Certified Solutions Architect"
                      value={certification.name}
                      onChange={(e) => updateCertification(certification.id, 'name', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`issuer-${certification.id}`}>Issuing Organization *</Label>
                    <Input
                      id={`issuer-${certification.id}`}
                      placeholder="Amazon Web Services"
                      value={certification.issuer}
                      onChange={(e) => updateCertification(certification.id, 'issuer', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`date-${certification.id}`}>Date Obtained</Label>
                    <Input
                      id={`date-${certification.id}`}
                      type="month"
                      value={certification.date}
                      onChange={(e) => updateCertification(certification.id, 'date', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}

            <Button onClick={addCertification} className="w-full bg-blue-600 hover:bg-blue-700">
              <Plus size={16} className="mr-2" />
              Add Another Certification
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CertificationsForm;
