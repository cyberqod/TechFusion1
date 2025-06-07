
import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Download, Upload, ImageIcon, Trash2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import Navigation from '@/components/Navigation';

interface ImageFile {
  file: File;
  preview: string;
  optimized?: string;
  originalSize: number;
  optimizedSize?: number;
}

const ImageOptimizer = () => {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [quality, setQuality] = useState([80]);
  const [format, setFormat] = useState('jpeg');
  const [maxWidth, setMaxWidth] = useState('1920');
  const [isOptimizing, setIsOptimizing] = useState(false);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const newImage: ImageFile = {
            file,
            preview: event.target?.result as string,
            originalSize: file.size
          };
          setImages(prev => [...prev, newImage]);
        };
        reader.readAsDataURL(file);
      }
    });
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const newImage: ImageFile = {
            file,
            preview: event.target?.result as string,
            originalSize: file.size
          };
          setImages(prev => [...prev, newImage]);
        };
        reader.readAsDataURL(file);
      }
    });
  }, []);

  const optimizeImages = async () => {
    if (images.length === 0) return;
    
    setIsOptimizing(true);
    
    try {
      const optimizedImages = await Promise.all(
        images.map(async (imageData) => {
          return new Promise<ImageFile>((resolve) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            
            img.onload = () => {
              const maxWidthNum = parseInt(maxWidth);
              const ratio = Math.min(maxWidthNum / img.width, maxWidthNum / img.height);
              
              canvas.width = img.width * ratio;
              canvas.height = img.height * ratio;
              
              ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
              
              canvas.toBlob((blob) => {
                if (blob) {
                  const optimizedUrl = URL.createObjectURL(blob);
                  resolve({
                    ...imageData,
                    optimized: optimizedUrl,
                    optimizedSize: blob.size
                  });
                }
              }, `image/${format}`, quality[0] / 100);
            };
            
            img.src = imageData.preview;
          });
        })
      );
      
      setImages(optimizedImages);
      
      toast({
        title: "Images optimisées !",
        description: `${optimizedImages.length} image(s) ont été optimisées avec succès`
      });
    } catch (error) {
      console.error('Erreur lors de l\'optimisation:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'optimiser les images",
        variant: "destructive"
      });
    } finally {
      setIsOptimizing(false);
    }
  };

  const downloadImage = (imageData: ImageFile, index: number) => {
    if (!imageData.optimized) return;
    
    const link = document.createElement('a');
    link.href = imageData.optimized;
    link.download = `optimized_${imageData.file.name}`;
    link.click();
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    return (bytes / 1024 / 1024).toFixed(2) + ' MB';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 to-white">
      <Navigation />
      
      <div className="pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <Link 
              to="/" 
              className="inline-flex items-center text-violet-600 hover:text-violet-700 mb-6 group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
              Retour à l'accueil
            </Link>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                <ImageIcon className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-navy-900 mb-4">
                Optimiseur <span className="gradient-text">d'Images</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Réduisez la taille de vos images sans perdre en qualité pour un web plus rapide
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Upload et Configuration */}
            <div className="lg:col-span-1 space-y-6">
              <Card className='bg-white border-white'>
                <CardHeader>
                  <CardTitle>Ajouter des images</CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition-colors"
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    onClick={() => document.getElementById('file-input')?.click()}
                  >
                    <Upload className="w-8 h-8 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-600 mb-2">Cliquez ou glissez vos images ici</p>
                    <p className="text-sm text-gray-400">PNG, JPG, WebP jusqu'à 10MB</p>
                  </div>
                  <input
                    id="file-input"
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileSelect}
                  />
                </CardContent>
              </Card>

              <Card className='bg-white border-white'>
                <CardHeader>
                  <CardTitle>Paramètres</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Qualité: {quality[0]}%</Label>
                    <Slider
                      value={quality}
                      onValueChange={setQuality}
                      max={100}
                      min={10}
                      step={5}
                      className="bg-gray-200 mt-2"
                    />
                  </div>

                  <div>
                    <Label>Format de sortie</Label>
                    <Select value={format} onValueChange={setFormat}>
                      <SelectTrigger className="bg-gray-100 border-white mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className='bg-white border-white'>
                        <SelectItem value="jpeg">JPEG</SelectItem>
                        <SelectItem value="png">PNG</SelectItem>
                        <SelectItem value="webp">WebP</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Largeur max</Label>
                    <Select value={maxWidth} onValueChange={setMaxWidth}>
                      <SelectTrigger className="bg-gray-100 border-white mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className='bg-white border-white'>
                        <SelectItem value="800">800px</SelectItem>
                        <SelectItem value="1200">1200px</SelectItem>
                        <SelectItem value="1920">1920px</SelectItem>
                        <SelectItem value="2560">2560px</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    onClick={optimizeImages}
                    disabled={isOptimizing || images.length === 0}
                    className="text-white w-full btn-primary"
                  >
                    {isOptimizing ? 'Optimisation...' : 'Optimiser les images'}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Liste des images */}
            <div className="lg:col-span-2">
              <Card className='bg-white border-white'>
                <CardHeader>
                  <CardTitle>Images ({images.length})</CardTitle>
                  <CardDescription className='text-gray-500'>
                    Gérez vos images et téléchargez les versions optimisées
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {images.length === 0 ? (
                    <div className="text-center py-12 text-gray-400">
                      <ImageIcon className="border-white w-16 h-16 mx-auto mb-4 opacity-30" />
                      <p>Aucune image ajoutée</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {images.map((imageData, index) => (
                        <div key={index} className="flex items-center gap-4 p-4 border-violet-300 rounded-lg">
                          <img
                            src={imageData.preview}
                            alt={imageData.file.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                          
                          <div className="flex-1">
                            <p className="font-medium">{imageData.file.name}</p>
                            <div className="text-sm text-gray-500">
                              <span>Original: {formatFileSize(imageData.originalSize)}</span>
                              {imageData.optimizedSize && (
                                <>
                                  <span className="mx-2">→</span>
                                  <span className="text-green-600">
                                    Optimisé: {formatFileSize(imageData.optimizedSize)}
                                  </span>
                                  <span className="ml-2 text-green-600">
                                    (-{Math.round((1 - imageData.optimizedSize / imageData.originalSize) * 100)}%)
                                  </span>
                                </>
                              )}
                            </div>
                          </div>

                          <div className="flex gap-2">
                            {imageData.optimized && (
                              <Button
                                size="sm"
                                onClick={() => downloadImage(imageData, index)}
                              >
                                <Download className="w-4 h-4" />
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => removeImage(index)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageOptimizer;
