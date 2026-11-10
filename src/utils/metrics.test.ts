import test from 'node:test';
import assert from 'node:assert/strict';
import {
  splitIntoSentences,
  computePrecisionRecallF1,
  classifySentence,
  evaluateSentenceAnnotations,
  verifyCitationInSource,
} from './metrics';

test('splitIntoSentences cleanly divides paragraph text into sentences', () => {
  const paragraph = 'NASA launched the Artemis II rocket yesterday. Observers in Florida reported bright skies! Did the signals waver? Indeed they did.';
  const sentences = splitIntoSentences(paragraph);
  assert.equal(sentences.length, 4);
  assert.equal(sentences[0], 'NASA launched the Artemis II rocket yesterday.');
  assert.equal(sentences[1], 'Observers in Florida reported bright skies!');
});

test('classifySentence returns proper confusion matrix quadrant', () => {
  assert.equal(classifySentence(true, true), 'TP');
  assert.equal(classifySentence(false, true), 'FP');
  assert.equal(classifySentence(true, false), 'FN');
  assert.equal(classifySentence(false, false), 'TN');
});

test('computePrecisionRecallF1 calculates correct percentages', () => {
  // TP = 8, FP = 2, FN = 2, TN = 88
  // Total flagged = 10, Precision = 8/10 = 80.0%
  // Total human = 10, Recall = 8/10 = 80.0%
  // F1 = 80.0%
  const metrics = computePrecisionRecallF1(8, 2, 2, 88);
  assert.equal(metrics.precision, 80.0);
  assert.equal(metrics.recall, 80.0);
  assert.equal(metrics.f1, 80.0);
  assert.equal(metrics.totalSentences, 100);
});

test('computePrecisionRecallF1 handles zero division gracefully', () => {
  const zeroMetrics = computePrecisionRecallF1(0, 0, 0, 10);
  assert.equal(zeroMetrics.precision, 0);
  assert.equal(zeroMetrics.recall, 0);
  assert.equal(zeroMetrics.f1, 0);
});

test('evaluateSentenceAnnotations computes records and totals accurately', () => {
  const sentences = [
    'The rocket was rolled out on Tuesday.',
    'Critics immediately attacked the bloated budget.', // human-marked bias
    'Engineers checked all fuel lines.',
    'The reckless launch may have disrupted GPS navigation.', // human-marked bias
  ];
  const groundTruth = new Set([1, 3]);
  const predicted = new Set([1, 2, 3]); // flagged 1, 2, 3 -> TP: 1, 3; FP: 2; FN: 0; TN: 0

  const result = evaluateSentenceAnnotations(
    'story-1',
    'Artemis II Launch',
    'Chronicle',
    sentences,
    groundTruth,
    predicted
  );

  assert.equal(result.records.length, 4);
  assert.equal(result.metrics.truePositives, 2);
  assert.equal(result.metrics.falsePositives, 1);
  assert.equal(result.metrics.falseNegatives, 0);
  assert.equal(result.metrics.trueNegatives, 1);
  // Precision = 2 / 3 = 66.7%
  assert.equal(result.metrics.precision, 66.7);
  // Recall = 2 / 2 = 100%
  assert.equal(result.metrics.recall, 100.0);
});

test('verifyCitationInSource accurately checks verbatim passages', () => {
  const source = 'The launch may have disrupted GPS navigation along the Atlantic coast.';
  const citation1 = 'launch may have disrupted GPS navigation';
  const citation2 = 'the rocket destroyed all navigation satellites';

  const res1 = verifyCitationInSource(citation1, source);
  assert.equal(res1.isVerbatim, true);
  assert.equal(res1.overlapScore, 1.0);

  const res2 = verifyCitationInSource(citation2, source);
  assert.equal(res2.isVerbatim, false);
  assert.ok(res2.overlapScore < 0.5);
});
