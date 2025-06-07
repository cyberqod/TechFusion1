
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Download, RefreshCw, Copy, Upload } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const DataConverter = () => {
  const [inputData, setInputData] = useState('');
  const [outputData, setOutputData] = useState('');
  const [inputFormat, setInputFormat] = useState('json');
  const [outputFormat, setOutputFormat] = useState('csv');
  const [isConverting, setIsConverting] = useState(false);

  const convertData = async () => {
    if (!inputData.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer des données à convertir",
        variant: "destructive"
      });
      return;
    }

    setIsConverting(true);

    try {
      let parsedData;
      
      // Parse input data
      switch (inputFormat) {
        case 'json':
          parsedData = JSON.parse(inputData);
          break;
        case 'csv':
          parsedData = parseCSV(inputData);
          break;
        case 'xml':
          parsedData = parseXML(inputData);
          break;
        default:
          throw new Error('Format d\'entrée non supporté');
      }

      // Convert to output format
      let converted;
      switch (outputFormat) {
        case 'json':
          converted = JSON.stringify(parsedData, null, 2);
          break;
        case 'csv':
          converted = convertToCSV(parsedData);
          break;
        case 'xml':
          converted = convertToXML(parsedData);
          break;
        default:
          throw new Error('Format de sortie non supporté');
      }

      setOutputData(converted);
      
      toast({
        title: "Conversion réussie !",
        description: `Données converties de ${inputFormat.toUpperCase()} vers ${outputFormat.toUpperCase()}`
      });
    } catch (error) {
      console.error('Erreur lors de la conversion:', error);
      toast({
        title: "Erreur de conversion",
        description: "Vérifiez le format de vos données d'entrée",
        variant: "destructive"
      });
    } finally {
      setIsConverting(false);
    }
  };

  const parseCSV = (csvText: string) => {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    
    return lines.slice(1).map(line => {
      const values = line.split(',').map(v => v.trim());
      const obj: any = {};
      headers.forEach((header, index) => {
        obj[header] = values[index] || '';
      });
      return obj;
    });
  };

  const parseXML = (xmlText: string) => {
    // Conversion XML simple (pour demonstration)
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
    
    const parseElement = (element: Element): any => {
      if (element.children.length === 0) {
        return element.textContent;
      }
      
      const obj: any = {};
      Array.from(element.children).forEach(child => {
        const key = child.tagName;
        if (obj[key]) {
          if (!Array.isArray(obj[key])) {
            obj[key] = [obj[key]];
          }
          obj[key].push(parseElement(child));
        } else {
          obj[key] = parseElement(child);
        }
      });
      return obj;
    };

    return parseElement(xmlDoc.documentElement);
  };

  const convertToCSV = (data: any) => {
    if (!Array.isArray(data)) {
      data = [data];
    }
    
    if (data.length === 0) return '';
    
    const headers = Object.keys(data[0]);
    const csvRows = [headers.join(',')];
    
    data.forEach((row: any) => {
      const values = headers.map(header => {
        const value = row[header];
        return typeof value === 'string' && value.includes(',') ? `"${value}"` : value;
      });
      csvRows.push(values.join(','));
    });
    
    return csvRows.join('\n');
  };

  const convertToXML = (data: any, rootName = 'root') => {
    const toXML = (obj: any, name: string): string => {
      if (Array.isArray(obj)) {
        return obj.map(item => toXML(item, name.slice(0, -1))).join('');
      }
      
      if (typeof obj === 'object' && obj !== null) {
        const children = Object.entries(obj)
          .map(([key, value]) => toXML(value, key))
          .join('');
        return `<${name}>${children}</${name}>`;
      }
      
      return `<${name}>${obj}</${name}>`;
    };

    return `<?xml version="1.0" encoding="UTF-8"?>\n${toXML(data, rootName)}`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputData);
    toast({
      title: "Copié !",
      description: "Données copiées dans le presse-papiers"
    });
  };

  const downloadData = () => {
    if (!outputData) return;
    
    const blob = new Blob([outputData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `converted_data.${outputFormat}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setInputData(event.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  const sampleData = {
    json: `{
  "users": [
    {"id": 1, "name": "Alice", "email": "alice@example.com"},
    {"id": 2, "name": "Bob", "email": "bob@example.com"}
  ]
}`,
    csv: `id,name,email
1,Alice,alice@example.com
2,Bob,bob@example.com`,
    xml: `<?xml version="1.0"?>
<users>
  <user>
    <id>1</id>
    <name>Alice</name>
    <email>alice@example.com</email>
  </user>
  <user>
    <id>2</id>
    <name>Bob</name>
    <email>bob@example.com</email>
  </user>
</users>`
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 to-white">
      <Navigation />
      
      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <Button variant="ghost" asChild className="mb-4">
              <Link to="/" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Retour à l'accueil
              </Link>
            </Button>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                <RefreshCw className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-navy-900 mb-4">
                Convertisseur <span className="gradient-text">de Données</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Convertissez vos fichiers entre différents formats (JSON, CSV, XML) instantanément
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input */}
            <Card className='bg-white border-white'>
              <CardHeader>
                <CardTitle>Données d'entrée</CardTitle>
                <CardDescription>
                  Collez vos données ou uploadez un fichier
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Format d'entrée</Label>
                  <Select value={inputFormat} onValueChange={setInputFormat}>
                    <SelectTrigger className="bg-gray-100 border-white mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className='bg-white border-white'>
                      <SelectItem value="json">JSON</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                      <SelectItem value="xml">XML</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setInputData(sampleData[inputFormat as keyof typeof sampleData])}
                    className='bg-violet-100 border-violet-400 hover:bg-violet-100'
                  >
                    Exemple
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById('file-upload')?.click()}
                    className='bg-white border-gray-100 hover:bg-gray-100'
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Fichier
                  </Button>
                  <input
                    id="file-upload"
                    type="file"
                    accept=".json,.csv,.xml,.txt"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </div>

                <Textarea
                  placeholder={`Collez vos données ${inputFormat.toUpperCase()} ici...`}
                  value={inputData}
                  onChange={(e) => setInputData(e.target.value)}
                  rows={15}
                  className="bg-gray-100 border-white font-mono text-sm"
                />
              </CardContent>
            </Card>

            {/* Output */}
            <Card className='bg-white border-white'>
              <CardHeader>
                <CardTitle>Données converties</CardTitle>
                <CardDescription>
                  Résultat de la conversion
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-end">
                  <div>
                    <Label>Format de sortie</Label>
                    <Select value={outputFormat} onValueChange={setOutputFormat}>
                      <SelectTrigger className="bg-gray-100 border-white mt-2 w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className='bg-white'>
                        <SelectItem value="json">JSON</SelectItem>
                        <SelectItem value="csv">CSV</SelectItem>
                        <SelectItem value="xml">XML</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    onClick={convertData}
                    disabled={isConverting || !inputData.trim()}
                    className="text-white btn-primary"
                  >
                    {isConverting ? 'Conversion...' : 'Convertir'}
                  </Button>
                </div>

                <Textarea
                  placeholder="Le résultat apparaîtra ici..."
                  value={outputData}
                  readOnly
                  rows={15}
                  className="border-white font-mono text-sm bg-gray-50"
                />

                {outputData && (
                  <div className="flex gap-2">
                    <Button onClick={copyToClipboard} variant="outline" size="sm" className='bg-white border-gray-100'>
                      <Copy className="w-4 h-4 mr-2" />
                      Copier
                    </Button>
                    <Button onClick={downloadData} variant="outline" size="sm" className='bg-violet-100 border-violet-200'>
                      <Download className="w-4 h-4 mr-2" />
                      Télécharger
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DataConverter;
