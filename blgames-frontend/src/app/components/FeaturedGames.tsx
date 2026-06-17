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

import { useState, useEffect } from "react";
import axios from "axios";
import { Star, TrendingUp } from "lucide-react";
import { Card } from "./ui/card";
import { AdminPanel } from "./AdminPanel";

export function FeaturedGames() {
  const [featuredGames, setFeaturedGames] = useState<any[]>(() => {
    const saved =
      typeof window !== "undefined" ? localStorage.getItem("games") : null;
    return saved ? JSON.parse(saved) : [];
  });

  const isAdmin =
    typeof window !== "undefined" && localStorage.getItem("admin") === "true";

  const saveGames = (games: any[]) => {
    setFeaturedGames(games);
    localStorage.setItem("games", JSON.stringify(games));
  };
  // Buscar jogos do backend ao montar o componente
  useEffect(() => {
    let mounted = true;
    axios
      .get("http://localhost:8000/api/jogos")
      .then((res) => {
        if (!mounted) return;
        const data = Array.isArray(res.data) ? res.data : res.data.data || [];
        const mapped = data.map((g: any) => ({
          id: g.id,
          title: g.nome,
          image: g.imagem_url,
          category: g.genero,
          price: null,
          discount: 0,
          rating: g.avaliacao ?? 0,
        }));
        setFeaturedGames(mapped);
        localStorage.setItem("games", JSON.stringify(mapped));
      })
      .catch((err) => {
        console.error("Erro ao carregar jogos:", err);
        const saved =
          typeof window !== "undefined" ? localStorage.getItem("games") : null;
        if (saved) setFeaturedGames(JSON.parse(saved));
      });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section id="destaques" className="py-16 bg-[#171a21]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {isAdmin && <AdminPanel games={featuredGames} setGames={saveGames} />}
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
          {featuredGames.slice(0, 6).map((game) => (
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

                {/* separador visual entre título/rating e conteúdo final */}
                <div className="pt-2 border-t border-[#00ccff]/10" />
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
