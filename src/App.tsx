import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ArtemisHero } from './components/ArtemisHero';
import { ConsensusView } from './components/ConsensusView';
import { EmphasisMatrix } from './components/EmphasisMatrix';
import { WordingExplorer } from './components/WordingExplorer';
import { PassageInspectorModal } from './components/PassageInspectorModal';
import { ArticleInputModal } from './components/ArticleInputModal';
import { BasilBenchmarkView } from './components/BasilBenchmarkView';
import { CitationAuditView } from './components/CitationAuditView';
import { artemisArticles, artemisAnalysisDemo } from './data/artemisStory';
import { basilBenchmarkStories, baselineFrozenRun } from './data/basilStories';
import { ComparisonAnalysis, Article, WordingFinding } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'demo' | 'wording' | 'basil' | 'citations'>('demo');
  const [analysis, setAnalysis] = useState<ComparisonAnalysis>(artemisAnalysisDemo);
  const [selectedFindingId, setSelectedFindingId] = useState<string | null>('wf-gps-headline');
  
  // Modals state
  const [passageModalOpen, setPassageModalOpen] = useState(false);
  const [compareModalOpen, setCompareModalOpen] = useState(false);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>('artemis-aerotech');
  const [selectedSentenceIndex, setSelectedSentenceIndex] = useState<number | null>(3);
  const [activeFindingForModal, setActiveFindingForModal] = useState<WordingFinding | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Handle clicking a specific finding (e.g. from hero or list)
  const handleSelectFinding = (findingId: string) => {
    setSelectedFindingId(findingId);
    const finding = analysis.wordingFindings.find((f) => f.id === findingId);
    if (finding) {
      setActiveFindingForModal(finding);
      setPassageModalOpen(true);
    }
  };

  // Handle clicking an individual sentence citation
  const handleInspectPassage = (articleId: string, sentenceIndex: number) => {
    setSelectedArticleId(articleId);
    setSelectedSentenceIndex(sentenceIndex);
    setActiveFindingForModal(null); // focused article view
    setPassageModalOpen(true);
  };

  // Handle opening comparative side-by-side inspector for a whole finding
  const handleOpenSideBySideInspector = (finding: WordingFinding) => {
    setActiveFindingForModal(finding);
    setPassageModalOpen(true);
  };

  // Handle custom comparison submission
  const handleAnalyzeArticles = async (articles: Article[], storyTitle: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/analyze-articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ articles, storyTitle }),
      });
      if (response.ok) {
        const data = await response.json();
        setAnalysis(data);
        setActiveTab('demo');
        setSelectedFindingId(data.wordingFindings[0]?.id || null);
      }
    } catch (err) {
      console.error('Failed to analyze articles:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900 font-sans selection:bg-stone-900 selection:text-white">
      {/* 3-Zone Header Contract */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenCompareModal={() => setCompareModalOpen(true)}
      />

      <main className="flex-1">
        {/* Main Demo Tab: Artemis II Journey */}
        {activeTab === 'demo' && (
          <>
            <ArtemisHero
              articles={analysis.articles}
              onSelectFinding={handleSelectFinding}
              onOpenCompareModal={() => setCompareModalOpen(true)}
            />
            <ConsensusView
              consensus={analysis.consensus}
              onInspectPassage={handleInspectPassage}
            />
            <EmphasisMatrix
              outletEmphasis={analysis.outletEmphasis}
              onInspectPassage={handleInspectPassage}
            />
            <WordingExplorer
              findings={analysis.wordingFindings}
              selectedFindingId={selectedFindingId}
              onSelectFinding={handleSelectFinding}
              onInspectPassage={handleInspectPassage}
              onOpenSideBySideInspector={handleOpenSideBySideInspector}
            />
          </>
        )}

        {/* Wording & Framing Tab */}
        {activeTab === 'wording' && (
          <div className="py-8">
            <div className="max-w-7xl mx-auto px-6 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="font-serif text-3xl font-bold text-stone-900">
                    Lexical Framing & Wording Bias Explorer
                  </h1>
                  <p className="text-sm text-stone-600 mt-1">
                    Examine how subtle word choices like "may have disrupted" vs "disrupted" alter epistemic certainty.
                  </p>
                </div>
              </div>
            </div>
            <WordingExplorer
              findings={analysis.wordingFindings}
              selectedFindingId={selectedFindingId}
              onSelectFinding={handleSelectFinding}
              onInspectPassage={handleInspectPassage}
              onOpenSideBySideInspector={handleOpenSideBySideInspector}
            />
          </div>
        )}

        {/* BASIL Benchmark Tab */}
        {activeTab === 'basil' && (
          <BasilBenchmarkView
            stories={basilBenchmarkStories}
            runData={baselineFrozenRun}
          />
        )}

        {/* Citation Audit Tab */}
        {activeTab === 'citations' && (
          <CitationAuditView
            audits={baselineFrozenRun.citationAudits}
            onInspectPassage={(outlet, sentenceIndex) => {
              // Open inspector
            }}
          />
        )}
      </main>

      {/* Editorial Footer */}
      <footer className="border-t border-stone-200 bg-white py-10 text-stone-500 text-xs">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-serif font-bold text-stone-900 text-sm">Same Story</span>
            <span>·</span>
            <span>AI-powered news comparison & lexical bias benchmarking</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setActiveTab('demo')}
              className="hover:text-stone-900 transition-colors cursor-pointer"
            >
              Artemis II Demo
            </button>
            <button
              onClick={() => setActiveTab('basil')}
              className="hover:text-stone-900 transition-colors cursor-pointer"
            >
              BASIL Methodology
            </button>
            <button
              onClick={() => setActiveTab('citations')}
              className="hover:text-stone-900 transition-colors cursor-pointer"
            >
              Provenance & Citations
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <PassageInspectorModal
        isOpen={passageModalOpen}
        onClose={() => {
          setPassageModalOpen(false);
          setActiveFindingForModal(null);
        }}
        articles={analysis.articles}
        selectedArticleId={selectedArticleId}
        selectedSentenceIndex={selectedSentenceIndex}
        activeFinding={activeFindingForModal}
      />

      <ArticleInputModal
        isOpen={compareModalOpen}
        onClose={() => setCompareModalOpen(false)}
        onAnalyze={handleAnalyzeArticles}
        isLoading={isLoading}
      />
    </div>
  );
}
