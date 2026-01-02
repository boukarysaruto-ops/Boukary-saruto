
import React from 'react';
import { GeneratedGuide } from '../types';

interface GuideRendererProps {
  guide: GeneratedGuide;
}

const GuideRenderer: React.FC<GuideRendererProps> = ({ guide }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Sidebar Navigation */}
      <aside className="lg:col-span-1">
        <div className="sticky top-24 space-y-6">
          <nav className="space-y-1">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Sommaire</p>
            {guide.sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="block py-2 px-3 text-sm text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-all border-l-2 border-transparent hover:border-indigo-600"
              >
                {section.title}
              </a>
            ))}
          </nav>

          {guide.sources.length > 0 && (
            <div className="pt-6 border-t border-slate-200">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Sources Citées</p>
              <ul className="space-y-3">
                {guide.sources.map((source, idx) => (
                  <li key={idx}>
                    <a
                      href={source.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-indigo-600 hover:underline line-clamp-2"
                    >
                      {source.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:col-span-3">
        <header className="mb-12">
          <h2 className="text-4xl serif text-slate-900 mb-4">{guide.title}</h2>
          <div className="p-6 bg-indigo-50 border-l-4 border-indigo-500 rounded-r-xl">
            <p className="text-indigo-900 leading-relaxed italic">
              {guide.summary}
            </p>
          </div>
        </header>

        <article className="prose prose-slate max-w-none space-y-12">
          {guide.sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-24">
              <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="text-indigo-400">#</span> {section.title}
              </h3>
              <div className="text-slate-600 leading-7 text-lg whitespace-pre-wrap">
                {section.content}
              </div>
            </section>
          ))}
        </article>
      </div>
    </div>
  );
};

export default GuideRenderer;
