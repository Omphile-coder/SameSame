import React from 'react';
import { Check, Quote, ExternalLink } from 'lucide-react';
import { ConsensusPoint } from '../types';

interface ConsensusViewProps {
  consensus: ConsensusPoint[];
  onInspectPassage: (articleId: string, sentenceIndex: number) => void;
}

export const ConsensusView: React.FC<ConsensusViewProps> = ({
  consensus,
  onInspectPassage,
}) => {
  return (
    <section className="py-12 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-8">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-stone-500 mb-2">
            <span>Section 01</span>
            <span aria-hidden="true">·</span>
            <span>Common Ground</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-stone-900 text-balance">
            What the articles agree on
          </h2>
          <p className="mt-2 text-sm sm:text-base text-stone-600">
            Factual claims corroborated across all reporting sources. Click any citation to inspect the original sentence in the source text.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {consensus.map((point, idx) => (
            <div
              key={point.id}
              className="p-6 bg-white rounded border border-stone-200/90 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-mono font-medium text-stone-500 uppercase">
                    Consensus Point 0{idx + 1}
                  </span>
                </div>

                <h3 className="font-serif text-base font-semibold text-stone-900 leading-snug">
                  {point.claim}
                </h3>
                <p className="mt-2.5 text-xs text-stone-600 leading-relaxed">
                  {point.explanation}
                </p>
              </div>

              {/* Citations List */}
              <div className="mt-6 pt-4 border-t border-stone-100">
                <div className="text-[11px] font-mono uppercase tracking-wider text-stone-400 mb-2">
                  Corroborating Passages ({point.citations.length})
                </div>
                <div className="space-y-2">
                  {point.citations.map((cite, cIdx) => (
                    <button
                      key={cIdx}
                      onClick={() => onInspectPassage(cite.articleId, cite.sentenceIndex)}
                      className="w-full text-left p-2.5 rounded bg-stone-50 hover:bg-stone-100 transition-colors border border-transparent hover:border-stone-200 cursor-pointer group"
                    >
                      <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1">
                        <span className="font-semibold text-stone-800 group-hover:text-stone-950">
                          {cite.outlet}
                        </span>
                        <span className="text-[10px] text-stone-400 flex items-center gap-1">
                          Sent #{cite.sentenceIndex + 1}
                          <ExternalLink className="w-2.5 h-2.5 opacity-60 group-hover:opacity-100" />
                        </span>
                      </div>
                      <p className="text-xs text-stone-700 font-serif italic line-clamp-2 leading-relaxed">
                        "{cite.quote}"
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
