/**
 * NAVBAR COMPONENTE
 * Barra de navegação fixa no topo estilo Steam
 *
 * PERSONALIZAÇÕES DISPONÍVEIS:
 * - Altere os links no array 'navLinks'
 * - Substitua o logo text "GAMER PORTFOLIO" por sua marca
 * - Customize cores usando classes Tailwind ou CSS customizado
 */
import { Search, User, Menu, X, LogOut } from "lucide-react";
import { useState } from "react";
import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [usuarioLogado, setUsuarioLogado] = useState<any>(null);

  // Carrega os dados do usuário do localStorage ao montar
  React.useEffect(() => {
    const loadUsuarioData = () => {
      if (typeof window !== "undefined") {
        // Tenta diferentes variações possíveis da chave
        let storedUsuarioDados =
          localStorage.getItem("usuario_dados") ||
          localStorage.getItem("usuario") ||
          localStorage.getItem("auth_user") ||
          localStorage.getItem("user");

        console.log(
          "[Navbar] Buscando usuario_dados. Chaves no localStorage:",
          Object.keys(localStorage),
        );
        console.log("[Navbar] usuario_dados encontrado:", storedUsuarioDados);

        if (storedUsuarioDados) {
          try {
            const dados = JSON.parse(storedUsuarioDados);
            console.log("[Navbar] Dados parseados:", dados);
            console.log(
              "[Navbar] is_admin value:",
              dados.is_admin,
              "type:",
              typeof dados.is_admin,
            );
            setUsuarioLogado(dados);
          } catch (e) {
            console.error("Erro ao parsear usuario_dados:", e);
            setUsuarioLogado(null);
          }
        }
      }
    };

    loadUsuarioData();

    // Escuta mudanças no localStorage
    const handleStorageChange = (e: StorageEvent) => {
      console.log("[Navbar] Storage mudou:", e.key);
      if (
        e.key === "usuario_dados" ||
        e.key === "usuario" ||
        e.key === "auth_user" ||
        e.key === "user"
      ) {
        loadUsuarioData();
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("storage", handleStorageChange);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("storage", handleStorageChange);
        document.removeEventListener("user-login", loadUsuarioData);
      }
    };
  }, []);

  // ÁREA DE CUSTOMIZAÇÃO: Adicione ou remova links de navegação aqui
  // Usar '/#...' garante navegação para a página principal antes de rolar para a seção
  const navLinks = [
    { name: "Destaques", href: "/#destaques" },
    { name: "Categorias", href: "/#categorias" },
  ];

  // Normaliza diferentes formatos possíveis de `is_admin` ('1', 1, true)
  const eAdmin =
    usuarioLogado &&
    (usuarioLogado.is_admin === 1 ||
      usuarioLogado.is_admin === "1" ||
      usuarioLogado.is_admin === true);

  // Gera a lista final de links (inclui Admin apenas para admins)
  const linksToRender = [...navLinks];
  if (eAdmin) {
    linksToRender.push({ name: "Admin", href: "/admin" });
  }

  console.log("[Navbar] usuarioLogado:", usuarioLogado);
  console.log("[Navbar] eAdmin:", eAdmin);
  console.log("[Navbar] linksToRender length:", linksToRender?.length);

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
              {linksToRender.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    if (typeof window === 'undefined') return;
                    // If we're not on the homepage, allow normal navigation to '/#section'
                    if (window.location.pathname !== '/') return;
                    // If already on homepage, prevent full navigation and smoothly scroll
                    e.preventDefault();
                    const targetId = link.href.replace('/#', '');
                    const el = document.getElementById(targetId);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                    else window.location.hash = `#${targetId}`;
                  }}
                  className="text-gray-300 hover:text-[#00ccff] transition-colors font-['Roboto'] font-medium"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* BARRA DE BUSCA E ÍCONE DE USUÁRIO */}
            <div className="flex items-center gap-4">
              {/* BUSCA - Desktop */}
              <div className="hidden sm:flex items-center bg-[#1b2838] rounded-md px-3 py-2 w-64 border border-[#00ccff]/20 focus-within:border-[#00ccff]/60 transition-colors">
                <Search className="h-4 w-4 text-gray-400 mr-2" />
                <form action="/" method="GET">
                  <Input
                    type="text"
                    name="search"
                    placeholder="Buscar jogos..."
                    className="bg-transparent border-0 text-sm text-gray-300 placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 font-['Roboto']"
                  />
                </form>
              </div>

              {/* ÍCONE DE USUÁRIO */}
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-[#1b2838] hover:bg-[#00ccff]/20 border border-[#00ccff]/30 transition-all"
                onClick={() => (window.location.href = "/login")}
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
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* MENU MOBILE */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2 border-t border-[#00ccff]/20 mt-2 pt-4">
            {linksToRender.map((link) => (
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
                <form action="/" method="GET">
                  <Input
                    type="text"
                    name="search"
                    placeholder="Buscar jogos..."
                    className="bg-transparent border-0 text-sm text-gray-300 placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 font-['Roboto']"
                  />
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
