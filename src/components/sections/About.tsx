
import { Button } from '@/components/ui/button';

const About = () => {
  const stats = [
    { number: '2+', label: 'Utilisateurs satisfaits' },
    { number: '100+', label: 'Fichiers traités' },
    { number: '99.9%', label: 'Temps de disponibilité' },
    { number: '24/7', label: 'Support technique' }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="section-fade">
            <h2 className="text-4xl md:text-5xl font-bold text-navy-900 mb-6">
              À propos de <span className="gradient-text">TechFusion Agency</span>
            </h2>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                <strong className="text-navy-900">TechFusion</strong> est une agence tech innovante 
                spécialisée dans le développement d'outils en ligne modernes et performants. 
                Notre mission est de simplifier les tâches quotidiennes des professionnels 
                grâce à des solutions technologiques élégantes et intuitives.
              </p>
              <p>
                Fondée par une équipe d'experts passionnés, nous combinons design moderne, 
                performance technique et expérience utilisateur exceptionnelle pour créer 
                des outils qui font vraiment la différence dans votre workflow.
              </p>
              <p>
                Sécurité, rapidité et simplicité sont au cœur de notre philosophie. 
                Tous nos outils sont conçus pour être accessibles à tous, 
                des débutants aux experts techniques.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button className=" text-white-600 btn-primary">
                Nous contacter
              </Button>
              <Button variant="outline" className="bg-white border-violet-200 text-violet-600 hover:bg-violet-50">
                Voir nos projets
              </Button>
            </div>
          </div>

          {/* Visual Element */}
          <div className="section-fade">
            <div className="relative">
              {/* Main card */}
              <div className="glass-effect rounded-2xl p-8 relative z-10 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-cyan-500 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold">TF</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-navy-900">TechFusion Agency</h3>
                      <p className="text-gray-600">Innovation & Excellence</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Satisfaction client</span>
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-gold-500">⭐</span>
                        ))}
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-violet-500 to-cyan-500 h-2 rounded-full w-[96%]"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Background elements */}
              <div className="absolute top-8 -right-4 w-32 h-32 bg-gradient-to-br from-violet-200 to-cyan-200 rounded-2xl opacity-60 animate-float" />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-br from-cyan-200 to-violet-200 rounded-2xl opacity-60 animate-float" style={{ animationDelay: '2s' }} />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 section-fade">
          {stats.map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
