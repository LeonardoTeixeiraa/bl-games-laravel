/**
 * LIBRARY (BIBLIOTECA) COMPONENTE
 * Seção mostrando jogos da biblioteca pessoal
 * Design compacto estilo lista Steam
 * 
 * PERSONALIZAÇÕES DISPONÍVEIS:
 * - Adicione ou remova jogos no array 'libraryGames'
 * - Configure horas jogadas, última sessão, conquistas
 * - Customize badges e status
 */

import { Clock, Trophy, Play } from 'lucide-react';
import { Button } from './ui/button';

export function Library() {
  
  // ÁREA DE CUSTOMIZAÇÃO: Jogos na biblioteca
  const libraryGames = [
    {
      id: 1,
      title: "Cyberpunk 2099",
      hoursPlayed: 245,
      achievements: { current: 48, total: 67 },
      lastPlayed: "Há 2 horas",
      status: "Jogando agora",
      thumbnail: "https://images.unsplash.com/photo-1563863251222-11d3e3bd3b62?w=300&h=150&fit=crop"
    },
    {
      id: 2,
      title: "Fantasy Legends RPG",
      hoursPlayed: 189,
      achievements: { current: 55, total: 60 },
      lastPlayed: "Ontem",
      status: "Completado",
      thumbnail: "https://images.unsplash.com/photo-1775193823752-84a3c871f93a?w=300&h=150&fit=crop"
    },
    {
      id: 3,
      title: "Tactical Warfare",
      hoursPlayed: 312,
      achievements: { current: 42, total: 50 },
      lastPlayed: "Há 3 dias",
      status: "Em progresso",
      thumbnail: "https://images.unsplash.com/photo-1620231150904-a86b9802656a?w=300&h=150&fit=crop"
    },
    {
      id: 4,
      title: "Space Odyssey",
      hoursPlayed: 98,
      achievements: { current: 30, total: 55 },
      lastPlayed: "Há 1 semana",
      status: "Em progresso",
      thumbnail: "https://images.unsplash.com/photo-1677926405168-fa86268b7295?w=300&h=150&fit=crop"
    }
  ];

  // Calcula porcentagem de conquistas
  const getAchievementPercentage = (current: number, total: number) => {
    return Math.round((current / total) * 100);
  };

  // Define cor do status
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Jogando agora": return "text-[#00ccff] bg-[#00ccff]/10 border-[#00ccff]/30";
      case "Completado": return "text-[#00ff00] bg-[#00ff00]/10 border-[#00ff00]/30";
      case "Em progresso": return "text-[#ff00ff] bg-[#ff00ff]/10 border-[#ff00ff]/30";
      default: return "text-gray-400 bg-gray-400/10 border-gray-400/30";
    }
  };

  return (
    <section id="biblioteca" className="py-16 bg-[#1b2838]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TÍTULO DA SEÇÃO */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-4xl font-bold text-white font-['Montserrat'] mb-2">
              Minha Biblioteca
            </h2>
            <p className="text-gray-400 font-['Roboto']">
              {libraryGames.length} jogos • Total de {libraryGames.reduce((sum, game) => sum + game.hoursPlayed, 0)} horas jogadas
            </p>
          </div>
        </div>

        {/* LISTA DE JOGOS */}
        <div className="space-y-4">
          {libraryGames.map((game) => (
            <div
              key={game.id}
              className="group bg-[#16202d] border border-[#00ccff]/20 rounded-lg overflow-hidden hover:border-[#00ccff]/60 hover:shadow-xl hover:shadow-[#00ccff]/20 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row gap-4 p-4">
                
                {/* THUMBNAIL */}
                <div className="relative w-full md:w-48 h-28 flex-shrink-0 overflow-hidden rounded-md">
                  <img
                    src={game.thumbnail}
                    alt={game.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#16202d] to-transparent opacity-60" />
                </div>

                {/* INFORMAÇÕES DO JOGO */}
                <div className="flex-1 space-y-3">
                  
                  {/* TÍTULO E STATUS */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h3 className="text-xl font-bold text-white font-['Montserrat'] group-hover:text-[#00ccff] transition-colors">
                      {game.title}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border w-fit ${getStatusColor(game.status)} font-['Roboto']`}>
                      {game.status}
                    </span>
                  </div>

                  {/* ESTATÍSTICAS */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    
                    {/* HORAS JOGADAS */}
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-[#00ccff]" />
                      <div>
                        <p className="text-gray-400 font-['Roboto']">Horas jogadas</p>
                        <p className="text-white font-bold font-['Roboto']">{game.hoursPlayed}h</p>
                      </div>
                    </div>

                    {/* CONQUISTAS */}
                    <div className="flex items-center gap-2 text-sm">
                      <Trophy className="h-4 w-4 text-[#ff00ff]" />
                      <div>
                        <p className="text-gray-400 font-['Roboto']">Conquistas</p>
                        <p className="text-white font-bold font-['Roboto']">
                          {game.achievements.current}/{game.achievements.total}
                          <span className="text-[#ff00ff] ml-1">
                            ({getAchievementPercentage(game.achievements.current, game.achievements.total)}%)
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* ÚLTIMA SESSÃO */}
                    <div className="flex items-center gap-2 text-sm">
                      <Play className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="text-gray-400 font-['Roboto']">Última sessão</p>
                        <p className="text-white font-bold font-['Roboto']">{game.lastPlayed}</p>
                      </div>
                    </div>
                  </div>

                  {/* BARRA DE PROGRESSO DE CONQUISTAS */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-gray-400 font-['Roboto']">
                      <span>Progresso de conquistas</span>
                      <span>{getAchievementPercentage(game.achievements.current, game.achievements.total)}%</span>
                    </div>
                    <div className="h-2 bg-[#1b2838] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#00ccff] to-[#ff00ff] rounded-full transition-all duration-500"
                        style={{ width: `${getAchievementPercentage(game.achievements.current, game.achievements.total)}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* BOTÃO JOGAR */}
                <div className="flex items-center">
                  <Button
                    size="lg"
                    className="bg-[#00ccff] hover:bg-[#00b3e6] text-[#171a21] font-bold shadow-lg shadow-[#00ccff]/30 font-['Roboto'] w-full md:w-auto"
                  >
                    <Play className="mr-2 h-5 w-5" />
                    Jogar
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* BOTÃO VER MAIS */}
        <div className="mt-8 text-center">
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-[#00ccff] text-[#00ccff] hover:bg-[#00ccff]/10 font-bold font-['Roboto']"
          >
            Ver Todos os Jogos da Biblioteca
          </Button>
        </div>
      </div>
    </section>
  );
}
