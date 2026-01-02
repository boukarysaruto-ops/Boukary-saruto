
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Skeleton from './components/Skeleton';
import GuideRenderer from './components/GuideRenderer';
import { generateTextGuide } from './services/gemini';
import { AppStatus, GeneratedGuide } from './types';

const App: React.FC = () => {
  const [query, setQuery] = useState('Guide sur DRS Nisht');
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [guide, setGuide] = useState<GeneratedGuide | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    setStatus(AppStatus.LOADING);
    setError(null);
    try {
      const result = await generateTextGuide(query);
      setGuide(result);
      setStatus(AppStatus.SUCCESS);
    } catch (err: any) {
      console.error(err);
      setError("Désolé, une erreur est survenue lors de la génération du guide. Veuillez réessayer.");
      setStatus(AppStatus.ERROR);
    }
  };

  // Initial load
  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <div className="flex flex-col gap-12">
        {/* Search Section */}
        <section className="bg-indigo-900 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Quelles connaissances recherchez-vous aujourd'hui ?
            </h2>
            <p className="text-indigo-100 mb-8 text-lg">
              DocuNexus synthétise des guides complets à partir de sources textuelles vérifiées, en ignorant le contenu vidéo.
            </p>
            
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ex: DRS Nisht, Guide fiscalité crypto, Mécanique quantique..."
                className="flex-grow px-6 py-4 rounded-xl text-slate-900 focus:outline-none focus:ring-4 focus:ring-indigo-400 transition-all shadow-lg text-lg"
              />
              <button
                type="submit"
                disabled={status === AppStatus.LOADING}
                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 text-lg"
              >
                {status === AppStatus.LOADING ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyse...
                  </>
                ) : (
                  "Générer le Guide"
                )}
              </button>
            </form>
          </div>
        </section>

        {/* Status Messages */}
        {status === AppStatus.ERROR && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 flex items-center gap-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="font-medium">{error}</p>
          </div>
        )}

        {/* Content Section */}
        <section className="bg-white rounded-3xl p-8 md:p-12 shadow-sm min-h-[400px]">
          {status === AppStatus.LOADING ? (
            <Skeleton />
          ) : guide ? (
            <GuideRenderer guide={guide} />
          ) : (
            <div className="flex flex-col items-center justify-center text-slate-400 py-20">
              <svg className="w-16 h-16 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <p className="text-xl">Entrez un sujet pour commencer l'exploration.</p>
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
};

export default App;
