import React from 'react';
import { Compass, EyeOff, MessageSquare, ArrowUpRight } from 'lucide-react';
import { OutletEmphasis } from '../types';

interface EmphasisMatrixProps {
  outletEmphasis: OutletEmphasis[];
  onInspectPassage: (articleId: string, sentenceIndex: number) => void;
}

export const EmphasisMatrix: React.FC<EmphasisMatrixProps> = ({
  outletEmphasis,
  onInspectPassage,
}) => {
  return (
    <section className="py-12 border-b border-stone-200 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-8">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-stone-500 mb-2">
            <span>Section 02</span>
            <span aria-hidden="true">·</span>
            <span>Editorial Priorities</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-stone-900 text-balance">
            What each outlet emphasizes
          </h2>
          <p className="mt-2 text-sm sm:text-base text-stone-600">
            Even when journalists agree on the core facts, their chosen focus dictates how readers interpret the situation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {outletEmphasis.map((outlet) => (
            <div
              key={outlet.articleId}
              className="p-6 bg-white rounded border border-stone-200/90 shadow-sm flex flex-col justify-between"
            >
              <div>
                {/* Header with outlet and tone */}
                <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-4">
                  <span className="font-serif text-lg font-bold text-stone-900">
                    {outlet.outlet}
                  </span>
                  <span className="text-xs text-stone-500 font-mono">
                    {outlet.stanceTone}
                  </span>
                </div>

                {/* Primary Angle */}
                <div className="mb-4">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-stone-400 mb-1">
                    <Compass className="w-3.5 h-3.5 text-stone-500" />
                    <span>Primary Narrative Angle</span>
                  </div>
                  <p className="text-sm text-stone-800 font-medium leading-relaxed">
                    {outlet.primaryAngle}
                  </p>
                </div>

                {/* Emphasized Themes */}
                <div className="mb-4">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-stone-400 mb-2">
                    Key Emphasized Themes
                  </div>
                  <ul className="space-y-1.5">
                    {outlet.emphasizedThemes.map((theme, tIdx) => (
                      <li key={tIdx} className="text-xs text-stone-700 flex items-start gap-2">
                        <span className="text-stone-400 font-bold">·</span>
                        <span>{theme}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Omitted or Downplayed */}
                <div className="p-3 rounded bg-stone-50/80 border border-stone-200/60 mb-4">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-stone-500 mb-1">
                    <EyeOff className="w-3.5 h-3.5 text-stone-400" />
                    <span>Omitted or Downplayed</span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {outlet.omittedOrDownplayed}
                  </p>
                </div>
              </div>

              {/* Representative Quote with verification action */}
              <div className="pt-3 border-t border-stone-100">
                <button
                  onClick={() =>
                    onInspectPassage(outlet.articleId, outlet.representativeQuote.sentenceIndex)
                  }
                  className="w-full text-left p-3 rounded bg-stone-50 hover:bg-stone-100 transition-colors border border-transparent hover:border-stone-200 cursor-pointer group"
                >
                  <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1">
                    <span className="font-semibold text-stone-800 group-hover:text-stone-950 flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" />
                      Representative Quote
                    </span>
                    <span className="text-[10px] text-stone-400 flex items-center gap-0.5">
                      Verify passage
                      <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </span>
                  </div>
                  <p className="text-xs text-stone-800 font-serif italic line-clamp-3 leading-relaxed">
                    "{outlet.representativeQuote.quote}"
                  </p>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
