/**
 * FOOTER COMPONENTE
 * Rodapé minimalista
 *
 * PERSONALIZAÇÕES DISPONÍVEIS:
 * - Altere o copyright text
 */

export function Footer() {
  return (
    <footer className="bg-[#171a21] border-t border-[#00ccff]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* LOGO */}
          <h3 className="text-xl font-bold bg-gradient-to-r from-[#00ccff] to-[#ff00ff] bg-clip-text text-transparent font-['Montserrat']">
            B&L GAMES
          </h3>

          {/* COPYRIGHT */}
          <p className="text-gray-500 text-sm font-['Roboto']">
            © 2026 B&L GAMES. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}