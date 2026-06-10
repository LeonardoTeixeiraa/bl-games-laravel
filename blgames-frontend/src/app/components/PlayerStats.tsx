/**
 * PLAYER STATS COMPONENTE
 * Painel de estatísticas do jogador estilo Steam
 * Mostra conquistas, nível, amigos, etc.
 * 
 * PERSONALIZAÇÕES DISPONÍVEIS:
 * - Atualize os valores em 'playerData'
 * - Customize as métricas exibidas
 * - Ajuste cores e animações
 */

import { Trophy, Users, Target, Star, TrendingUp, Award } from 'lucide-react';
import { Card } from './ui/card';

export function PlayerStats() {
  
  // ÁREA DE CUSTOMIZAÇÃO: Dados do jogador
  const playerData = {
    level: 42,
    xp: { current: 7845, total: 10000 },
    totalGames: 156,
    achievements: { unlocked: 892, total: 1205 },
    friends: 248,
    hoursPlayed: 2847,
    winRate: 68,
    rareAchievements: 34
  };

  // Estatísticas para exibir
  const stats = [
    {
      icon: Trophy,
      label: "Conquistas Desbloqueadas",
      value: playerData.achievements.unlocked,
      total: playerData.achievements.total,
      color: "cyan",
      percentage: Math.round((playerData.achievements.unlocked / playerData.achievements.total) * 100)
    },
    {
      icon: Target,
      label: "Taxa de Vitória",
      value: `${playerData.winRate}%`,
      color: "magenta",
      showProgress: false
    },
    {
      icon: Users,
      label: "Amigos",
      value: playerData.friends,
      color: "cyan",
      showProgress: false
    },
    {
      icon: Award,
      label: "Conquistas Raras",
      value: playerData.rareAchievements,
      color: "magenta",
      showProgress: false
    }
  ];

  // Calcula progresso de XP
  const xpPercentage = Math.round((playerData.xp.current / playerData.xp.total) * 100);

  return (
    <section className="py-16 bg-gradient-to-b from-[#1b2838] to-[#171a21]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* CARD PRINCIPAL DE NÍVEL */}
        <Card className="bg-gradient-to-r from-[#16202d] to-[#1b2838] border-[#00ccff]/30 p-8 mb-8 overflow-hidden relative">
          
          {/* EFEITO DE BRILHO */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#00ccff]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#ff00ff]/5 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              
              {/* NÍVEL E AVATAR */}
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#00ccff] to-[#ff00ff] p-1">
                    <div className="w-full h-full rounded-full bg-[#16202d] flex items-center justify-center">
                      <Star className="h-12 w-12 text-[#00ccff] fill-[#00ccff]" />
                    </div>
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-[#00ccff] text-[#171a21] rounded-full w-10 h-10 flex items-center justify-center font-bold text-sm shadow-lg">
                    {playerData.level}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-3xl font-bold text-white font-['Montserrat'] mb-1">
                    Nível {playerData.level}
                  </h3>
                  <p className="text-gray-400 font-['Roboto']">
                    {playerData.totalGames} jogos • {playerData.hoursPlayed.toLocaleString('pt-BR')} horas jogadas
                  </p>
                </div>
              </div>

              {/* TRENDING */}
              <div className="flex items-center gap-2 bg-[#00ccff]/10 border border-[#00ccff]/30 px-4 py-2 rounded-lg">
                <TrendingUp className="h-5 w-5 text-[#00ccff]" />
                <span className="text-[#00ccff] font-bold font-['Roboto']">Top 5% Global</span>
              </div>
            </div>

            {/* BARRA DE PROGRESSO DE XP */}
            <div className="mt-6 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400 font-['Roboto']">Experiência</span>
                <span className="text-white font-bold font-['Roboto']">
                  {playerData.xp.current.toLocaleString('pt-BR')} / {playerData.xp.total.toLocaleString('pt-BR')} XP
                </span>
              </div>
              <div className="h-3 bg-[#1b2838] rounded-full overflow-hidden border border-[#00ccff]/20">
                <div
                  className="h-full bg-gradient-to-r from-[#00ccff] to-[#ff00ff] rounded-full transition-all duration-1000 shadow-lg shadow-[#00ccff]/50"
                  style={{ width: `${xpPercentage}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 font-['Roboto']">
                {playerData.xp.total - playerData.xp.current} XP para o próximo nível
              </p>
            </div>
          </div>
        </Card>

        {/* GRID DE ESTATÍSTICAS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            const isCyan = stat.color === "cyan";
            
            return (
              <Card
                key={index}
                className="group bg-[#16202d] border border-[#00ccff]/20 hover:border-[#00ccff]/60 p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#00ccff]/20 cursor-pointer"
              >
                <div className="space-y-4">
                  
                  {/* ÍCONE */}
                  <div className={`inline-flex p-3 rounded-lg transition-all
                    ${isCyan 
                      ? 'bg-[#00ccff]/10 group-hover:bg-[#00ccff]/20' 
                      : 'bg-[#ff00ff]/10 group-hover:bg-[#ff00ff]/20'
                    }`}
                  >
                    <IconComponent 
                      className={`h-6 w-6 ${isCyan ? 'text-[#00ccff]' : 'text-[#ff00ff]'}`} 
                    />
                  </div>

                  {/* LABEL */}
                  <p className="text-gray-400 text-sm font-['Roboto']">
                    {stat.label}
                  </p>

                  {/* VALOR */}
                  <div>
                    <p className="text-3xl font-bold text-white font-['Montserrat']">
                      {stat.value}
                      {stat.total && (
                        <span className="text-lg text-gray-500">
                          /{stat.total}
                        </span>
                      )}
                    </p>
                  </div>

                  {/* BARRA DE PROGRESSO (se aplicável) */}
                  {stat.percentage !== undefined && (
                    <div className="space-y-1">
                      <div className="h-1.5 bg-[#1b2838] rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500
                            ${isCyan ? 'bg-[#00ccff]' : 'bg-[#ff00ff]'}
                          `}
                          style={{ width: `${stat.percentage}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 font-['Roboto']">
                        {stat.percentage}% completado
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
