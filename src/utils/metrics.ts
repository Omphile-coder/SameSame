import { BasilBenchmarkMetrics, SentenceEvaluationRecord } from '../types';

/**
 * Splits text into clean sentences, preserving punctuation.
 */
export function splitIntoSentences(text: string): string[] {
  if (!text || text.trim().length === 0) return [];
  // Standard sentence boundary regex that handles abbreviations reasonably
  const normalized = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const rawSentences = normalized
    .split(/(?<=[.?!])\s+(?=[A-Z0-9"'])/g)
    .map(s => s.trim())
    .filter(s => s.length > 0);

  return rawSentences;
}

/**
 * Computes precision, recall, and F1 given counts of TP, FP, FN, TN.
 */
export function computePrecisionRecallF1(
  truePositives: number,
  falsePositives: number,
  falseNegatives: number,
  trueNegatives: number
): BasilBenchmarkMetrics {
  const totalSentences = truePositives + falsePositives + falseNegatives + trueNegatives;
  const humanMarkedCount = truePositives + falseNegatives;
  const modelFlaggedCount = truePositives + falsePositives;

  const precision = modelFlaggedCount > 0 ? truePositives / modelFlaggedCount : 0;
  const recall = humanMarkedCount > 0 ? truePositives / humanMarkedCount : 0;
  const f1 = precision + recall > 0 ? (2 * precision * recall) / (precision + recall) : 0;

  return {
    precision: Number((precision * 100).toFixed(1)),
    recall: Number((recall * 100).toFixed(1)),
    f1: Number((f1 * 100).toFixed(1)),
    truePositives,
    falsePositives,
    falseNegatives,
    trueNegatives,
    totalSentences,
    humanMarkedCount,
    modelFlaggedCount,
  };
}

/**
 * Classifies a sentence comparison into TP, FP, FN, or TN.
 */
export function classifySentence(
  humanMarked: boolean,
  modelFlagged: boolean
): 'TP' | 'FP' | 'FN' | 'TN' {
  if (humanMarked && modelFlagged) return 'TP';
  if (!humanMarked && modelFlagged) return 'FP';
  if (humanMarked && !modelFlagged) return 'FN';
  return 'TN';
}

/**
 * Evaluates model-flagged sentence indices against ground truth annotations.
 */
export function evaluateSentenceAnnotations(
  storyId: string,
  storyTitle: string,
  articleOutlet: string,
  sentences: string[],
  groundTruthIndices: Set<number>,
  predictedIndices: Set<number>,
  modelExplanations?: Map<number, string>
): { metrics: BasilBenchmarkMetrics; records: SentenceEvaluationRecord[] } {
  let tp = 0;
  let fp = 0;
  let fn = 0;
  let tn = 0;

  const records: SentenceEvaluationRecord[] = sentences.map((sentenceText, index) => {
    const humanMarked = groundTruthIndices.has(index);
    const modelFlagged = predictedIndices.has(index);
    const classification = classifySentence(humanMarked, modelFlagged);

    if (classification === 'TP') tp++;
    else if (classification === 'FP') fp++;
    else if (classification === 'FN') fn++;
    else tn++;

    return {
      storyId,
      storyTitle,
      articleOutlet,
      sentenceIndex: index,
      sentenceText,
      humanMarked,
      modelFlagged,
      classification,
      modelReasoning: modelExplanations?.get(index),
    };
  });

  const metrics = computePrecisionRecallF1(tp, fp, fn, tn);
  return { metrics, records };
}

/**
 * Verifies if a cited passage actually appears in the source text,
 * computing a character/token overlap score to audit citations against hallucinations.
 */
export function verifyCitationInSource(
  citedPassage: string,
  sourceText: string
): { isVerbatim: boolean; overlapScore: number; foundIndex: number } {
  if (!citedPassage || !sourceText) {
    return { isVerbatim: false, overlapScore: 0, foundIndex: -1 };
  }

  const cleanCitation = citedPassage.trim().toLowerCase();
  const cleanSource = sourceText.toLowerCase();

  // 1. Direct exact or substring match
  const exactPos = cleanSource.indexOf(cleanCitation);
  if (exactPos !== -1) {
    return { isVerbatim: true, overlapScore: 1.0, foundIndex: exactPos };
  }

  // 2. Token overlap (Jaccard similarity)
  const citeTokens = new Set(
    cleanCitation.replace(/[^\w\s]/g, '').split(/\s+/).filter(t => t.length > 2)
  );
  const sourceTokens = new Set(
    cleanSource.replace(/[^\w\s]/g, '').split(/\s+/).filter(t => t.length > 2)
  );

  let intersection = 0;
  for (const token of citeTokens) {
    if (sourceTokens.has(token)) {
      intersection++;
    }
  }

  const overlapScore = citeTokens.size > 0 ? Number((intersection / citeTokens.size).toFixed(2)) : 0;
  return {
    isVerbatim: overlapScore >= 0.95,
    overlapScore,
    foundIndex: -1,
  };
}
