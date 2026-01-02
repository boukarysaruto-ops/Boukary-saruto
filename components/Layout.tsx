
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">D</div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">DocuNexus</h1>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-indigo-600 transition-colors">Accueil</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">À propos</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Documentation API</a>
          </nav>
        </div>
      </header>
      
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <footer className="bg-slate-100 border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-slate-500">© 2024 DocuNexus - Propulsé par Gemini 3 Flash & Google Search</p>
          <div className="mt-4 flex justify-center gap-4 text-slate-400">
            <span className="text-xs">Pas de YouTube</span>
            <span className="text-xs">•</span>
            <span className="text-xs">Sources Écrites Uniquement</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
