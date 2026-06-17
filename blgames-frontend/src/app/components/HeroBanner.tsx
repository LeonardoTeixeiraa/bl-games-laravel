/**
 * HERO BANNER COMPONENTE
 * Banner principal de destaque estilo Steam
 *
 * PERSONALIZAÇÕES DISPONÍVEIS:
 * - Altere 'heroGame.backgroundImage' para mudar a imagem de fundo
 * - Modifique 'heroGame.title' para o título do jogo em destaque
 * - Atualize 'heroGame.description' com a descrição do jogo
 * - Customize o texto dos botões (CTA)
 * - Ajuste as cores do gradiente overlay
 */
import heroBg from "../../img/hero-bg.jpg";
import { Play, Plus } from "lucide-react";
import { Button } from "./ui/button";

export function HeroBanner() {
  // ÁREA DE CUSTOMIZAÇÃO: Dados do jogo em destaque
  const heroGame = {
    title: "Homem-Aranha",
    description:
      "Balance entre arranha-céus em uma Nova York vibrante e domine um sistema de combate acrobático único para salvar a cidade. Experimente a vida épica do Homem-Aranha e prove que você tem o que é preciso para ser o herói que esse mundo precisa.",
    backgroundImage: heroBg,
    tags: ["Ação", "Mundo Aberto", "Super-Herói"],
  };
  return (
    <section className="relative h-[600px] md:h-[700px] w-full overflow-hidden mt-16">
      {/* IMAGEM DE FUNDO - Substitua 'heroGame.backgroundImage' */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroGame.backgroundImage})` }}
      >
        {/* OVERLAY GRADIENTE - Ajuste as cores aqui */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#171a21] via-[#171a21]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#171a21] via-transparent to-transparent" />
      </div>

      {/* CONTEÚDO DO HERO */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end pb-16">
        <div className="max-w-2xl space-y-6">
          {/* TAGS DO JOGO */}
          <div className="flex flex-wrap gap-2">
            {heroGame.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-[#1b2838]/80 border border-[#00ccff]/30 rounded-md text-sm text-[#00ccff] font-['Roboto'] backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* TÍTULO - Modifique 'heroGame.title' */}
          <h1 className="text-5xl md:text-7xl font-bold text-white font-['Montserrat'] leading-tight">
            {heroGame.title}
          </h1>

          {/* DESCRIÇÃO - Atualize 'heroGame.description' */}
          <p className="text-lg md:text-xl text-gray-300 font-['Roboto'] leading-relaxed">
            {heroGame.description}
          </p>

          {/* BOTÕES DE AÇÃO (CTA) - Customize os textos aqui */}
          <div className="flex flex-wrap gap-4">
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-[#00ccff] text-[#00ccff] hover:bg-[#00ccff]/10 font-bold font-['Roboto'] px-8"
            >
              <Plus className="mr-2 h-5 w-5" />
              Adicionar à Biblioteca
            </Button>
          </div>
        </div>
      </div>

      {/* EFEITO NEON GLOW (decorativo) */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#171a21] to-transparent pointer-events-none" />
    </section>
  );
}
