import React from 'react';
import { ArrowRight, Eye, CheckCircle2, AlertCircle } from 'lucide-react';
import { Article } from '../types';

interface ArtemisHeroProps {
  articles: Article[];
  onSelectFinding: (findingId: string) => void;
  onOpenCompareModal: () => void;
}

export const ArtemisHero: React.FC<ArtemisHeroProps> = ({
  articles,
  onSelectFinding,
  onOpenCompareModal,
}) => {
  return (
    <section className="border-b border-stone-200 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
        {/* Kicker */}
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-stone-500 mb-3">
          <span>Featured Investigation</span>
          <span aria-hidden="true">·</span>
          <span>Artemis II Lunar Mission</span>
          <span aria-hidden="true">·</span>
          <span>3 Outlets Compared</span>
        </div>

        {/* 2-Column Split: Editorial Thesis & Photographic Marquee */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-stone-900 leading-[1.15] text-balance">
                Same event, different reality.
              </h1>
              <p className="mt-4 text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl">
                Compare news reporting across outlets covering the same event. See what they agree on,
                what each emphasizes, and the exact words shaping your perception.
              </p>

              {/* The Core Artemis II Headline Contrast Box */}
              <div className="mt-6 p-5 bg-white rounded border border-stone-200/90 shadow-sm">
                <div className="flex items-center justify-between text-xs text-stone-500 mb-3">
                  <span className="font-medium text-stone-800">The Core Contrast in Artemis II</span>
                  <span>Click to verify original passages</span>
                </div>

                <div className="space-y-3">
                  {/* Outlet 1 */}
                  <div
                    onClick={() => onSelectFinding('wf-gps-headline')}
                    className="group p-3 rounded bg-stone-50 hover:bg-stone-100 transition-colors cursor-pointer border border-transparent hover:border-stone-300"
                  >
                    <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                      <span className="font-semibold text-stone-900">AeroTech Journal</span>
                      <span className="text-stone-400 text-[11px]">Hedging / Possibility</span>
                    </div>
                    <p className="text-sm text-stone-800 font-serif italic">
                      "...launch <span className="bg-amber-100 text-amber-900 font-semibold px-1 rounded-xs">may have disrupted</span> coastal GPS systems..."
                    </p>
                  </div>

                  {/* Outlet 2 */}
                  <div
                    onClick={() => onSelectFinding('wf-gps-headline')}
                    className="group p-3 rounded bg-stone-50 hover:bg-stone-100 transition-colors cursor-pointer border border-transparent hover:border-stone-300"
                  >
                    <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                      <span className="font-semibold text-stone-900">The Daily Chronicle</span>
                      <span className="text-stone-400 text-[11px]">Definitive / Scrutiny</span>
                    </div>
                    <p className="text-sm text-stone-800 font-serif italic">
                      "...rocket launch <span className="bg-rose-100 text-rose-900 font-semibold px-1 rounded-xs">disrupted vital Florida GPS signals</span>, aviation officials confirm..."
                    </p>
                  </div>

                  {/* Outlet 3 */}
                  <div
                    onClick={() => onSelectFinding('wf-gps-headline')}
                    className="group p-3 rounded bg-stone-50 hover:bg-stone-100 transition-colors cursor-pointer border border-transparent hover:border-stone-300"
                  >
                    <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                      <span className="font-semibold text-stone-900">Public Science Monitor</span>
                      <span className="text-stone-400 text-[11px]">Minimizing / Euphemistic</span>
                    </div>
                    <p className="text-sm text-stone-800 font-serif italic">
                      "...historic Artemis II orbit as <span className="bg-emerald-100 text-emerald-900 font-semibold px-1 rounded-xs">minor signal anomaly</span> examined..."
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-xs text-stone-500">Notice the difference in certainty?</span>
                  <button
                    onClick={() => onSelectFinding('wf-gps-headline')}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-900 hover:text-stone-700 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Inspect In Context</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onSelectFinding('wf-gps-headline')}
                className="px-4 py-2.5 text-sm font-medium text-stone-50 bg-stone-900 hover:bg-stone-800 rounded transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <span>Explore Artemis II Analysis</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onOpenCompareModal}
                className="px-4 py-2.5 text-sm font-medium text-stone-800 bg-white hover:bg-stone-50 border border-stone-200 rounded transition-colors cursor-pointer"
              >
                Paste Your Own Links
              </button>
            </div>
          </div>

          {/* Right Column: High Fidelity Editorial Image Asset */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="relative rounded overflow-hidden border border-stone-300/80 shadow-md h-full min-h-[320px] bg-stone-100">
              <img
                src="/src/assets/images/artemis_rocket_launch_1794296324592.jpg"
                alt="NASA Artemis II rocket on launch pad 39B at Kennedy Space Center at dawn"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 p-5 text-stone-100">
                <div className="text-[11px] font-mono uppercase tracking-wider text-stone-300">
                  Kennedy Space Center · Launch Complex 39B
                </div>
                <div className="font-serif text-lg font-medium text-white mt-1">
                  NASA Artemis II Lunar Flyby Readiness
                </div>
                <div className="text-xs text-stone-300 mt-1">
                  8.8 million pounds of thrust vs coastal radio telemetry receivers
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Operational Strip: 3 Articles Under Comparative Review */}
        <div className="mt-12 pt-8 border-t border-stone-200">
          <div className="text-xs font-mono uppercase tracking-wider text-stone-500 mb-4">
            Articles In This Comparison Set
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {articles.map((article) => (
              <div
                key={article.id}
                className="p-4 bg-white rounded border border-stone-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
                    <span className="font-semibold text-stone-900">{article.outlet}</span>
                    <span>{article.publishedDate.split(',')[0]}</span>
                  </div>
                  <h3 className="font-serif text-sm font-semibold text-stone-900 line-clamp-2 leading-snug">
                    {article.title}
                  </h3>
                  <p className="mt-2 text-xs text-stone-600 line-clamp-2">
                    {article.summary}
                  </p>
                </div>
                <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                  <span>{article.sentences.length} sentences</span>
                  <span className="text-stone-400 truncate max-w-[150px]">{article.author}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
