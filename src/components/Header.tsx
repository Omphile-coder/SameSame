import React from 'react';
import { Newspaper, Scale, Sparkles, BookOpen } from 'lucide-react';

interface HeaderProps {
  activeTab: 'demo' | 'wording' | 'basil' | 'citations';
  setActiveTab: (tab: 'demo' | 'wording' | 'basil' | 'citations') => void;
  onOpenCompareModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenCompareModal,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark (single line, no descriptor tag) */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('demo');
            }}
            className="flex items-center gap-2.5 text-stone-900 group"
          >
            <div className="w-8 h-8 rounded border border-stone-900/15 flex items-center justify-center bg-stone-900 text-stone-50 font-serif font-bold text-lg shadow-sm">
              S
            </div>
            <span className="font-serif text-xl font-bold tracking-tight text-stone-900 group-hover:text-stone-700 transition-colors whitespace-nowrap">
              Same Story
            </span>
          </a>
        </div>

        {/* Zone 2: Navigation Links (single-line, clean hover underlines) */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
          <button
            onClick={() => setActiveTab('demo')}
            className={`whitespace-nowrap transition-colors pb-1 border-b-2 cursor-pointer ${
              activeTab === 'demo'
                ? 'text-stone-950 border-stone-900 font-semibold'
                : 'border-transparent hover:text-stone-900 hover:border-stone-300'
            }`}
          >
            Artemis II Demo
          </button>
          <button
            onClick={() => setActiveTab('wording')}
            className={`whitespace-nowrap transition-colors pb-1 border-b-2 cursor-pointer ${
              activeTab === 'wording'
                ? 'text-stone-950 border-stone-900 font-semibold'
                : 'border-transparent hover:text-stone-900 hover:border-stone-300'
            }`}
          >
            Wording & Framing
          </button>
          <button
            onClick={() => setActiveTab('basil')}
            className={`whitespace-nowrap transition-colors pb-1 border-b-2 cursor-pointer ${
              activeTab === 'basil'
                ? 'text-stone-950 border-stone-900 font-semibold'
                : 'border-transparent hover:text-stone-900 hover:border-stone-300'
            }`}
          >
            BASIL Benchmark
          </button>
          <button
            onClick={() => setActiveTab('citations')}
            className={`whitespace-nowrap transition-colors pb-1 border-b-2 cursor-pointer ${
              activeTab === 'citations'
                ? 'text-stone-950 border-stone-900 font-semibold'
                : 'border-transparent hover:text-stone-900 hover:border-stone-300'
            }`}
          >
            Citation Audit
          </button>
        </nav>

        {/* Zone 3: 1 Primary CTA Button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenCompareModal}
            className="px-4 py-2 text-sm font-medium text-stone-50 bg-stone-900 hover:bg-stone-800 rounded transition-colors shadow-sm whitespace-nowrap cursor-pointer flex items-center gap-2"
          >
            <Newspaper className="w-4 h-4" />
            <span>Compare Articles</span>
          </button>
        </div>
      </div>
    </header>
  );
};
