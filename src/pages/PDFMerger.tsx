
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/hooks/use-toast';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { ArrowLeft, Upload, File, X, Download, Loader2, CheckCircle } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';

interface PDFFile {
  id: string;
  file: File;
  name: string;
  size: string;
}

const PDFMerger = () => {
  const [files, setFiles] = useState<PDFFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);
  const [mergedPdf, setMergedPdf] = useState<Uint8Array | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const pdfFiles = Array.from(selectedFiles).filter(file => 
      file.type === 'application/pdf'
    );

    if (pdfFiles.length !== selectedFiles.length) {
      toast({
        title: "Fichiers non valides",
        description: "Seuls les fichiers PDF sont acceptés.",
        variant: "destructive"
      });
    }

    const newFiles: PDFFile[] = pdfFiles.map(file => ({
      id: generateId(),
      file,
      name: file.name,
      size: formatFileSize(file.size)
    }));

    setFiles(prev => [...prev, ...newFiles]);
    setIsComplete(false);
    setMergedPdf(null);

    if (newFiles.length > 0) {
      toast({
        title: "Fichiers ajoutés",
        description: `${newFiles.length} fichier(s) PDF ajouté(s) avec succès.`
      });
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(file => file.id !== id));
    setIsComplete(false);
    setMergedPdf(null);
    toast({
      title: "Fichier supprimé",
      description: "Le fichier a été retiré de la liste."
    });
  };

  const moveFile = (id: string, direction: 'up' | 'down') => {
    setFiles(prev => {
      const index = prev.findIndex(file => file.id === id);
      if (
        (direction === 'up' && index === 0) ||
        (direction === 'down' && index === prev.length - 1)
      ) {
        return prev;
      }

      const newFiles = [...prev];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      [newFiles[index], newFiles[targetIndex]] = [newFiles[targetIndex], newFiles[index]];
      return newFiles;
    });
  };

  const mergePDFs = async () => {
    if (files.length < 2) {
      toast({
        title: "Fichiers insuffisants",
        description: "Veuillez sélectionner au moins 2 fichiers PDF à fusionner.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    setProgress(0);
    setIsComplete(false);
    setMergedPdf(null);

    try {
      const mergedPdf = await PDFDocument.create();
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setProgress(Math.round((i / files.length) * 80));
        
        const arrayBuffer = await file.file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      setProgress(90);
      const pdfBytes = await mergedPdf.save();
      setProgress(100);
      
      setMergedPdf(pdfBytes);
      setIsComplete(true);
      
      toast({
        title: "Fusion réussie !",
        description: "Vos fichiers PDF ont été fusionnés avec succès. Vous pouvez maintenant télécharger le résultat.",
      });

    } catch (error) {
      console.error('Erreur lors de la fusion:', error);
      toast({
        title: "Erreur de fusion",
        description: "Une erreur est survenue lors de la fusion des fichiers.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadMergedPdf = () => {
    if (!mergedPdf) return;

    const blob = new Blob([mergedPdf], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'document_fusionne.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Téléchargement lancé",
      description: "Le fichier PDF fusionné a été téléchargé."
    });
  };

  const startNewMerge = () => {
    setFiles([]);
    setMergedPdf(null);
    setIsComplete(false);
    setProgress(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <Link 
              to="/" 
              className="inline-flex items-center text-violet-600 hover:text-violet-700 mb-6 group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
              Retour à l'accueil
            </Link>
            
            <h1 className="text-4xl md:text-5xl font-bold text-navy-900 mb-4">
              Fusion de <span className="gradient-text">Fichiers PDF</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Combinez facilement plusieurs fichiers PDF en un seul document. 
              Rapide, sécurisé et Utile.
            </p>
          </div>

          {/* Success State */}
          {isComplete && mergedPdf && (
            <Card className="mb-8 border-green-200 bg-green-50 shadow-lg">
              <CardContent className="p-8 text-center">
                <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-green-800 mb-4">
                  Fusion terminée avec succès !
                </h3>
                <p className="text-green-700 mb-6">
                  Votre document PDF fusionné est prêt. Choisissez une action ci-dessous :
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={downloadMergedPdf}
                    className="text-white btn-primary text-lg px-8 py-4 flex items-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Télécharger le PDF fusionné
                  </Button>
                  <Button
                    variant="outline"
                    onClick={startNewMerge}
                    className="bg-white text-lg px-8 py-4 border-violet-200 hover:bg-violet-100"
                  >
                    Nouvelle fusion
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Upload Area */}
          {!isComplete && (
            <Card className="bg-white mb-8 border-2 border-dashed border-gray-200 shadow-lg">
              <CardContent className="p-8">
                <div
                  className={`drop-zone ${isDragOver ? 'dragover' : ''}`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-16 h-16 mx-auto mb-4 text-violet-500" />
                  <h3 className="text-2xl font-semibold text-navy-900 mb-2">
                    Glissez vos fichiers PDF ici
                  </h3>
                  <p className="text-gray-600 mb-6">
                    ou cliquez pour sélectionner des fichiers
                  </p>
                  <Button className="text-white btn-primary">
                    Choisir des fichiers
                  </Button>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".pdf,application/pdf"
                    onChange={(e) => handleFileSelect(e.target.files)}
                    className="hidden"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Files List */}
          {files.length > 0 && !isComplete && (
            <Card className="bg-white border-white mb-8 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <File className="w-5 h-5" />
                  Fichiers sélectionnés ({files.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {files.map((file, index) => (
                    <div 
                      key={file.id}
                      className="border-violet-200 flex items-center justify-between p-4 bg-gray-50 rounded-lg border hover:bg-gray-100 transition-colors duration-200"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                          <File className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                          <div className="font-medium text-navy-900">{file.name}</div>
                          <div className="text-sm text-gray-500">{file.size}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500 bg-white px-2 py-1 rounded">
                          #{index + 1}
                        </span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => moveFile(file.id, 'up')}
                          disabled={index === 0}
                          className="bg-white border-white text-green-700 hover:text-green-700 hover:bg-green-50"
                        >
                          ↑
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => moveFile(file.id, 'down')}
                          disabled={index === files.length - 1}
                          className="bg-white border-white text-red-700 hover:text-red-700 hover:bg-red-50"
                        >
                          ↓
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => removeFile(file.id)}
                          className="bg-white border-white text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Processing */}
          {isProcessing && (
            <Card className="bg-white mb-8 shadow-lg">
              <CardContent className="bg-white p-8 text-center">
                <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-violet-600" />
                <h3 className="text-xl font-semibold text-navy-900 mb-4">
                  Fusion en cours...
                </h3>
                <div className="max-w-md mx-auto">
                  <Progress value={progress} className="mb-2" />
                  <p className="text-sm text-gray-600">{progress}% terminé</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          {!isComplete && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={mergePDFs}
                disabled={files.length < 2 || isProcessing}
                className="text-white btn-primary text-lg px-8 py-4 flex items-center gap-2"
              >
                <Download className="w-5 h-5 text-white" />
                Fusionner les PDFs
              </Button>
              
              <Button
                variant="outline"
                onClick={() => setFiles([])}
                disabled={files.length === 0 || isProcessing}
                className="bg-white text-lg px-8 py-4 border-violet-200 hover:bg-violet-100"
              >
                Effacer tout
              </Button>
            </div>
          )}

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <Card className="bg-white border-violet-200 text-center shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  🔒
                </div>
                <h3 className="font-semibold text-navy-900 mb-2">100% Sécurisé</h3>
                <p className="text-gray-600 text-sm">
                  Vos fichiers sont traités localement et supprimés automatiquement.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-violet-200 text-center shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  ⚡
                </div>
                <h3 className="font-semibold text-navy-900 mb-2">Ultra Rapide</h3>
                <p className="text-gray-600 text-sm">
                  Fusion instantanée grâce à notre technologie optimisée.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-violet-200 text-center shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  💯
                </div>
                <h3 className="font-semibold text-navy-900 mb-2">Gratuit</h3>
                <p className="text-gray-600 text-sm">
                  Aucune inscription requise. Utilisez l'outil gratuitement.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PDFMerger;
