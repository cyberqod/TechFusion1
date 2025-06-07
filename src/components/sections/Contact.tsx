
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Contact = () => {
  const socialLinks = [
    {
      name: 'LinkedIn',
      url: '#',
      icon: '💼',
      color: 'from-blue-600 to-blue-700'
    },
    {
      name: 'Twitter',
      url: '#',
      icon: '🐦',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      name: 'GitHub',
      url: '#',
      icon: '💻',
      color: 'from-gray-700 to-gray-900'
    },
    {
      name: 'Discord',
      url: '#',
      icon: '💬',
      color: 'from-indigo-500 to-purple-600'
    }
  ];

  const contactMethods = [
    {
      title: 'Email',
      value: 'contact@techfusionagency.com',
      icon: '📧',
      action: 'mailto:cyberqodfirst@proton.me'
    },
    {
      title: 'Téléphone',
      value: '+228 96938284',
      icon: '📞',
      action: 'tel:+22896938284'
    },
    {
      title: 'Support',
      value: 'support@techfusionagency.com',
      icon: '🎧',
      action: 'mailto:cyberqodfirst@proton.me'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-navy-900 to-violet-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 section-fade">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Restons en <span className="gradient-text">Contact</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Une question ? Un projet ? Une suggestion d'amélioration ? 
            Notre équipe est là pour vous accompagner.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Methods */}
          <div className="section-fade">
            <h3 className="text-2xl font-bold text-white mb-8">Nous contacter</h3>
            <div className="space-y-6">
              {contactMethods.map((method) => (
                <Card key={method.title} className="bg-white-500 glass-effect border-white/0 hover:border-white/30 transition-all duration-300 group">
                  <CardContent className="p-6 bg-white-500">
                    <a 
                      href={method.action}
                      className="flex items-center space-x-4 text-white group-hover:text-cyan-300 transition-colors duration-200"
                    >
                      <div className="text-2xl">{method.icon}</div>
                      <div>
                        <div className="font-medium text-white/60">{method.title}</div>
                        <div className="text-lg font-semibold">{method.value}</div>
                      </div>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Social Links & CTA */}
          <div className="section-fade">
            <h3 className="text-2xl font-bold text-white mb-8">Suivez-nous</h3>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {socialLinks.map((social) => (
                <Card key={social.name} className="bg-white-300 glass-effect border-white/20 hover:border-white/30 transition-all duration-300 group card-hover">
                  <CardContent className="p-6 text-center">
                    <a href={social.url} className="block">
                      <div className={`w-12 h-12 mx-auto bg-gradient-to-br ${social.color} rounded-xl flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform duration-200`}>
                        {social.icon}
                      </div>
                      <div className="text-white font-medium group-hover:text-cyan-300 transition-colors duration-200">
                        {social.name}
                      </div>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-white-500 border-white/20 p-8 text-center">
              <CardContent className="p-0">
                <h4 className="text-xl font-bold text-white mb-4">Prêt à commencer ?</h4>
                <p className="text-white/80 mb-6">
                  Rejoignez des milliers d'utilisateurs qui font confiance à FineCode Labs 
                  pour leurs outils professionnels.
                </p>
                <Button className="text-white btn-primary w-full" asChild>
                  <a href="/pdf-merger">Essayer gratuitement</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
