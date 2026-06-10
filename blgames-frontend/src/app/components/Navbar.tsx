/**
 * NAVBAR COMPONENTE
 * Barra de navegação fixa no topo estilo Steam
 * 
 * PERSONALIZAÇÕES DISPONÍVEIS:
 * - Altere os links no array 'navLinks'
 * - Substitua o logo text "GAMER PORTFOLIO" por sua marca
 * - Customize cores usando classes Tailwind ou CSS customizado
 */
import { Search, User, Menu, X, LogOut } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ÁREA DE CUSTOMIZAÇÃO: Adicione ou remova links de navegação aqui
  const navLinks = [
    { name: 'Destaques', href: '#destaques' },
    { name: 'Categorias', href: '#categorias' },
    { name: 'Comunidade', href: '#comunidade' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#171a21] border-b border-[#00ccff]/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* LOGO - SUBSTITUA "GAMER PORTFOLIO" pelo seu texto/logo */}
          <div className="flex items-center gap-8">
            <a href="#" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-[#00ccff] to-[#ff00ff] bg-clip-text text-transparent font-['Montserrat']">
                B&L GAMES
              </span>
            </a>

            {/* LINKS DE NAVEGAÇÃO DESKTOP */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-300 hover:text-[#00ccff] transition-colors font-['Roboto'] font-medium"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* BARRA DE BUSCA E ÍCONE DE USUÁRIO */}
          <div className="flex items-center gap-4">
            
            {/* BUSCA - Desktop */}
            <div className="hidden sm:flex items-center bg-[#1b2838] rounded-md px-3 py-2 w-64 border border-[#00ccff]/20 focus-within:border-[#00ccff]/60 transition-colors">
              <Search className="h-4 w-4 text-gray-400 mr-2" />
              <Input
                type="search"
                placeholder="Buscar jogos..."
                className="bg-transparent border-0 text-sm text-gray-300 placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 font-['Roboto']"
              />
            </div>

            {/* ÍCONE DE USUÁRIO */}
   <Button
  variant="ghost"
  size="icon"
  className="rounded-full bg-[#1b2838] hover:bg-[#00ccff]/20 border border-[#00ccff]/30 transition-all"
  onClick={() => {
    const isAdmin = localStorage.getItem("admin") === "true";

    if (isAdmin) {
      if (confirm("Deseja deslogar do painel admin?")) {
        localStorage.removeItem("admin");
        window.location.reload();
      }
      return;
    }

    const senha = prompt("Digite a senha de administrador");

    if (senha === "123456") {
      localStorage.setItem("admin", "true");
      window.location.reload();
    } else if (senha) {
      alert("Senha incorreta!");
    }
  }}
>
  <User className="h-5 w-5 text-[#00ccff]" />
</Button>


            {/* BOTÃO MENU MOBILE */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-gray-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* MENU MOBILE */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2 border-t border-[#00ccff]/20 mt-2 pt-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-3 py-2 text-gray-300 hover:text-[#00ccff] hover:bg-[#1b2838] rounded-md transition-colors font-['Roboto']"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            
            {/* BUSCA MOBILE */}
            <div className="px-3 pt-2">
              <div className="flex items-center bg-[#1b2838] rounded-md px-3 py-2 border border-[#00ccff]/20">
                <Search className="h-4 w-4 text-gray-400 mr-2" />
                <Input
                  type="search"
                  placeholder="Buscar jogos..."
                  className="bg-transparent border-0 text-sm text-gray-300 placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 font-['Roboto']"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
