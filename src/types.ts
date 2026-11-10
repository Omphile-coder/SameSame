export interface Article {
  id: string;
  outlet: string;
  biasRating?: 'Lean Left' | 'Center' | 'Lean Right';
  title: string;
  author: string;
  publishedDate: string;
  url: string;
  summary: string;
  fullText: string;
  sentences: string[];
}

export interface CitationReference {
  articleId: string;
  outlet: string;
  sentenceIndex: number;
  quote: string;
}

export interface ConsensusPoint {
  id: string;
  claim: string;
  explanation: string;
  citations: CitationReference[];
  confidence: number;
}

export interface OutletEmphasis {
  articleId: string;
  outlet: string;
  headline: string;
  primaryAngle: string;
  emphasizedThemes: string[];
  omittedOrDownplayed: string;
  stanceTone: string;
  representativeQuote: {
    sentenceIndex: number;
    quote: string;
  };
}

export interface WordingComparisonOutlet {
  articleId: string;
  outlet: string;
  keyPhrase: string;
  sentenceIndex: number;
  exactSentence: string;
  framingAnalysis: string;
}

export interface WordingFinding {
  id: string;
  topic: string;
  category: 'certainty_hedging' | 'loaded_descriptors' | 'framing_attribution' | 'emotional_valence';
  categoryLabel: string;
  significance: 'High' | 'Medium' | 'Subtle';
  findingSummary: string;
  comparison: WordingComparisonOutlet[];
}

export interface ComparisonAnalysis {
  storyTitle: string;
  lastUpdated: string;
  articles: Article[];
  consensus: ConsensusPoint[];
  outletEmphasis: OutletEmphasis[];
  wordingFindings: WordingFinding[];
}

// BASIL Benchmark & Prompt Lab Types
export interface BasilAnnotation {
  sentenceIndex: number;
  sentenceText: string;
  hasLexicalBias: boolean; // Ground-truth human-annotated wording bias
  biasType?: 'lexical' | 'informational' | 'both';
  targetPhrases?: string[];
  annotatorNotes?: string;
}

export interface BasilArticle extends Article {
  annotations: BasilAnnotation[];
}

export interface BasilStory {
  id: string;
  topic: string;
  title: string;
  split: 'refinement' | 'test'; // Prompt tuning split vs frozen test split
  articles: BasilArticle[];
}

export interface SentenceEvaluationRecord {
  storyId: string;
  storyTitle: string;
  articleOutlet: string;
  sentenceIndex: number;
  sentenceText: string;
  humanMarked: boolean;
  modelFlagged: boolean;
  classification: 'TP' | 'FP' | 'FN' | 'TN';
  modelReasoning?: string;
  flaggedPhrases?: string[];
}

export interface BasilBenchmarkMetrics {
  precision: number;
  recall: number;
  f1: number;
  truePositives: number;
  falsePositives: number;
  falseNegatives: number;
  trueNegatives: number;
  totalSentences: number;
  humanMarkedCount: number;
  modelFlaggedCount: number;
}

export interface SummaryCitationAuditRecord {
  id: string;
  claim: string;
  outlet: string;
  citedPassage: string;
  sourceSentenceIndex: number;
  verbatimMatch: boolean;
  overlapScore: number;
  auditorVerification: 'Verified Accurate' | 'Minor Discrepancy' | 'Unsubstantiated';
  auditorNotes: string;
}

export interface BasilEvaluationRun {
  runId: string;
  timestamp: string;
  promptVersion: string;
  splitEvaluated: 'refinement' | 'test' | 'all';
  metrics: BasilBenchmarkMetrics;
  records: SentenceEvaluationRecord[];
  citationAudits: SummaryCitationAuditRecord[];
}
