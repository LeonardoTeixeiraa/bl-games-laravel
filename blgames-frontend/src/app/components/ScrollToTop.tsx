/**
 * SCROLL TO TOP COMPONENTE
 * Botão flutuante para voltar ao topo da página
 * Aparece após rolar 300px
 * 
 * PERSONALIZAÇÕES DISPONÍVEIS:
 * - Ajuste o threshold (distância para aparecer)
 * - Customize cor e posição
 * - Altere ícone e texto
 */

import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { Button } from './ui/button';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // ÁREA DE CUSTOMIZAÇÃO: Threshold de rolagem (em pixels)
  const scrollThreshold = 300;

  // Monitora a posição de scroll
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > scrollThreshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  // Função de scroll suave para o topo
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {isVisible && (
        <Button
          onClick={scrollToTop}
          size="icon"
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-gradient-to-r from-[#00ccff] to-[#ff00ff] hover:from-[#00b3e6] hover:to-[#cc00cc] text-white shadow-2xl shadow-[#00ccff]/50 hover:shadow-[#ff00ff]/50 transition-all duration-300 hover:scale-110 animate-in slide-in-from-bottom-5"
          aria-label="Voltar ao topo"
        >
          <ChevronUp className="h-6 w-6" />
        </Button>
      )}
    </>
  );
}
