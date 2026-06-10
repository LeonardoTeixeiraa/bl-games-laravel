/**
 * ========================================
 * PORTFÓLIO GAMER PROFISSIONAL - ESTILO STEAM
 * ========================================
 * 
 * Desenvolvido com React + Tailwind CSS
 * Tema Dark Mode com paleta Steam (azul escuro/grafite + acentos neon)
 * Totalmente responsivo (Mobile & Desktop)
 * 
 * ESTRUTURA DO SITE:
 * 1. Navbar - Barra de navegação fixa
 * 2. HeroBanner - Banner principal de destaque
 * 3. PlayerStats - Painel de estatísticas do jogador
 * 4. FeaturedGames - Cards interativos de jogos
 * 5. Categories - Seção de categorias/biblioteca
 * 6. Library - Seção de biblioteca pessoal
 * 7. CommunityHighlights - Destaques da comunidade
 * 8. Footer - Rodapé com links e redes sociais
 * 9. ScrollToTop - Botão flutuante para voltar ao topo
 * 
 * INSTRUÇÕES DE CUSTOMIZAÇÃO:
 * - Cada componente tem comentários detalhados
 * - Edite os dados nos arrays de cada componente
 * - Cores Steam definidas em /src/styles/theme.css
 * - Fontes: Roboto (corpo) e Montserrat (títulos)
 * 
 * TECNOLOGIAS:
 * - React 18.3.1
 * - Tailwind CSS v4
 * - Lucide React (ícones)
 * - Componentes UI personalizados
 */

import { useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { PlayerStats } from './components/PlayerStats';
import { FeaturedGames } from './components/FeaturedGames';
import { Categories } from './components/Categories';
import { Library } from './components/Library';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';

export default function App() {
  
  // Ativa o modo dark ao carregar
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="min-h-screen bg-[#171a21] font-['Roboto']">
      {/* 
        NAVBAR FIXA
        Barra de navegação no topo com links, busca e perfil
        Customizável em /src/app/components/Navbar.tsx
      */}
      <Navbar />

      {/* 
        HERO BANNER
        Seção principal de destaque com jogo em evidência
        Imagem de fundo, título, descrição e CTAs
        Customizável em /src/app/components/HeroBanner.tsx
      */}
      <HeroBanner />

      {/* 
        ESTATÍSTICAS DO JOGADOR
        Painel com nível, XP, conquistas e métricas
        Mostra progresso e rankings
        Customizável em /src/app/components/PlayerStats.tsx
      */}

      {/* 
        JOGOS EM DESTAQUE
        Grid responsivo de cards interativos
        Efeitos de hover: scale, glow, elevação
        Customizável em /src/app/components/FeaturedGames.tsx
      */}
      <FeaturedGames />

      {/* 
        CATEGORIAS/BIBLIOTECA
        Organização de jogos por gênero
        Cards com ícones animados e contadores
        Customizável em /src/app/components/Categories.tsx
      */}
      <Categories />

      {/* 
        BIBLIOTECA PESSOAL
        Lista de jogos com estatísticas e progresso
        Mostra horas jogadas, conquistas e status
        Customizável em /src/app/components/Library.tsx
      */}

      {/* 
        FOOTER
        Rodapé com links úteis e redes sociais
        Customizável em /src/app/components/Footer.tsx
      */}
      <Footer />

      {/* 
        SCROLL TO TOP
        Botão flutuante para voltar ao topo
        Aparece após rolar 300px
      */}
      <ScrollToTop />
    </div>
  );
}