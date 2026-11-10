import React, { useState } from 'react';
import { Eye, Sparkles, SlidersHorizontal, BookOpen } from 'lucide-react';
import { WordingFinding } from '../types';

interface WordingExplorerProps {
  findings: WordingFinding[];
  selectedFindingId: string | null;
  onSelectFinding: (findingId: string) => void;
  onInspectPassage: (articleId: string, sentenceIndex: number) => void;
  onOpenSideBySideInspector: (finding: WordingFinding) => void;
}

export const WordingExplorer: React.FC<WordingExplorerProps> = ({
  findings,
  selectedFindingId,
  onSelectFinding,
  onInspectPassage,
  onOpenSideBySideInspector,
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filtered = filterCategory === 'all'
    ? findings
    : findings.filter((f) => f.category === filterCategory);

  return (
    <section id="wording-explorer" className="py-12 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-stone-500 mb-2">
              <span>Section 03</span>
              <span aria-hidden="true">·</span>
              <span>Lexical Framing & Wording Bias</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-stone-900 text-balance">
              Which words shape how you understand the story
            </h2>
            <p className="mt-2 text-sm sm:text-base text-stone-600">
              Subtle shifts in verbs, hedges, and adjectives alter the reader's judgment without changing raw facts.
              Click any comparison to inspect the original passage in context and decide for yourself.
            </p>
          </div>

          {/* Interactive filter tabs (functional buttons with single-line labels) */}
          <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded self-start md:self-auto shrink-0">
            <button
              onClick={() => setFilterCategory('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap cursor-pointer ${
                filterCategory === 'all'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              All Wording Findings
            </button>
            <button
              onClick={() => setFilterCategory('certainty_hedging')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap cursor-pointer ${
                filterCategory === 'certainty_hedging'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Certainty & Hedging
            </button>
            <button
              onClick={() => setFilterCategory('loaded_descriptors')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap cursor-pointer ${
                filterCategory === 'loaded_descriptors'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Loaded Descriptors
            </button>
            <button
              onClick={() => setFilterCategory('framing_attribution')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap cursor-pointer ${
                filterCategory === 'framing_attribution'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Attribution Stance
            </button>
          </div>
        </div>

        {/* Findings List */}
        <div className="space-y-8">
          {filtered.map((finding) => {
            const isSelected = selectedFindingId === finding.id;

            return (
              <div
                key={finding.id}
                id={`finding-${finding.id}`}
                className={`p-6 sm:p-8 bg-white rounded border transition-all ${
                  isSelected
                    ? 'border-stone-900 ring-1 ring-stone-900 shadow-md'
                    : 'border-stone-200/90 shadow-xs hover:border-stone-300'
                }`}
              >
                {/* Finding Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
                      <span className="font-mono uppercase font-semibold text-stone-800">
                        {finding.categoryLabel}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>Significance: {finding.significance}</span>
                    </div>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-900">
                      {finding.topic}
                    </h3>
                  </div>

                  <button
                    onClick={() => onOpenSideBySideInspector(finding)}
                    className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-stone-900 bg-stone-100 hover:bg-stone-200 rounded transition-colors self-start sm:self-auto cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-stone-700" />
                    <span>Compare Passages Side-by-Side</span>
                  </button>
                </div>

                {/* Finding Summary / Linguistic Explanation */}
                <p className="mt-4 text-sm text-stone-700 leading-relaxed max-w-4xl">
                  {finding.findingSummary}
                </p>

                {/* Side-by-Side Outlet Quotes */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  {finding.comparison.map((comp) => (
                    <div
                      key={comp.articleId}
                      className="p-4 rounded bg-stone-50 border border-stone-200/80 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs text-stone-500 pb-2 mb-2 border-b border-stone-200/50">
                          <span className="font-bold text-stone-900">{comp.outlet}</span>
                          <span className="text-[11px] font-mono">Sentence #{comp.sentenceIndex + 1}</span>
                        </div>

                        {/* Highlighted Quote */}
                        <p className="text-xs sm:text-sm font-serif italic text-stone-800 leading-relaxed mb-3">
                          "{comp.exactSentence}"
                        </p>

                        {/* Key Phrase Highlight */}
                        <div className="p-2 rounded bg-amber-50/70 border border-amber-200/60 mb-3">
                          <div className="text-[10px] font-mono uppercase text-amber-800 font-semibold mb-0.5">
                            Key Flagged Phrase
                          </div>
                          <span className="text-xs font-semibold text-amber-950">
                            {comp.keyPhrase}
                          </span>
                        </div>

                        {/* Framing Analysis */}
                        <p className="text-xs text-stone-600 leading-relaxed">
                          {comp.framingAnalysis}
                        </p>
                      </div>

                      {/* Verify In Context button */}
                      <div className="mt-4 pt-3 border-t border-stone-200/60">
                        <button
                          onClick={() => onInspectPassage(comp.articleId, comp.sentenceIndex)}
                          className="w-full text-center py-1.5 px-2 text-xs font-medium text-stone-700 hover:text-stone-900 hover:bg-stone-200/60 rounded transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View in full article</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
