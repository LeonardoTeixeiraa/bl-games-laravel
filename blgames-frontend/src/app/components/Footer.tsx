/**
 * FOOTER COMPONENTE
 * Rodapé estilo Steam com links e redes sociais
 * 
 * PERSONALIZAÇÕES DISPONÍVEIS:
 * - Atualize os links nas seções footerLinks
 * - Modifique os ícones de redes sociais
 * - Altere o copyright text
 */

import { Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react';

export function Footer() {
  
  // ÁREA DE CUSTOMIZAÇÃO: Links do footer
  const footerLinks = {
    platform: [
      { name: 'Sobre Nós', href: '#' },
      { name: 'Carreiras', href: '#' },
      { name: 'Suporte', href: '#' },
      { name: 'Imprensa', href: '#' },
    ],
    community: [
      { name: 'Fóruns', href: '#' },
      { name: 'Workshop', href: '#' },
      { name: 'Transmissões', href: '#' },
      { name: 'Guias', href: '#' },
    ],
    legal: [
      { name: 'Termos de Uso', href: '#' },
      { name: 'Privacidade', href: '#' },
      { name: 'Cookies', href: '#' },
      { name: 'Legal', href: '#' },
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' },
    { icon: Mail, href: '#', label: 'Email' },
  ];

  return (
    <footer className="bg-[#171a21] border-t border-[#00ccff]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* GRID DE LINKS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* COLUNA LOGO E DESCRIÇÃO */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-[#00ccff] to-[#ff00ff] bg-clip-text text-transparent font-['Montserrat']">
              GAMER PORTFOLIO
            </h3>
            <p className="text-gray-400 text-sm font-['Roboto'] leading-relaxed">
              Sua plataforma definitiva para descobrir, jogar e colecionar os melhores jogos.
            </p>
          </div>

          {/* COLUNA PLATAFORMA */}
          <div>
            <h4 className="text-white font-bold mb-4 font-['Montserrat']">Plataforma</h4>
            <ul className="space-y-2">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-gray-400 hover:text-[#00ccff] transition-colors text-sm font-['Roboto']"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUNA COMUNIDADE */}
          <div>
            <h4 className="text-white font-bold mb-4 font-['Montserrat']">Comunidade</h4>
            <ul className="space-y-2">
              {footerLinks.community.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-gray-400 hover:text-[#00ccff] transition-colors text-sm font-['Roboto']"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUNA LEGAL */}
          <div>
            <h4 className="text-white font-bold mb-4 font-['Montserrat']">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-gray-400 hover:text-[#00ccff] transition-colors text-sm font-['Roboto']"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* SEPARADOR */}
        <div className="border-t border-[#00ccff]/20 pt-8">
          
          {/* REDES SOCIAIS E COPYRIGHT */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            
            {/* REDES SOCIAIS */}
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="p-2 bg-[#1b2838] border border-[#00ccff]/30 rounded-lg hover:bg-[#00ccff]/20 hover:border-[#00ccff] transition-all hover:scale-110"
                  >
                    <IconComponent className="h-5 w-5 text-[#00ccff]" />
                  </a>
                );
              })}
            </div>

            {/* COPYRIGHT */}
            <p className="text-gray-500 text-sm font-['Roboto'] text-center md:text-right">
              © 2026 Gamer Portfolio. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
