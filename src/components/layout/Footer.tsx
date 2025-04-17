
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
          <div className="md:col-span-3">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="h-10 w-10 relative overflow-hidden hexagon-clip rounded-none py-[10px] px-[11px] my-0 mx-[2px]">
                <img
                  src="/lovable-uploads/049eb448-7859-41d5-88bd-92386b16a674.png"
                  alt="Neki Logo"
                  className="w-full h-full scale-[1.8] object-fill"
                />
              </div>
              <div className="font-semibold tracking-tight">
                Mentor <span className="text-neki-black">Neki</span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground mt-4 max-w-xs">
              Plataforma de agendamento de mentorias para profissionais da Neki, facilitando o desenvolvimento profissional contínuo.
            </p>
          </div>

          <div>
            <h4 className="font-medium text-base mb-4">Ajuda</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-neki-blue transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-neki-blue transition-colors">
                  Suporte
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-neki-blue transition-colors">
                  Guia de Uso
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-base mb-4">Contato</h4>
            <ul className="space-y-2">
              <li>
                <a href="mailto:contato@neki.com.br" className="text-sm text-muted-foreground hover:text-neki-blue transition-colors">
                  contato@neki.com.br
                </a>
              </li>
              <li>
                <a href="https://neki.com.br" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-neki-blue transition-colors">
                  neki.com.br
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Mentor Neki. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <a href="#" className="text-sm text-muted-foreground hover:text-neki-blue transition-colors">
              Termos de Uso
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-neki-blue transition-colors">
              Privacidade
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
