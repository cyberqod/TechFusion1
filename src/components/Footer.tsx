
import { Link } from 'react-router-dom';
import { TrendingUp, Heart, Phone, ChartAreaIcon, PhoneCallIcon } from "lucide-react";


const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    'Outils': [
      { name: 'Fusion PDF', path: '/pdf-merger' },
      { name: 'Optimiseur d\'images', path: '/image-optimizer' },
      { name: 'Convertisseur de données', path: '/data-converter' },
      { name: 'Générateur QR', path: '/qr-generator' }
    ],
    'Entreprise': [
      { name: 'À propos', path: '/#about' },
      { name: 'Contact', path: '/#contact' },
      { name: 'Blog', path: '/blog' },
      { name: 'Carrières', path: '/careers' }
    ],
    'Support': [
      { name: 'Documentation', path: '/docs' },
      { name: 'FAQ', path: '/faq' },
      { name: 'Support technique', path: '/support' },
      { name: 'Status', path: '/status' }
    ],
    'Légal': [
      { name: 'Conditions d\'utilisation', path: '/terms' },
      { name: 'Politique de confidentialité', path: '/privacy' },
      { name: 'Cookies', path: '/cookies' },
      { name: 'RGPD', path: '/gdpr' }
    ]
  };

  return (
    <footer className="bg-navy-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-6 group">
              <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-cyan-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <span className="text-white font-bold">FT</span>
              </div>
              <span className="font-bold text-2xl">TechFusion</span>
            </Link>
            <p className="text-gray-300 leading-relaxed mb-6">
              Simplifiez vos tâches quotidiennes avec nos outils en ligne modernes, 
              rapides et sécurisés. L'innovation au service de votre productivité.
            </p>
            <div className="text-sm text-gray-400">
              © {currentYear} TechFusion. Tous droits réservés.
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-lg mb-4 text-white">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.path}
                      className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-1 text-gray-400 text-sm mb-4 md:mb-0">
            <span>Développé par</span>
            <span className='text-xl font-bold bg-gradient-to-r from-yellow-500 to-orange-600 bg-clip-text text-transparent'> Léonardo. </span>
            <PhoneCallIcon className="h-6 w-6 text-blue-400" />
            <span><a className="text-xl font-bold bg-gradient-to-r from-yellow-500 to-orange-600 bg-clip-text text-transparent" href="https://wa.me/+22896938284">+228 96938284</a></span>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-200">
              <span className="sr-only">LinkedIn</span>
              💼
            </a>
            <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-200">
              <span className="sr-only">Twitter</span>
              🐦
            </a>
            <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-200">
              <span className="sr-only">GitHub</span>
              💻
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
