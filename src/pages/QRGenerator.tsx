
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Download, QrCode } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import Navigation from '@/components/Navigation';

const QRGenerator = () => {
  const [text, setText] = useState('');
  const [size, setSize] = useState('200');
  const [errorLevel, setErrorLevel] = useState('M');
  const [qrCode, setQrCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateQR = async () => {
    if (!text.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer du texte ou une URL",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      // Utilisation de l'API QR Server (gratuite)
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}&ecc=${errorLevel}`;
      setQrCode(qrUrl);
      
      toast({
        title: "QR Code généré !",
        description: "Votre QR code a été créé avec succès"
      });
    } catch (error) {
      console.error('Erreur lors de la génération:', error);
      toast({
        title: "Erreur",
        description: "Impossible de générer le QR code",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadQR = () => {
    if (!qrCode) return;
    
    const link = document.createElement('a');
    link.href = qrCode;
    link.download = 'qrcode.png';
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 to-white">
      <Navigation />
      
      <div className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                <QrCode className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-navy-900 mb-4">
                Générateur <span className="gradient-text">QR Code</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Créez des QR codes personnalisés pour vos liens, textes ou données en quelques clics
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Configuration */}
            <Card className="bg-white border-white">
              <CardHeader>
                <CardTitle>Configuration du QR Code</CardTitle>
                <CardDescription className="text-gray-500">
                  Personnalisez votre QR code selon vos besoins
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="text">Contenu du QR Code</Label>
                  <Textarea
                    id="text"
                    placeholder="Entrez votre texte, URL, numéro de téléphone..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows={4}
                    className="bg-gray-100 border-white mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="size">Taille (pixels)</Label>
                  <Select value={size} onValueChange={setSize}>
                    <SelectTrigger className="bg-gray-100 border-white mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-white">
                      <SelectItem value="150">150x150</SelectItem>
                      <SelectItem value="200">200x200</SelectItem>
                      <SelectItem value="300">300x300</SelectItem>
                      <SelectItem value="400">400x400</SelectItem>
                      <SelectItem value="500">500x500</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="errorLevel">Niveau de correction d'erreur</Label>
                  <Select value={errorLevel} onValueChange={setErrorLevel}>
                    <SelectTrigger className="bg-gray-100 border-white mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-white">
                      <SelectItem value="L">Faible (7%)</SelectItem>
                      <SelectItem value="M">Moyen (15%)</SelectItem>
                      <SelectItem value="Q">Élevé (25%)</SelectItem>
                      <SelectItem value="H">Très élevé (30%)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={generateQR}
                  disabled={isGenerating || !text.trim()}
                  className="text-white w-full btn-primary"
                >
                  {isGenerating ? 'Génération...' : 'Générer le QR Code'}
                </Button>
              </CardContent>
            </Card>

            {/* Résultat */}
            <Card className="bg-white border-white">
              <CardHeader>
                <CardTitle>Aperçu du QR Code</CardTitle>
                <CardDescription>
                  Votre QR code généré apparaîtra ici
                </CardDescription>
              </CardHeader>
              <CardContent>
                {qrCode ? (
                  <div className="text-center space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg inline-block">
                      <img 
                        src={qrCode} 
                        alt="QR Code généré" 
                        className="max-w-full h-auto"
                      />
                    </div>
                    
                    <Button 
                      onClick={downloadQR}
                      className="w-full"
                      variant="outline"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Télécharger PNG
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-400">
                    <QrCode className="w-16 h-16 mx-auto mb-4 opacity-30" />
                    <p>Votre QR code apparaîtra ici après génération</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRGenerator;
