
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-violet-900 to-navy-800 relative overflow-hidden">
      <Navigation />
      
      {/* Background elements */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      <div className="absolute top-20 left-10 w-20 h-20 bg-violet-500/20 rounded-full blur-xl animate-float" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-cyan-500/20 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }} />
      
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-8xl md:text-9xl font-bold gradient-text mb-4">
              404
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Page introuvable
            </h2>
            <p className="text-xl text-white/80 leading-relaxed mb-8">
              Oups ! La page que vous cherchez semble avoir disparu dans le cyberespace. 
              Ne vous inquiétez pas, même les meilleurs développeurs se perdent parfois.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="btn-primary text-lg px-8 py-4" asChild>
              <Link to="/">
                Retour à l'accueil
              </Link>
            </Button>
            
            <Button size="lg" variant="outline" className="btn-secondary text-lg px-8 py-4" asChild>
              <Link to="/pdf-merger">
                Essayer nos outils
              </Link>
            </Button>
          </div>
          
          <div className="mt-12 text-white/60">
            <p className="text-sm">
              Erreur rencontrée sur : <code className="bg-white/10 px-2 py-1 rounded font-mono">{location.pathname}</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
