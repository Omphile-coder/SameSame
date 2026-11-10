import React, { useState } from 'react';
import { Target, CheckCircle2, AlertTriangle, HelpCircle, Layers, Check, X, Filter } from 'lucide-react';
import { BasilStory, BasilEvaluationRun, SentenceEvaluationRecord } from '../types';

interface BasilBenchmarkViewProps {
  stories: BasilStory[];
  runData: BasilEvaluationRun;
}

export const BasilBenchmarkView: React.FC<BasilBenchmarkViewProps> = ({
  stories,
  runData,
}) => {
  const [selectedStoryId, setSelectedStoryId] = useState<string>('all');
  const [filterClassification, setFilterClassification] = useState<string>('all');

  const { metrics, records } = runData;

  const filteredRecords = records.filter((r) => {
    if (selectedStoryId !== 'all' && r.storyId !== selectedStoryId) return false;
    if (filterClassification !== 'all' && r.classification !== filterClassification) return false;
    return true;
  });

  return (
    <section className="py-12 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-8">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-stone-500 mb-2">
            <span>Evaluation Lab</span>
            <span aria-hidden="true">·</span>
            <span>BASIL Linguistic Benchmark</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-stone-900 text-balance">
            How we measure wording flags: The BASIL benchmark
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed">
            We use a few BASIL (Bias Annotation Spans on Informational Lexicon) stories to refine our prompt, then freeze the prompt and test on completely separate stories. We measure precision (how many of our flags matched human markings) and recall (how many human-marked sentences we caught).
          </p>
        </div>

        {/* Methodology Strip: Refinement vs Frozen Test Set */}
        <div className="mb-10 p-6 bg-white rounded border border-stone-200/90 shadow-xs grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border-b md:border-b-0 md:border-r border-stone-200 pb-6 md:pb-0 md:pr-6">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-stone-600 uppercase mb-2">
              <span className="w-2 h-2 rounded-full bg-stone-400" />
              <span>Phase 1: Prompt Refinement Set</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              We analyzed linguistic nuances in BASIL calibration stories (such as the Paris Climate Accord withdrawal) to tune detection thresholds, distinguishing legitimate editorial reporting verbs from subtle evaluative wording.
            </p>
            <div className="mt-3 text-xs text-stone-500 font-medium">
              Calibrated: 1 story · 2 outlets · Prompt frozen at v1.2
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-stone-900 uppercase mb-2">
              <span className="w-2 h-2 rounded-full bg-stone-900" />
              <span>Phase 2: Frozen Prompt Evaluation (Test Set)</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              The prompt is frozen and evaluated against previously unseen test stories (Kavanaugh hearings and the Border Emergency Declaration). Model sentence flags are compared strictly against human linguist ground truth.
            </p>
            <div className="mt-3 text-xs text-stone-900 font-medium font-mono">
              Status: FROZEN · 30 Sentences Evaluated across 6 Outlets
            </div>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {/* Precision */}
          <div className="p-6 bg-white rounded border border-stone-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                <span className="font-mono uppercase font-semibold text-stone-600">Precision</span>
                <span className="text-[11px] text-stone-400">{metrics.truePositives}/{metrics.modelFlaggedCount} matches</span>
              </div>
              <div className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
                {metrics.precision}%
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-100 text-xs text-stone-600">
              How many of our wording flags matched human annotations.
            </div>
          </div>

          {/* Recall */}
          <div className="p-6 bg-white rounded border border-stone-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                <span className="font-mono uppercase font-semibold text-stone-600">Recall</span>
                <span className="text-[11px] text-stone-400">{metrics.truePositives}/{metrics.humanMarkedCount} caught</span>
              </div>
              <div className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
                {metrics.recall}%
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-100 text-xs text-stone-600">
              How many human-marked sentences we caught.
            </div>
          </div>

          {/* F1 Score */}
          <div className="p-6 bg-white rounded border border-stone-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                <span className="font-mono uppercase font-semibold text-stone-600">F1 Score</span>
                <span className="text-[11px] text-stone-400">Harmonic Mean</span>
              </div>
              <div className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
                {metrics.f1}%
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-100 text-xs text-stone-600">
              Balanced detection score across precision and recall.
            </div>
          </div>

          {/* Confusion Matrix Summary */}
          <div className="p-6 bg-white rounded border border-stone-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono uppercase font-semibold text-stone-600 mb-2">
                Confusion Breakdown
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2 bg-emerald-50 rounded text-emerald-900">
                  <span className="text-[10px] text-emerald-700 block">TP (Matched)</span>
                  <span className="font-bold text-base">{metrics.truePositives}</span>
                </div>
                <div className="p-2 bg-amber-50 rounded text-amber-900">
                  <span className="text-[10px] text-amber-700 block">FP (Overflag)</span>
                  <span className="font-bold text-base">{metrics.falsePositives}</span>
                </div>
                <div className="p-2 bg-rose-50 rounded text-rose-900">
                  <span className="text-[10px] text-rose-700 block">FN (Missed)</span>
                  <span className="font-bold text-base">{metrics.falseNegatives}</span>
                </div>
                <div className="p-2 bg-stone-50 rounded text-stone-900">
                  <span className="text-[10px] text-stone-600 block">TN (Neutral)</span>
                  <span className="font-bold text-base">{metrics.trueNegatives}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Controls for Sentence Explorer */}
        <div className="bg-white rounded border border-stone-200 p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100 mb-6">
            <div>
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Sentence-by-Sentence Evaluation Records
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Inspect every sentence from the held-out test stories comparing human markings against model predictions.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Classification filter */}
              <div className="flex items-center gap-1 p-1 bg-stone-100 rounded text-xs font-medium">
                <button
                  onClick={() => setFilterClassification('all')}
                  className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap cursor-pointer ${
                    filterClassification === 'all'
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  All ({records.length})
                </button>
                <button
                  onClick={() => setFilterClassification('TP')}
                  className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap cursor-pointer ${
                    filterClassification === 'TP'
                      ? 'bg-emerald-100 text-emerald-950 font-semibold shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  TP Matched ({metrics.truePositives})
                </button>
                <button
                  onClick={() => setFilterClassification('FP')}
                  className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap cursor-pointer ${
                    filterClassification === 'FP'
                      ? 'bg-amber-100 text-amber-950 font-semibold shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  FP Overflags ({metrics.falsePositives})
                </button>
                <button
                  onClick={() => setFilterClassification('FN')}
                  className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap cursor-pointer ${
                    filterClassification === 'FN'
                      ? 'bg-rose-100 text-rose-950 font-semibold shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  FN Missed ({metrics.falseNegatives})
                </button>
              </div>
            </div>
          </div>

          {/* Records Table / Cards */}
          <div className="space-y-3">
            {filteredRecords.map((rec, rIdx) => {
              const badgeStyle =
                rec.classification === 'TP'
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : rec.classification === 'FP'
                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                  : rec.classification === 'FN'
                  ? 'bg-rose-50 text-rose-800 border-rose-200'
                  : 'bg-stone-50 text-stone-700 border-stone-200';

              const classificationLabel =
                rec.classification === 'TP'
                  ? 'True Positive (Flag Matched Human Mark)'
                  : rec.classification === 'FP'
                  ? 'False Positive (Model Flagged, Human Disagreed)'
                  : rec.classification === 'FN'
                  ? 'False Negative (Human Marked, Model Missed)'
                  : 'True Negative (Both Agreed Factual)';

              return (
                <div
                  key={rIdx}
                  className="p-4 rounded border border-stone-200/80 bg-stone-50/50 hover:bg-stone-50 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-stone-900">{rec.articleOutlet}</span>
                      <span className="text-stone-400">·</span>
                      <span className="text-stone-500 font-mono">Sentence #{rec.sentenceIndex + 1}</span>
                      <span className="text-stone-400">·</span>
                      <span className="text-stone-500">{rec.storyTitle}</span>
                    </div>

                    <div className={`px-2.5 py-0.5 rounded text-[11px] font-mono font-medium border ${badgeStyle} self-start sm:self-auto`}>
                      {classificationLabel}
                    </div>
                  </div>

                  <p className="text-sm font-serif text-stone-900 leading-relaxed mb-2">
                    "{rec.sentenceText}"
                  </p>

                  {/* Flagged Phrases & Reasoning */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-xs text-stone-600 pt-2 border-t border-stone-200/50">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-[10px] text-stone-400 uppercase">Human Marked:</span>
                      <span className={rec.humanMarked ? 'font-semibold text-amber-900' : 'text-stone-500'}>
                        {rec.humanMarked ? 'Yes (Lexical Bias)' : 'No (Factual)'}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-[10px] text-stone-400 uppercase">Model Flagged:</span>
                      <span className={rec.modelFlagged ? 'font-semibold text-stone-900' : 'text-stone-500'}>
                        {rec.modelFlagged ? 'Yes' : 'No'}
                      </span>
                    </div>

                    {rec.flaggedPhrases && rec.flaggedPhrases.length > 0 && (
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-[10px] text-stone-400 uppercase">Target Phrases:</span>
                        <span className="font-mono text-[11px] bg-white px-1.5 py-0.5 rounded border border-stone-200 text-stone-800">
                          {rec.flaggedPhrases.join(', ')}
                        </span>
                      </div>
                    )}

                    {rec.modelReasoning && (
                      <div className="text-stone-500 text-xs italic">
                        {rec.modelReasoning}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
