
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const Tools = () => {
  const tools = [
    {
      title: 'Fusion PDF',
      description: 'Combinez plusieurs fichiers PDF en un seul document facilement et rapidement.',
      icon: '📄',
      path: '/pdf-merger',
      gradient: 'from-violet-500 to-purple-600',
      available: true
    },
    {
      title: 'Optimiseur d\'images',
      description: 'Réduisez la taille de vos images sans perdre en qualité pour un web plus rapide.',
      icon: '🖼️',
      path: '/image-optimizer',
      gradient: 'from-cyan-500 to-blue-600',
      available: true
    },
    {
      title: 'Convertisseur de données',
      description: 'Convertissez vos fichiers entre différents formats (JSON, CSV, XML) instantanément.',
      icon: '🔄',
      path: '/data-converter',
      gradient: 'from-emerald-500 to-green-600',
      available: true
    },
    {
      title: 'Générateur QR Code',
      description: 'Créez des QR codes personnalisés pour vos liens, textes ou données.',
      icon: '📱',
      path: '/qr-generator',
      gradient: 'from-gold-500 to-amber-600',
      available: true
    },
    {
      title: 'Éditeur de texte collaboratif',
      description: 'Travaillez en équipe sur vos documents avec synchronisation en temps réel.',
      icon: '✍️',
      path: '/text-editor',
      gradient: 'from-pink-500 to-rose-600',
      available: false
    },
    {
      title: 'Analyseur de performance',
      description: 'Analysez les performances de votre site web et obtenez des recommandations.',
      icon: '📊',
      path: '/performance-analyzer',
      gradient: 'from-indigo-500 to-purple-600',
      available: true
    }
  ];

  return (
    <section id="tools" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 section-fade">
          <h2 className="text-4xl md:text-5xl font-bold text-navy-900 mb-6">
            Nos Outils <span className="gradient-text">Professionnels</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Une suite d'outils modernes conçus pour optimiser votre productivité 
            et simplifier votre workflow quotidien.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 section-fade">
          {tools.map((tool, index) => (
            <Card 
              key={tool.title}
              className={`group card-hover border-0 bg-white shadow-lg ${!tool.available ? 'opacity-75' : ''}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="pb-4">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {tool.icon}
                </div>
                <CardTitle className="text-xl font-bold text-navy-900 flex items-center gap-2">
                  {tool.title}
                  {!tool.available && (
                    <span className="text-xs bg-gold-100 text-gold-800 px-2 py-1 rounded-full">
                      Bientôt
                    </span>
                  )}
                </CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  {tool.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                {tool.available ? (
                  <Button className="w-full btn-primary text-white-600" asChild>
                    <Link to={tool.path}>
                      Utiliser l'outil
                    </Link>
                  </Button>
                ) : (
                  <Button className="w-full bg-blue-100 text-gray-600" variant="outline" disabled>
                    Disponible prochainement
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tools;
