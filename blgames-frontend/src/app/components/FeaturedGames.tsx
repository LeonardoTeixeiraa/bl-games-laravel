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
import { TrendingUp } from "lucide-react";
import { Card } from "./ui/card";

export function FeaturedGames() {
  const [featuredGames, setFeaturedGames] = useState<any[]>(() => {
    const saved =
      typeof window !== "undefined" ? localStorage.getItem("games") : null;
    return saved ? JSON.parse(saved) : [];
  });

  const isAdmin =
    typeof window !== "undefined" && localStorage.getItem("admin") === "true";

  const [searchTerm, setSearchTerm] = useState<string>(() => {
    if (typeof window === "undefined") return "";
    const params = new URLSearchParams(window.location.search);
    return params.get("search") || "";
  });

  const saveGames = (games: any[]) => {
    setFeaturedGames(games);
    localStorage.setItem("games", JSON.stringify(games));
  };
  // Buscar jogos do backend quando montar e quando searchTerm mudar
  useEffect(() => {
    let mounted = true;
    const params = searchTerm ? `?termo=${encodeURIComponent(searchTerm)}` : "";
    axios
      .get(`/api/jogos${params}`)
      .then((res) => {
        if (!mounted) return;
        const data = Array.isArray(res.data) ? res.data : res.data.data || [];
        const mapped = data.map((g: any) => ({
          id: g.id,
          title: g.nome,
          image: g.imagem_url,
          category: g.genero,
          desenvolvedora: g.desenvolvedora,
          plataforma: g.plataforma,
          classificacao: g.classificacao,
          descricao: g.descricao,
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
  }, [searchTerm]);

  // Ouvir eventos de busca disparados pelo Navbar
  useEffect(() => {
    const handler = (e: any) => {
      const term = e?.detail ?? "";
      setSearchTerm(term || "");
    };
    window.addEventListener("app:search", handler as EventListener);
    return () =>
      window.removeEventListener("app:search", handler as EventListener);
  }, []);

  return (
    <section id="destaques" className="py-16 bg-[#171a21]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* TÍTULO DA SEÇÃO */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-4xl font-bold text-white font-['Montserrat'] mb-2">
              {searchTerm
                ? `Resultados para "${searchTerm}"`
                : "Jogos em Destaque"}
            </h2>
            <p className="text-gray-400 font-['Roboto']">
              {searchTerm
                ? `Mostrando resultados para "${searchTerm}"`
                : "Ofertas especiais e lançamentos exclusivos"}
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

                {/* Desenvolvedora */}
                <div className="text-sm text-gray-300 font-['Roboto']">
                  Desenvolvedora: <span className="text-[#00ccff] font-medium">{game.desenvolvedora || '—'}</span>
                </div>

                {/* separador visual entre título e conteúdo final */}
                <div className="pt-2 border-t border-[#00ccff]/10" />

                {/* Saiba mais button */}
                <div className="pt-3">
                  <button
                    onClick={() => (window.location.href = `/jogo/${game.id}`)}
                    className="bg-[#00ccff] text-black px-4 py-2 rounded font-medium hover:brightness-95 transition"
                    aria-label={`Saiba mais sobre ${game.title}`}
                  >
                    Saiba mais
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