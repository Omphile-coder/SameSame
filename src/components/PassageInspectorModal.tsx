import React, { useEffect } from 'react';
import { X, ExternalLink, Bookmark, CheckCircle, SplitSquareHorizontal } from 'lucide-react';
import { Article, WordingFinding } from '../types';

interface PassageInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
  selectedArticleId: string | null;
  selectedSentenceIndex: number | null;
  activeFinding?: WordingFinding | null;
}

export const PassageInspectorModal: React.FC<PassageInspectorModalProps> = ({
  isOpen,
  onClose,
  articles,
  selectedArticleId,
  selectedSentenceIndex,
  activeFinding,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // If viewing a comparative finding side-by-side
  const isComparativeMode = !!activeFinding;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FAF8F5] rounded-lg border border-stone-300 shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-white border-b border-stone-200 flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-stone-500">
              <Bookmark className="w-3.5 h-3.5 text-stone-700" />
              <span>Original Passage Verification</span>
              <span aria-hidden="true">·</span>
              <span>Decide For Yourself</span>
            </div>
            <h2 className="font-serif text-lg sm:text-xl font-bold text-stone-900 mt-0.5">
              {isComparativeMode
                ? activeFinding.topic
                : 'Article Source Reading & Context'}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded transition-colors cursor-pointer"
              aria-label="Close passage inspector"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Either Comparative Side-by-Side or In-Depth Focused Article */}
        <div className="flex-1 overflow-y-auto p-6">
          {isComparativeMode ? (
            <div className="space-y-6">
              {/* Finding overview banner */}
              <div className="p-4 bg-stone-100/90 rounded border border-stone-200">
                <div className="text-xs font-mono uppercase text-stone-500 font-semibold mb-1">
                  Analysis Summary
                </div>
                <p className="text-sm text-stone-800 leading-relaxed">
                  {activeFinding.findingSummary}
                </p>
              </div>

              {/* 3 Parallel Columns with original text passages */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {activeFinding.comparison.map((comp) => {
                  const article = articles.find((a) => a.id === comp.articleId);
                  if (!article) return null;

                  return (
                    <div
                      key={comp.articleId}
                      className="bg-white rounded border border-stone-200 p-5 flex flex-col justify-between shadow-xs"
                    >
                      <div>
                        {/* Column Header */}
                        <div className="pb-3 border-b border-stone-100 mb-4">
                          <span className="font-serif font-bold text-base text-stone-900 block">
                            {comp.outlet}
                          </span>
                          <span className="text-xs text-stone-500 line-clamp-1 mt-0.5">
                            {article.title}
                          </span>
                        </div>

                        {/* Full Article Text with Target Sentence Highlighted */}
                        <div className="space-y-3 text-xs sm:text-sm text-stone-700 font-serif leading-relaxed max-h-[380px] overflow-y-auto pr-2">
                          {article.sentences.map((sent, sIdx) => {
                            const isTarget = sIdx === comp.sentenceIndex;

                            return (
                              <p
                                key={sIdx}
                                className={`p-2 rounded transition-colors ${
                                  isTarget
                                    ? 'bg-amber-100/90 text-stone-950 font-medium border border-amber-300 shadow-xs'
                                    : 'text-stone-600'
                                }`}
                              >
                                <span className="font-mono text-[10px] text-stone-400 mr-1.5 select-none">
                                  [{sIdx + 1}]
                                </span>
                                <span>{sent}</span>
                              </p>
                            );
                          })}
                        </div>
                      </div>

                      {/* Linguistic take */}
                      <div className="mt-4 pt-3 border-t border-stone-100 bg-stone-50 p-2.5 rounded">
                        <div className="text-[10px] font-mono uppercase tracking-wider text-stone-500 font-semibold mb-1">
                          Linguistic Interpretation
                        </div>
                        <p className="text-xs text-stone-700">
                          {comp.framingAnalysis}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Single Article Full Context Inspector */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: List of articles to switch between */}
              <div className="lg:col-span-4 space-y-3">
                <div className="text-xs font-mono uppercase tracking-wider text-stone-500 mb-2">
                  Select Article To Inspect
                </div>
                {articles.map((art) => {
                  const isCurrent = art.id === selectedArticleId;
                  return (
                    <button
                      key={art.id}
                      onClick={() => {
                        // Switch article
                      }}
                      className={`w-full text-left p-3.5 rounded border transition-colors cursor-pointer ${
                        isCurrent
                          ? 'bg-stone-900 text-stone-50 border-stone-900'
                          : 'bg-white text-stone-800 border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-semibold">{art.outlet}</span>
                        <span className={isCurrent ? 'text-stone-300' : 'text-stone-400'}>
                          {art.publishedDate.split(',')[0]}
                        </span>
                      </div>
                      <p className={`text-xs line-clamp-2 ${isCurrent ? 'text-stone-200' : 'text-stone-600'}`}>
                        {art.title}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Right Column: Full Article Text with Sentence Highlighting */}
              <div className="lg:col-span-8 bg-white rounded border border-stone-200 p-6">
                {(() => {
                  const currentArt =
                    articles.find((a) => a.id === selectedArticleId) || articles[0];

                  return (
                    <div>
                      <div className="pb-4 border-b border-stone-100 mb-6">
                        <div className="text-xs text-stone-500 font-mono mb-1">
                          {currentArt.outlet} · By {currentArt.author}
                        </div>
                        <h3 className="font-serif text-xl font-bold text-stone-900">
                          {currentArt.title}
                        </h3>
                      </div>

                      <div className="space-y-4 max-h-[460px] overflow-y-auto pr-3 font-serif text-sm leading-relaxed text-stone-800">
                        {currentArt.sentences.map((sent, idx) => {
                          const isHighlighted = idx === selectedSentenceIndex;

                          return (
                            <p
                              key={idx}
                              className={`p-2.5 rounded transition-colors ${
                                isHighlighted
                                  ? 'bg-amber-100 text-stone-950 font-medium border border-amber-300 shadow-xs'
                                  : 'text-stone-700'
                              }`}
                            >
                              <span className="font-mono text-xs text-stone-400 mr-2 select-none">
                                #{idx + 1}
                              </span>
                              <span>{sent}</span>
                            </p>
                          );
                        })}
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-white border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
          <span>Verification guarantee: passages are extracted verbatim from the original texts.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium text-stone-900 bg-stone-100 hover:bg-stone-200 rounded transition-colors cursor-pointer"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
