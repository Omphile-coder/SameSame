import React, { useState } from 'react';
import { X, Sparkles, Newspaper, ArrowRight, Link, RefreshCw } from 'lucide-react';
import { Article } from '../types';

interface ArticleInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAnalyze: (articles: Article[], storyTitle: string) => Promise<void>;
  isLoading: boolean;
}

export const ArticleInputModal: React.FC<ArticleInputModalProps> = ({
  isOpen,
  onClose,
  onAnalyze,
  isLoading,
}) => {
  const [mode, setMode] = useState<'urls' | 'text'>('urls');
  const [storyTitle, setStoryTitle] = useState('Custom Event Comparison');
  const [numArticles, setNumArticles] = useState<2 | 3>(3);

  // URLs
  const [url1, setUrl1] = useState('https://aerotech-journal.org/news/artemis-ii-telemetry-gps');
  const [url2, setUrl2] = useState('https://dailychronicle.com/investigations/artemis-launch-gps-blackout');
  const [url3, setUrl3] = useState('https://publicsciencemonitor.com/space/artemis-ii-astronauts-orbit');

  // Text inputs
  const [outlet1, setOutlet1] = useState('AeroTech Journal');
  const [title1, setTitle1] = useState('NASA Artemis II Countdown Advances; Launch May Have Disrupted Coastal GPS Systems');
  const [text1, setText1] = useState(
    "NASA's Space Launch System rocket stood gleaming on Pad 39B as engineers completed final countdown simulations for Artemis II. Preliminary telemetry data suggested the launch may have disrupted coastal GPS systems and high-precision maritime beacons across Brevard County for approximately eighteen minutes during ascent."
  );

  const [outlet2, setOutlet2] = useState('The Daily Chronicle');
  const [title2, setTitle2] = useState("NASA's Artemis II Rocket Launch Disrupted Vital Florida GPS Signals, Aviation Officials Confirm");
  const [text2, setText2] = useState(
    "NASA's thunderous Artemis II mega-rocket liftoff disrupted vital Florida GPS signals, aviation officials confirmed on Tuesday, triggering urgent reviews from regional transportation authorities. Federal Aviation Administration advisories disclosed that precision satellite positioning receivers experienced severe lock loss within a forty-mile radius."
  );

  const [outlet3, setOutlet3] = useState('Public Science Monitor');
  const [title3, setTitle3] = useState('Four Astronauts Slated for Historic Artemis II Orbit As Minor Signal Anomaly Examined');
  const [text3, setText3] = useState(
    "Four astronauts are preparing for an unprecedented voyage around the far side of the moon on Artemis II, marking humanity's grand return to deep space exploration. Engineers registered a minor signal anomaly in coastal radio telemetry following the static fire evaluation."
  );

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const articles: Article[] = [
      {
        id: `custom-1-${Date.now()}`,
        outlet: outlet1 || 'Outlet A',
        title: title1 || 'Article 1',
        author: 'Staff Reporter',
        publishedDate: new Date().toLocaleDateString(),
        url: url1 || 'https://news.example.com/1',
        summary: text1.slice(0, 120) + '...',
        fullText: text1,
        sentences: text1.split(/(?<=[.?!])\s+/),
      },
      {
        id: `custom-2-${Date.now()}`,
        outlet: outlet2 || 'Outlet B',
        title: title2 || 'Article 2',
        author: 'Investigative Desk',
        publishedDate: new Date().toLocaleDateString(),
        url: url2 || 'https://news.example.com/2',
        summary: text2.slice(0, 120) + '...',
        fullText: text2,
        sentences: text2.split(/(?<=[.?!])\s+/),
      },
    ];

    if (numArticles === 3) {
      articles.push({
        id: `custom-3-${Date.now()}`,
        outlet: outlet3 || 'Outlet C',
        title: title3 || 'Article 3',
        author: 'Correspondent',
        publishedDate: new Date().toLocaleDateString(),
        url: url3 || 'https://news.example.com/3',
        summary: text3.slice(0, 120) + '...',
        fullText: text3,
        sentences: text3.split(/(?<=[.?!])\s+/),
      });
    }

    await onAnalyze(articles, storyTitle);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FAF8F5] rounded-lg border border-stone-300 shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-white border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Newspaper className="w-5 h-5 text-stone-900" />
            <h2 className="font-serif text-lg font-bold text-stone-900">
              Compare News Articles on the Same Event
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-900 rounded cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-stone-500 mb-1.5">
              Event / Story Title
            </label>
            <input
              type="text"
              value={storyTitle}
              onChange={(e) => setStoryTitle(e.target.value)}
              className="w-full px-3.5 py-2 bg-white rounded border border-stone-300 text-stone-900 text-sm focus:outline-hidden focus:border-stone-900"
              placeholder="e.g. Artemis II Launch & Florida GPS Disruption"
              required
            />
          </div>

          {/* Number of articles toggle */}
          <div className="flex items-center justify-between p-3 bg-white rounded border border-stone-200">
            <span className="text-xs text-stone-700 font-medium">Number of articles to compare:</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setNumArticles(2)}
                className={`px-3 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
                  numArticles === 2 ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-700'
                }`}
              >
                2 Outlets
              </button>
              <button
                type="button"
                onClick={() => setNumArticles(3)}
                className={`px-3 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
                  numArticles === 3 ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-700'
                }`}
              >
                3 Outlets (Recommended)
              </button>
            </div>
          </div>

          {/* Article 1 */}
          <div className="p-4 bg-white rounded border border-stone-200 space-y-3">
            <div className="text-xs font-mono font-semibold uppercase text-stone-800">
              Outlet 1
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                value={outlet1}
                onChange={(e) => setOutlet1(e.target.value)}
                placeholder="Outlet name (e.g. AeroTech Journal)"
                className="px-3 py-1.5 bg-stone-50 rounded border border-stone-200 text-xs text-stone-900"
                required
              />
              <input
                type="text"
                value={title1}
                onChange={(e) => setTitle1(e.target.value)}
                placeholder="Headline"
                className="px-3 py-1.5 bg-stone-50 rounded border border-stone-200 text-xs text-stone-900"
                required
              />
            </div>
            <textarea
              rows={3}
              value={text1}
              onChange={(e) => setText1(e.target.value)}
              placeholder="Paste article text or key paragraphs..."
              className="w-full px-3 py-2 bg-stone-50 rounded border border-stone-200 text-xs text-stone-800 font-serif leading-relaxed"
              required
            />
          </div>

          {/* Article 2 */}
          <div className="p-4 bg-white rounded border border-stone-200 space-y-3">
            <div className="text-xs font-mono font-semibold uppercase text-stone-800">
              Outlet 2
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                value={outlet2}
                onChange={(e) => setOutlet2(e.target.value)}
                placeholder="Outlet name (e.g. The Daily Chronicle)"
                className="px-3 py-1.5 bg-stone-50 rounded border border-stone-200 text-xs text-stone-900"
                required
              />
              <input
                type="text"
                value={title2}
                onChange={(e) => setTitle2(e.target.value)}
                placeholder="Headline"
                className="px-3 py-1.5 bg-stone-50 rounded border border-stone-200 text-xs text-stone-900"
                required
              />
            </div>
            <textarea
              rows={3}
              value={text2}
              onChange={(e) => setText2(e.target.value)}
              placeholder="Paste article text or key paragraphs..."
              className="w-full px-3 py-2 bg-stone-50 rounded border border-stone-200 text-xs text-stone-800 font-serif leading-relaxed"
              required
            />
          </div>

          {/* Article 3 */}
          {numArticles === 3 && (
            <div className="p-4 bg-white rounded border border-stone-200 space-y-3">
              <div className="text-xs font-mono font-semibold uppercase text-stone-800">
                Outlet 3
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={outlet3}
                  onChange={(e) => setOutlet3(e.target.value)}
                  placeholder="Outlet name (e.g. Public Science Monitor)"
                  className="px-3 py-1.5 bg-stone-50 rounded border border-stone-200 text-xs text-stone-900"
                  required
                />
                <input
                  type="text"
                  value={title3}
                  onChange={(e) => setTitle3(e.target.value)}
                  placeholder="Headline"
                  className="px-3 py-1.5 bg-stone-50 rounded border border-stone-200 text-xs text-stone-900"
                  required
                />
              </div>
              <textarea
                rows={3}
                value={text3}
                onChange={(e) => setText3(e.target.value)}
                placeholder="Paste article text or key paragraphs..."
                className="w-full px-3 py-2 bg-stone-50 rounded border border-stone-200 text-xs text-stone-800 font-serif leading-relaxed"
                required
              />
            </div>
          )}

          {/* Submit CTA */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-stone-600 hover:text-stone-900 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-5 py-2.5 text-sm font-medium text-white bg-stone-900 hover:bg-stone-800 rounded transition-colors shadow-sm flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Analyzing with Gemini...</span>
                </>
              ) : (
                <>
                  <span>Run Comparison Analysis</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
