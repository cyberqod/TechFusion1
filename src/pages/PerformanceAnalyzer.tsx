
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Search, Globe, Clock, Zap, Shield, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import Navigation from '@/components/Navigation';

interface PerformanceMetrics {
  url: string;
  score: number;
  loadTime: number;
  pageSize: number;
  requests: number;
  metrics: {
    fcp: number;
    lcp: number;
    cls: number;
    fid: number;
  };
  recommendations: string[];
  security: {
    https: boolean;
    headers: boolean;
    vulnerabilities: number;
  };
}

const PerformanceAnalyzer = () => {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<PerformanceMetrics | null>(null);

  const analyzeWebsite = async () => {
    if (!url.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer une URL valide",
        variant: "destructive"
      });
      return;
    }

    // Validation URL basique
    try {
      new URL(url);
    } catch {
      toast({
        title: "URL invalide",
        description: "Veuillez entrer une URL valide (ex: https://example.com)",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);

    // Simulation d'analyse (dans un vrai cas, vous utiliseriez des APIs comme PageSpeed Insights)
    setTimeout(() => {
      const mockResults: PerformanceMetrics = {
        url,
        score: Math.floor(Math.random() * 40) + 60, // Score entre 60-100
        loadTime: Math.random() * 3 + 1, // Entre 1-4 secondes
        pageSize: Math.floor(Math.random() * 2000) + 500, // Entre 500KB-2.5MB
        requests: Math.floor(Math.random() * 50) + 20, // Entre 20-70 requêtes
        metrics: {
          fcp: Math.random() * 2 + 0.5, // First Contentful Paint
          lcp: Math.random() * 3 + 1, // Largest Contentful Paint
          cls: Math.random() * 0.2, // Cumulative Layout Shift
          fid: Math.random() * 200 + 50 // First Input Delay
        },
        recommendations: [
          "Optimiser les images (format WebP, compression)",
          "Réduire le JavaScript non utilisé",
          "Utiliser un CDN pour les ressources statiques",
          "Activer la compression Gzip/Brotli",
          "Minimiser les requêtes HTTP",
          "Optimiser les polices web",
          "Améliorer le cache navigateur"
        ].slice(0, Math.floor(Math.random() * 4) + 3),
        security: {
          https: Math.random() > 0.2,
          headers: Math.random() > 0.3,
          vulnerabilities: Math.floor(Math.random() * 3)
        }
      };

      setResults(mockResults);
      setIsAnalyzing(false);

      toast({
        title: "Analyse terminée !",
        description: "Consultez les résultats et recommandations ci-dessous"
      });
    }, 3000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 90) return 'default';
    if (score >= 70) return 'secondary';
    return 'destructive';
  };

  const getMetricStatus = (value: number, thresholds: [number, number]) => {
    if (value <= thresholds[0]) return { icon: CheckCircle, color: 'text-green-600', label: 'Bon' };
    if (value <= thresholds[1]) return { icon: AlertCircle, color: 'text-yellow-600', label: 'Moyen' };
    return { icon: XCircle, color: 'text-red-600', label: 'Mauvais' };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
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
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-navy-900 mb-4">
                Analyseur <span className="gradient-text">de Performance</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Analysez les performances de votre site web et obtenez des recommandations d'optimisation
              </p>
            </div>
          </div>

          {/* Form */}
          <Card className="bg-white border-violet-100 mb-8">
            <CardHeader>
              <CardTitle>Analyser un site web</CardTitle>
              <CardDescription className='text-gray-500'>
                Entrez l'URL de votre site pour obtenir un rapport détaillé
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label htmlFor="url">URL du site web</Label>
                  <Input
                    id="url"
                    type="url"
                    placeholder="https://example.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="bg-gray-100 border-white mt-2"
                  />
                </div>
                <div className="flex items-end">
                  <Button
                    onClick={analyzeWebsite}
                    disabled={isAnalyzing}
                    className="text-white btn-primary"
                  >
                    {isAnalyzing ? (
                      <>
                        <Clock className="w-4 h-4 mr-2 animate-spin" />
                        Analyse...
                      </>
                    ) : (
                      <>
                        <Search className="text-white w-4 h-4 mr-2" />
                        Analyser
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Loading */}
          {isAnalyzing && (
            <Card className="bg-white border-violet-100 mb-8">
              <CardContent className="py-12">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-white animate-pulse" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Analyse en cours...</h3>
                  <p className="text-gray-600 mb-4">Nous testons votre site web</p>
                  <Progress value={66} className="w-64 mx-auto" />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Results */}
          {results && (
            <div className="space-y-8">
              {/* Score global */}
              <Card className="bg-white border-violet-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    Score de performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className={`text-6xl font-bold mb-2 ${getScoreColor(results.score)}`}>
                      {results.score}
                    </div>
                    <Badge variant={getScoreBadge(results.score)} className="mb-4">
                      {results.score >= 90 ? 'Excellent' : 
                       results.score >= 70 ? 'Bon' : 'À améliorer'}
                    </Badge>
                    <p className="text-gray-600">{results.url}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Métriques détaillées */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-white border-violet-100">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Temps de chargement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{results.loadTime.toFixed(2)}s</div>
                  </CardContent>
                </Card>

                <Card className="bg-white border-violet-100">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Taille de la page</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{(results.pageSize / 1024).toFixed(1)} MB</div>
                  </CardContent>
                </Card>

                <Card className="bg-white border-violet-100">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Requêtes HTTP</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{results.requests}</div>
                  </CardContent>
                </Card>

                <Card className="bg-white border-violet-100">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Score sécurité</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      <div className="text-2xl font-bold">
                        {results.security.https && results.security.headers ? 'Sécurisé' : 'À vérifier'}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Core Web Vitals */}
              <Card className="bg-white border-violet-100">
                <CardHeader>
                  <CardTitle>Core Web Vitals</CardTitle>
                  <CardDescription>
                    Métriques clés de performance utilisateur
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      { name: 'FCP', value: results.metrics.fcp, unit: 's', thresholds: [1.8, 3] as [number, number], desc: 'First Contentful Paint' },
                      { name: 'LCP', value: results.metrics.lcp, unit: 's', thresholds: [2.5, 4] as [number, number], desc: 'Largest Contentful Paint' },
                      { name: 'CLS', value: results.metrics.cls, unit: '', thresholds: [0.1, 0.25] as [number, number], desc: 'Cumulative Layout Shift' },
                      { name: 'FID', value: results.metrics.fid, unit: 'ms', thresholds: [100, 300] as [number, number], desc: 'First Input Delay' }
                    ].map((metric) => {
                      const status = getMetricStatus(metric.value, metric.thresholds);
                      const StatusIcon = status.icon;
                      
                      return (
                        <div key={metric.name} className="text-center">
                          <div className="flex items-center justify-center gap-2 mb-2">
                            <StatusIcon className={`w-5 h-5 ${status.color}`} />
                            <span className="font-semibold">{metric.name}</span>
                          </div>
                          <div className="text-2xl font-bold">
                            {metric.value.toFixed(metric.name === 'CLS' ? 3 : 1)}{metric.unit}
                          </div>
                          <div className="text-sm text-gray-500">{metric.desc}</div>
                          <Badge variant="outline" className={`mt-2 ${status.color}`}>
                            {status.label}
                          </Badge>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Recommandations */}
              <Card className="bg-white border-violet-100">
                <CardHeader>
                  <CardTitle>Recommandations d'optimisation</CardTitle>
                  <CardDescription>
                    Actions prioritaires pour améliorer les performances
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {results.recommendations.map((recommendation, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                          <span className="text-blue-600 text-sm font-medium">{index + 1}</span>
                        </div>
                        <span className="text-gray-700">{recommendation}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Sécurité */}
              <Card className="bg-white border-violet-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Sécurité
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="flex items-center gap-3">
                      {results.security.https ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600" />
                      )}
                      <div>
                        <div className="font-medium">HTTPS</div>
                        <div className="text-sm text-gray-500">
                          {results.security.https ? 'Activé' : 'Non sécurisé'}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {results.security.headers ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600" />
                      )}
                      <div>
                        <div className="font-medium">En-têtes sécurité</div>
                        <div className="text-sm text-gray-500">
                          {results.security.headers ? 'Configurés' : 'Manquants'}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {results.security.vulnerabilities === 0 ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-yellow-600" />
                      )}
                      <div>
                        <div className="font-medium">Vulnérabilités</div>
                        <div className="text-sm text-gray-500">
                          {results.security.vulnerabilities} détectée(s)
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PerformanceAnalyzer;
