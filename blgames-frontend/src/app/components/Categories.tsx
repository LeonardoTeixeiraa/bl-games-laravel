/**
 * CATEGORIES/BIBLIOTECA COMPONENTE
 * Seção de categorias de jogos organizadas
 * 
 * PERSONALIZAÇÕES DISPONÍVEIS:
 * - Adicione ou remova categorias no array 'categories'
 * - Para cada categoria, configure:
 *   * name: nome da categoria
 *   * icon: componente de ícone do lucide-react
 *   * count: número de jogos na categoria
 *   * color: cor do acento (cyan ou magenta)
 * 
 * EFEITOS INTERATIVOS:
 * - Cards com animação de hover
 * - Brilho neon dinâmico
 * - Ícones animados
 */

import { 
  Swords, 
  Rocket, 
  Gamepad2, 
  Trophy, 
  Users, 
  Zap,
  Crown,
  Target
} from 'lucide-react';
import { Card } from './ui/card';

export function Categories() {
  
  // ÁREA DE CUSTOMIZAÇÃO: Lista de categorias
  const categories = [
    {
      name: "Ação & Aventura",
      icon: Swords,
      count: 128,
      color: "cyan" // Opções: "cyan" ou "magenta"
    },
    {
      name: "Sci-Fi & Espacial",
      icon: Rocket,
      count: 95,
      color: "magenta"
    },
    {
      name: "Indie & Casual",
      icon: Gamepad2,
      count: 210,
      color: "cyan"
    },
    {
      name: "Competitivo",
      icon: Trophy,
      count: 67,
      color: "magenta"
    },
    {
      name: "Multiplayer",
      icon: Users,
      count: 143,
      color: "cyan"
    },
    {
      name: "FPS & Shooter",
      icon: Target,
      count: 89,
      color: "magenta"
    },
    {
      name: "RPG Premium",
      icon: Crown,
      count: 112,
      color: "cyan"
    },
    {
      name: "Battle Royale",
      icon: Zap,
      count: 45,
      color: "magenta"
    }
  ];

  return (
    <section id="categorias" className="py-16 bg-gradient-to-b from-[#171a21] to-[#1b2838]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TÍTULO DA SEÇÃO */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white font-['Montserrat'] mb-3">
            Explore por Categoria
          </h2>
          <p className="text-gray-400 font-['Roboto'] text-lg">
            Descubra jogos organizados por gênero e estilo
          </p>
        </div>

        {/* GRID DE CATEGORIAS - Responsivo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            const isCyan = category.color === "cyan";
            
            return (
              <Card
                key={index}
                className={`group relative overflow-hidden bg-[#16202d] border transition-all duration-300 cursor-pointer
                  ${isCyan 
                    ? 'border-[#00ccff]/30 hover:border-[#00ccff] hover:shadow-lg hover:shadow-[#00ccff]/40' 
                    : 'border-[#ff00ff]/30 hover:border-[#ff00ff] hover:shadow-lg hover:shadow-[#ff00ff]/40'
                  }
                  hover:scale-105 hover:-translate-y-1`}
              >
                <div className="p-6 space-y-4">
                  
                  {/* ÍCONE DA CATEGORIA */}
                  <div className={`inline-flex p-4 rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-6
                    ${isCyan 
                      ? 'bg-[#00ccff]/10 border border-[#00ccff]/30 group-hover:bg-[#00ccff]/20' 
                      : 'bg-[#ff00ff]/10 border border-[#ff00ff]/30 group-hover:bg-[#ff00ff]/20'
                    }`}
                  >
                    <IconComponent 
                      className={`h-8 w-8 transition-colors
                        ${isCyan ? 'text-[#00ccff]' : 'text-[#ff00ff]'}
                      `} 
                    />
                  </div>

                  {/* NOME DA CATEGORIA */}
                  <h3 className={`text-xl font-bold font-['Montserrat'] transition-colors
                    ${isCyan 
                      ? 'text-white group-hover:text-[#00ccff]' 
                      : 'text-white group-hover:text-[#ff00ff]'
                    }`}
                  >
                    {category.name}
                  </h3>

                  {/* CONTADOR DE JOGOS */}
                  <p className="text-gray-400 font-['Roboto'] text-sm">
                    <span className={`font-bold transition-colors
                      ${isCyan 
                        ? 'text-[#00ccff] group-hover:text-white' 
                        : 'text-[#ff00ff] group-hover:text-white'
                      }`}
                    >
                      {category.count}
                    </span>
                    {' '}jogos disponíveis
                  </p>
                </div>

                {/* EFEITO GLOW ANIMADO NO HOVER */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500
                  ${isCyan 
                    ? 'bg-gradient-to-br from-[#00ccff]/5 via-transparent to-transparent' 
                    : 'bg-gradient-to-br from-[#ff00ff]/5 via-transparent to-transparent'
                  }`} 
                />

                {/* LINHA DECORATIVA INFERIOR */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300
                  ${isCyan ? 'bg-[#00ccff]' : 'bg-[#ff00ff]'}
                `} />
              </Card>
            );
          })}
        </div>

        {/* CALL TO ACTION */}
        <div className="mt-12 text-center">
          <button className="group px-8 py-4 bg-gradient-to-r from-[#00ccff] to-[#ff00ff] hover:from-[#00b3e6] hover:to-[#cc00cc] text-white font-bold rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 font-['Montserrat'] text-lg hover:scale-105">
            Ver Todas as Categorias
            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
