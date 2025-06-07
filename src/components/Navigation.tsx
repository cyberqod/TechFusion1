
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const tools = [
    { name: 'Fusion PDF', path: '/pdf-merger', description: 'Combiner plusieurs PDFs', icon: '📄' },
    { name: 'QR Code', path: '/qr-generator', description: 'Générer des QR codes', icon: '📱' },
    { name: 'Images', path: '/image-optimizer', description: 'Optimiser vos images', icon: '🖼️' },
    { name: 'Données', path: '/data-converter', description: 'Convertir JSON/CSV/XML', icon: '🔄' },
    { name: 'Performance', path: '/performance-analyzer', description: 'Analyser votre site', icon: '📊' },
  ];

  const navLinks = [
    { name: 'Accueil', href: '/' },
    { name: 'À propos', href: '/#about' },
    { name: 'Contact', href: '/#contact' },
  ];

  const isActiveLink = (path: string) => {
    if (path === '/') {
      return location.pathname === '/' && !location.hash;
    }
    if (path.includes('#')) {
      return location.hash === path.split('#')[1] ? `#${path.split('#')[1]}` : '';
    }
    return location.pathname === path;
  };

  return (
    <nav className={`border-white fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-xl shadow-xl border-b border-gray-100/50' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo avec animation */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-violet-600 via-cyan-500 to-violet-700 rounded-xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-xl group-hover:shadow-violet-500/25">
                <span className="text-white font-bold text-sm">TF</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-cyan-500 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"></div>
            </div>
            <span className={`font-bold text-xl transition-all duration-300 group-hover:scale-105 ${
              isScrolled ? 'text-navy-900' : 'text-white'
            }`}>
              TechFusion Agency
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`relative px-4 py-2 font-medium transition-all duration-300 rounded-lg group ${
                  isScrolled ? 'text-gray-700' : 'text-white/90'
                } ${
                  isActiveLink(link.href) ? 'text-violet-600' : ''
                }`}
                onMouseEnter={() => setHoveredLink(link.name)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <span className="relative z-10">{link.name}</span>
                
                {/* Hover effect background */}
                <div className={`absolute inset-0 rounded-lg transition-all duration-300 ${
                  hoveredLink === link.name 
                    ? isScrolled 
                      ? 'bg-violet-50 scale-105' 
                      : 'bg-white/10 scale-105' 
                    : 'scale-95 opacity-0'
                }`} />
                
                {/* Active indicator */}
                {isActiveLink(link.href) && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-violet-600 to-cyan-500 rounded-full animate-scale-in" />
                )}
                
                {/* Hover underline */}
                <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-600 to-cyan-500 rounded-full transform origin-left transition-transform duration-300 ${
                  hoveredLink === link.name ? 'scale-x-100' : 'scale-x-0'
                }`} />
              </Link>
            ))}

            {/* Tools dropdown avec animations */}
            <div className="relative">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className={`${
                      isScrolled ? 'text-gray-700' : 'text-white/90'
                    } bg-transparent hover:bg-transparent focus:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent px-4 py-2 rounded-lg transition-all duration-300 group`}>
                      <span>Outils</span>
                      <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className='bg-white'>
                      <div className="bg-white borber-white w-[450px] p-2">
                        <div className="bg-white borber-white grid gap-1">
                          {tools.map((tool, index) => (
                            <Link
                              key={tool.path}
                              to={tool.path}
                              className="bg-white borber-white-500 group flex items-center p-3 rounded-lg hover:bg-violet-50 transition-all duration-300 hover:scale-105 hover:shadow-md"
                              style={{ animationDelay: `${index * 50}ms` }}
                            >
                              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-violet-100 to-cyan-100 group-hover:from-violet-200 group-hover:to-cyan-200 transition-all duration-300 mr-3">
                                <span className="text-xl group-hover:scale-110 transition-transform duration-300">{tool.icon}</span>
                              </div>
                              <div className="flex-1">
                                <div className="font-medium text-gray-900 group-hover:text-violet-600 transition-colors duration-300">{tool.name}</div>
                                <div className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">{tool.description}</div>
                              </div>
                              <div className="opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                                <ChevronDown className="h-4 w-4 rotate-[-90deg] text-violet-500" />
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* CTA Button avec animations */}
            <Button 
              className={`text-white-900 border-white relative overflow-hidden group ${
                isScrolled 
                  ? 'btn-primary' 
                  : 'bg-white/20 border border-white/30 hover:bg-white/30 text-white'
              } transition-all duration-300 hover:scale-105 hover:shadow-xl`}
              asChild
            >
              <Link to="/pdf-merger">
                <span className="relative z-10">Essayer FusionPDF</span>
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </Button>
          </div>

          {/* Mobile menu button avec animation */}
          <button
            className={`md:hidden p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
              isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="relative w-6 h-6">
              <Menu className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0 rotate-180 scale-50' : 'opacity-100 rotate-0 scale-100'
              }`} />
              <X className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-180 scale-50'
              }`} />
            </div>
          </button>
        </div>

        {/* Mobile Navigation avec animations */}
        <div className={`md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-xl transition-all duration-500 ease-out ${
          isMobileMenuOpen 
            ? 'opacity-100 visible transform translate-y-0' 
            : 'opacity-0 invisible transform -translate-y-4'
        }`}>
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                to={link.href}
                className={`block py-3 px-4 text-gray-700 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-md transform ${
                  isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="font-medium">{link.name}</span>
                {isActiveLink(link.href) && (
                  <div className="w-2 h-2 bg-gradient-to-r from-violet-600 to-cyan-500 rounded-full mt-1" />
                )}
              </Link>
            ))}
            
            <div className="border-t pt-4 mt-4">
              <div className="text-sm font-medium text-gray-500 px-4 py-2 mb-2">Outils</div>
              {tools.map((tool, index) => (
                <Link
                  key={tool.path}
                  to={tool.path}
                  className={`flex items-center py-3 px-4 text-gray-700 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-all duration-300 hover:scale-105 group transform ${
                    isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                  }`}
                  style={{ transitionDelay: `${(navLinks.length + index) * 100}ms` }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="text-lg mr-3 group-hover:scale-110 transition-transform duration-300">{tool.icon}</span>
                  <span className="font-medium">{tool.name}</span>
                </Link>
              ))}
            </div>
            
            <Button 
              className={`w-full btn-primary mt-6 hover:scale-105 transition-all duration-300 transform ${
                isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
              style={{ transitionDelay: `${(navLinks.length + tools.length) * 100}ms` }}
              asChild
            >
              <Link to="/pdf-merger" onClick={() => setIsMobileMenuOpen(false)}>
                <span>Essayer FusionPDF</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
