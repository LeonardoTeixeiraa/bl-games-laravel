/**
 * FEATURED GAMES COMPONENTE
 * Seção de jogos em destaque com cards interativos
 * 
 * PERSONALIZAÇÕES DISPONÍVEIS:
 * - Adicione ou remova jogos no array 'featuredGames'
 * - Para cada jogo, configure:
 *   * id: identificador único
 *   * title: nome do jogo
 *   * image: URL da imagem
 *   * category: categoria do jogo
 *   * price: preço
 *   * discount: desconto (opcional)
 *   * rating: avaliação (0-100)
 * 
 * EFEITOS DE HOVER:
 * - Expansão do card com scale
 * - Brilho neon (glow effect)
 * - Elevação com sombra
 */

import { useState } from 'react';
import { Star, TrendingUp } from 'lucide-react';
import { Card } from './ui/card';
import { AdminPanel } from './AdminPanel';

export function FeaturedGames() {
  
  // ÁREA DE CUSTOMIZAÇÃO: Lista de jogos em destaque
  const initialGames = [
    {
      id: 1,
      title: "Fantasy Legends RPG",
      image: "https://images.unsplash.com/photo-1775193823752-84a3c871f93a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW50YXN5JTIwcnBnJTIwZ2FtZSUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3ODAwNjI1ODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "RPG",
      price: "R$ 149,90",
      discount: 25,
      rating: 92
    },
    {
      id: 2,
      title: "Tactical Warfare",
      image: "https://images.unsplash.com/photo-1620231150904-a86b9802656a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY3Rpb24lMjBzaG9vdGVyJTIwZ2FtZSUyMHdhcmZhcmV8ZW58MXx8fHwxNzgwMjQ5ODc2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "FPS",
      price: "R$ 179,90",
      discount: 15,
      rating: 88
    },
    {
      id: 3,
      title: "Speed Racing Ultimate",
      image: "https://images.unsplash.com/photo-1555532686-d0fccaccadcf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWNpbmclMjBzcG9ydHMlMjBjYXIlMjBnYW1pbmd8ZW58MXx8fHwxNzgwMjQ5ODc2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Corrida",
      price: "R$ 129,90",
      discount: 30,
      rating: 85
    },
    {
      id: 4,
      title: "Space Odyssey",
      image: "https://images.unsplash.com/photo-1677926405168-fa86268b7295?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFjZSUyMHNjaWZpJTIwZ2FtZSUyMG5lYnVsYXxlbnwxfHx8fDE3ODAyNDk4Nzd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Estratégia",
      price: "R$ 159,90",
      discount: 20,
      rating: 90
    },
    {
      id: 5,
      title: "Medieval Conquest",
      image: "https://images.unsplash.com/photo-1661968977884-b058c155abc7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpZXZhbCUyMGJhdHRsZSUyMGdhbWUlMjBrbmlnaHRzfGVufDF8fHx8MTc4MDI0OTg3N3ww&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Ação",
      price: "R$ 139,90",
      discount: 10,
      rating: 87
    },
    {
      id: 6,
      title: "Cyberpunk City",
      image: "https://images.unsplash.com/photo-1563863251222-11d3e3bd3b62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBmdXR1cmlzdGljJTIwZ2FtZSUyMHNjZW5lfGVufDF8fHx8MTc4MDI0OTg3NXww&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Aventura",
      price: "R$ 199,90",
      discount: 5,
      rating: 95
    }
  ];
const [featuredGames, setFeaturedGames] = useState<any[]>(() => {
  const saved = localStorage.getItem("games");
  return saved ? JSON.parse(saved) : initialGames;
});

const isAdmin =
  typeof window !== "undefined" &&
  localStorage.getItem("admin") === "true";

const saveGames = (games: any[]) => {
  setFeaturedGames(games);
  localStorage.setItem("games", JSON.stringify(games));
};
  // Função auxiliar para calcular preço com desconto
  const calculateDiscountedPrice = (price: string, discount: number) => {
    const numericPrice = parseFloat(price.replace('R$ ', '').replace(',', '.'));
    const discountedPrice = numericPrice * (1 - discount / 100);
    return `R$ ${discountedPrice.toFixed(2).replace('.', ',')}`;
  };

  return (
    <section id="destaques" className="py-16 bg-[#171a21]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {isAdmin && (
 <AdminPanel
  games={featuredGames}
  setGames={saveGames}
/>
)}
        {/* TÍTULO DA SEÇÃO */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-4xl font-bold text-white font-['Montserrat'] mb-2">
              Jogos em Destaque
            </h2>
            <p className="text-gray-400 font-['Roboto']">
              Ofertas especiais e lançamentos exclusivos
            </p>
          </div>
          <TrendingUp className="h-10 w-10 text-[#00ccff]" />
        </div>

        {/* GRID DE CARDS - Responsivo */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredGames.map((game) => (
            <Card
              key={game.id}
              className="group relative overflow-hidden bg-[#16202d] border-[#00ccff]/20 hover:border-[#00ccff]/60 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#00ccff]/30 cursor-pointer"
            >
              {/* IMAGEM DO JOGO */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* OVERLAY COM GRADIENTE */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#16202d] via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                
                {/* BADGE DE DESCONTO */}
                {game.discount > 0 && (
                  <div className="absolute top-4 right-4 bg-[#ff00ff] text-white px-3 py-1 rounded-md font-bold text-sm shadow-lg">
                    -{game.discount}%
                  </div>
                )}

                {/* CATEGORIA */}
                <div className="absolute top-4 left-4 bg-[#1b2838]/90 backdrop-blur-sm border border-[#00ccff]/40 text-[#00ccff] px-3 py-1 rounded-md text-xs font-medium font-['Roboto']">
                  {game.category}
                </div>
              </div>

              {/* INFORMAÇÕES DO JOGO */}
              <div className="p-5 space-y-3">
                
                {/* TÍTULO */}
                <h3 className="text-xl font-bold text-white font-['Montserrat'] group-hover:text-[#00ccff] transition-colors">
                  {game.title}
                </h3>

                {/* RATING */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-[#00ccff] text-[#00ccff]" />
                    <span className="text-sm font-bold text-[#00ccff] font-['Roboto']">
                      {game.rating}%
                    </span>
                  </div>
                  <span className="text-xs text-gray-400 font-['Roboto']">
                    Muito Positivo
                  </span>
                </div>

                {/* PREÇO */}
                <div className="flex items-center justify-between pt-2 border-t border-[#00ccff]/20">
                  <div className="flex flex-col">
                    {game.discount > 0 && (
                      <span className="text-xs text-gray-500 line-through font-['Roboto']">
                        {game.price}
                      </span>
                    )}
                    <span className="text-xl font-bold text-[#00ccff] font-['Montserrat']">
                      {game.discount > 0 ? calculateDiscountedPrice(game.price, game.discount) : game.price}
                    </span>
                  </div>
                  
                  {/* BOTÃO - Aparece no hover */}
                  <button className="opacity-0 group-hover:opacity-100 bg-[#00ccff] hover:bg-[#00b3e6] text-[#171a21] px-4 py-2 rounded-md font-bold text-sm transition-all font-['Roboto'] shadow-lg">
                    Comprar
                  </button>
                </div>
              </div>

              {/* GLOW EFFECT NO HOVER */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300">
                <div className="absolute inset-0 bg-gradient-to-t from-[#00ccff]/10 via-transparent to-transparent" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
