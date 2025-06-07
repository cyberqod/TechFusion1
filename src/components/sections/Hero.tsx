
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Tech Background */}
      <div className="absolute inset-0 tech-gradient">
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-violet-500/20 rounded-full blur-xl animate-float" />
        <div className="absolute top-40 right-20 w-32 h-32 bg-cyan-500/20 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-violet-400/20 rounded-full blur-xl animate-float" style={{ animationDelay: '4s' }} />
        
        {/* Code-like overlay */}
        <div className="absolute inset-0 opacity-10">
          <pre className="text-xs text-white/50 p-8 code-font leading-relaxed">
{`function createInnovation() {
  const tech = new TechFlow();
  return tech
    .addTool('PDF Merger')
    .addTool('Image Optimizer')
    .addTool('Data Converter')
    .deploy();
}

const future = createInnovation();
console.log('Building the future...');`}
          </pre>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            Outils Tech
            <br />
            <span className="gradient-text">Professionnels</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Simplifiez vos tâches quotidiennes avec nos outils en ligne modernes, 
            rapides et sécurisés. Fusionnez vos PDF, optimisez vos images et bien plus encore.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button size="lg" className=" text-white btn-primary text-lg px-8 py-4" asChild>
              <Link to="/pdf-merger">
                Commencer maintenant
              </Link>
            </Button>
            
            <Button size="lg" variant="outline" className="bg-white text-violet-600 btn-secondary border-violet-200 text-lg px-8 py-4 hover:bg-violet-100" asChild>
              <Link to="#tools">
                Découvrir nos outils
              </Link>
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full">
            <div className="w-1 h-3 bg-white/50 rounded-full mx-auto mt-2 animate-pulse"></div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6 text-white/60" />
        </div> */}
      </div> 
    </section>
  );
};

export default Hero;
