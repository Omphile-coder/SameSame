import { BasilStory, BasilEvaluationRun } from '../types';
import { splitIntoSentences } from '../utils/metrics';

// Test Story 1: Brett Kavanaugh Supreme Court Confirmation Hearings
const kavanaughFoxText = `Judge Brett Kavanaugh delivered an impassioned and righteous defense of his character on Thursday, forcefully rejecting what he termed an orchestrated political hit by Senate Democrats.

Facing days of unrelenting and uncorroborated smears, the nominee spoke with raw emotion about the devastation inflicted upon his family and daughters.

Kavanaugh presented detailed calendar entries and personal notebooks from 1982 demonstrating his whereabouts during the summer in question.

Committee Republicans rallied behind the distinguished jurist, condemning the opposition's eleventh-hour ambush as a disgrace to the Senate's constitutional confirmation responsibilities.

The Senate Judiciary Committee subsequently voted along party lines to advance his nomination to the full chamber for final confirmation.`;

const kavanaughNytText = `Judge Brett M. Kavanaugh mounted an extraordinarily combative and partisan testimony on Thursday, defying traditional judicial restraint as he sought to salvage his Supreme Court nomination.

Appearing visibly agitated and frequently interrupting Democratic senators, Judge Kavanaugh accused his critics of acting out of revenge on behalf of the Clintons.

Dr. Christine Blasey Ford had testified earlier in the day with quiet poise, detailing her vivid recollection of what she described as a sexual assault in high school.

The hearing transfixed the nation, laying bare deep ideological fractures and prompting questions among legal scholars about whether the nominee possesses the temperament required for the nation's highest bench.

The panel later agreed to allow a limited, weeklong FBI supplemental inquiry into the allegations before a final floor vote.`;

const kavanaughHuffPostText = `An unhinged and belligerent Brett Kavanaugh lashed out at senators on Thursday, putting on an alarming display of entitlement that proved he is utterly unfit to sit on the Supreme Court.

Instead of answering straightforward questions about serious sexual assault allegations, Kavanaugh wept, sneered, and parroted far-right conspiracy theories about left-wing revenge plots.

His venomous performance stood in stark contrast to Dr. Christine Blasey Ford's courageous, measured, and devastating testimony just hours earlier.

Republicans on the committee rushed to protect their embattled candidate, railroading the nomination forward while suppressing calls for a thorough law enforcement investigation.

Protesters filled the Capitol corridors, chanting against what civil rights leaders condemned as a sham process designed to install an extremist judge.`;

// Test Story 2: Border Emergency Declaration
const borderFoxText = `President Trump on Friday officially declared a national emergency along the southern border to confront what border patrol chiefs described as an unprecedented humanitarian and national security crisis.

The executive action unlocks approximately $8 billion in federal military construction funds to build crucial steel barrier walls in high-traffic drug smuggling corridors.

Cartels and human trafficking syndicates have exploited gaps in existing fencing, overwhelming local border agents with massive migrant caravans.

Liberal state attorneys general vowed immediate lawsuits to block the border security funds, despite clear statutory authority granted to the commander-in-chief under the 1976 National Emergencies Act.

White House officials confirmed that construction on priority border sectors in the Rio Grande Valley would begin within weeks.`;

const borderNytText = `President Donald J. Trump bypassed Congress on Friday to declare a national emergency at the southern border, asserting expansive executive powers in a legally questionable maneuver to construct his promised border wall.

The move followed a bruising legislative standoff that shuttered the federal government for 35 days, culminating in a bipartisan spending deal that explicitly rejected the president's wall funding demands.

Constitutional scholars and Democratic lawmakers denounced the declaration as a dangerous usurpation of Congress's core power of the purse.

A coalition of sixteen states led by California filed a federal lawsuit in San Francisco arguing that the administration manufactured a false emergency to divert funds previously appropriated by lawmakers.

Republican leaders in Congress offered mixed reactions, with several expressing misgivings about the precedent an unchecked emergency declaration sets for future Democratic administrations.`;

const borderHuffPostText = `In a brazen and authoritarian power grab, Donald Trump fabricated a phony national emergency on Friday to steal billions in taxpayer dollars for his racist border wall boondoggle.

Having failed miserably to coerce Mexico or Congress into funding his signature vanity project, the embattled president resorted to an unconstitutional executive fiat.

Immigrant rights advocates pointed out that border apprehensions remain near historic lows and that Trump's manufactured crisis is designed purely to inflame xenophobic hysteria among his political base.

Democratic leaders Nancy Pelosi and Chuck Schumer vowed to introduce a joint resolution of disapproval to overturn the illegitimate emergency declaration immediately.

Legal experts widely expect federal courts to strike down the administration's brazen end-run around the Constitution.`;

// Refinement Story: Paris Climate Accord
const parisFoxText = `President Trump announced the United States will withdraw from the Paris Climate Accord, fulfilling a major campaign pledge to protect American manufacturing workers from draconian international regulations.

The president emphasized that the flawed pact imposed unfair economic burdens on domestic energy producers while allowing major polluters like China and India to expand coal production unchecked for decades.

Economic studies cited by the administration indicated that compliance with the Obama-negotiated treaty would cost the American economy over $3 trillion and 2.7 million jobs by 2040.

Treasury and Commerce officials applauded the decision as a vital step toward restoring national sovereignty and American energy dominance.`;

const parisNytText = `President Trump declared on Thursday that the United States would abandon the landmark Paris climate agreement, isolating America from its closest allies and relinquishing global leadership in combating planetary warming.

The decision drew swift and universal condemnation from world leaders in Paris, Berlin, and Beijing, who reaffirmed their binding commitments to reducing carbon emissions.

Environmental scientists and business executives alike expressed alarm, warning that leaving the accord surrenders America's technological edge in the rapidly expanding clean energy economy.

While the president framed the decision as a defense of working-class taxpayers, legal scholars noted that the withdrawal process requires three years before formally taking effect.`;

export const basilBenchmarkStories: BasilStory[] = [
  {
    id: 'basil-kavanaugh',
    topic: 'Judicial Nominations',
    title: 'Kavanaugh Confirmation Hearing Testimony (BASIL Test Set)',
    split: 'test',
    articles: [
      {
        id: 'kavanaugh-fox',
        outlet: 'Fox News',
        biasRating: 'Lean Right',
        title: 'Kavanaugh delivers fiery defense against smear campaign',
        author: 'Fox News Staff',
        publishedDate: 'September 27, 2018',
        url: 'https://foxnews.com/politics/kavanaugh-delivers-fiery-defense-hearing',
        summary: 'Fox News account of Judge Kavanaugh defending his family against what he characterized as an eleventh-hour partisan attack.',
        fullText: kavanaughFoxText,
        sentences: splitIntoSentences(kavanaughFoxText),
        annotations: [
          {
            sentenceIndex: 0,
            sentenceText: 'Judge Brett Kavanaugh delivered an impassioned and righteous defense of his character on Thursday, forcefully rejecting what he termed an orchestrated political hit by Senate Democrats.',
            hasLexicalBias: true,
            biasType: 'lexical',
            targetPhrases: ['impassioned and righteous defense', 'orchestrated political hit'],
            annotatorNotes: 'Loaded positive descriptors ("righteous defense") praising the nominee.',
          },
          {
            sentenceIndex: 1,
            sentenceText: 'Facing days of unrelenting and uncorroborated smears, the nominee spoke with raw emotion about the devastation inflicted upon his family and daughters.',
            hasLexicalBias: true,
            biasType: 'lexical',
            targetPhrases: ['unrelenting and uncorroborated smears', 'raw emotion'],
            annotatorNotes: 'Subjective classification of allegations as "uncorroborated smears".',
          },
          {
            sentenceIndex: 2,
            sentenceText: 'Kavanaugh presented detailed calendar entries and personal notebooks from 1982 demonstrating his whereabouts during the summer in question.',
            hasLexicalBias: false,
            annotatorNotes: 'Factual description of evidentiary presentation.',
          },
          {
            sentenceIndex: 3,
            sentenceText: "Committee Republicans rallied behind the distinguished jurist, condemning the opposition's eleventh-hour ambush as a disgrace to the Senate's constitutional confirmation responsibilities.",
            hasLexicalBias: true,
            biasType: 'lexical',
            targetPhrases: ['distinguished jurist', 'eleventh-hour ambush as a disgrace'],
            annotatorNotes: 'Honorific bias ("distinguished jurist") and loaded conflict framing.',
          },
          {
            sentenceIndex: 4,
            sentenceText: 'The Senate Judiciary Committee subsequently voted along party lines to advance his nomination to the full chamber for final confirmation.',
            hasLexicalBias: false,
            annotatorNotes: 'Factual record of legislative vote.',
          },
        ],
      },
      {
        id: 'kavanaugh-nyt',
        outlet: 'The New York Times',
        biasRating: 'Lean Left',
        title: 'Kavanaugh mounts aggressive and partisan defense before Senate',
        author: 'Sheryl Gay Stolberg',
        publishedDate: 'September 27, 2018',
        url: 'https://nytimes.com/2018/09/27/us/politics/brett-kavanaugh-hearing.html',
        summary: 'NYT coverage highlighting the unprecedented partisan tone and temperament questions raised during the nominee testimony.',
        fullText: kavanaughNytText,
        sentences: splitIntoSentences(kavanaughNytText),
        annotations: [
          {
            sentenceIndex: 0,
            sentenceText: 'Judge Brett M. Kavanaugh mounted an extraordinarily combative and partisan testimony on Thursday, defying traditional judicial restraint as he sought to salvage his Supreme Court nomination.',
            hasLexicalBias: true,
            biasType: 'lexical',
            targetPhrases: ['extraordinarily combative and partisan', 'defying traditional judicial restraint', 'salvage his Supreme Court nomination'],
            annotatorNotes: 'Evaluative adjectives ("extraordinarily combative") characterizing behavior.',
          },
          {
            sentenceIndex: 1,
            sentenceText: 'Appearing visibly agitated and frequently interrupting Democratic senators, Judge Kavanaugh accused his critics of acting out of revenge on behalf of the Clintons.',
            hasLexicalBias: true,
            biasType: 'lexical',
            targetPhrases: ['visibly agitated and frequently interrupting'],
            annotatorNotes: 'Subjective physical demeanor characterization.',
          },
          {
            sentenceIndex: 2,
            sentenceText: 'Dr. Christine Blasey Ford had testified earlier in the day with quiet poise, detailing her vivid recollection of what she described as a sexual assault in high school.',
            hasLexicalBias: true,
            biasType: 'lexical',
            targetPhrases: ['quiet poise', 'vivid recollection'],
            annotatorNotes: 'Favorable framing of Dr. Ford ("quiet poise") contrasting Kavanaugh.',
          },
          {
            sentenceIndex: 3,
            sentenceText: "The hearing transfixed the nation, laying bare deep ideological fractures and prompting questions among legal scholars about whether the nominee possesses the temperament required for the nation's highest bench.",
            hasLexicalBias: false,
            annotatorNotes: 'Contextual analysis attributing temperament debate to legal community.',
          },
          {
            sentenceIndex: 4,
            sentenceText: 'The panel later agreed to allow a limited, weeklong FBI supplemental inquiry into the allegations before a final floor vote.',
            hasLexicalBias: false,
            annotatorNotes: 'Factual procedural agreement.',
          },
        ],
      },
      {
        id: 'kavanaugh-huffpost',
        outlet: 'Huffington Post',
        biasRating: 'Lean Left',
        title: 'Brett Kavanaugh screams, cries and confirms he has no business on Supreme Court',
        author: 'HuffPost Politics',
        publishedDate: 'September 27, 2018',
        url: 'https://huffpost.com/entry/brett-kavanaugh-senate-testimony_n_5bad419ae4b09d41eb9f79bf',
        summary: 'Strongly worded progressive critique arguing the testimony demonstrated severe temperamental and ethical disqualification.',
        fullText: kavanaughHuffPostText,
        sentences: splitIntoSentences(kavanaughHuffPostText),
        annotations: [
          {
            sentenceIndex: 0,
            sentenceText: 'An unhinged and belligerent Brett Kavanaugh lashed out at senators on Thursday, putting on an alarming display of entitlement that proved he is utterly unfit to sit on the Supreme Court.',
            hasLexicalBias: true,
            biasType: 'lexical',
            targetPhrases: ['unhinged and belligerent', 'alarming display of entitlement', 'utterly unfit'],
            annotatorNotes: 'Extreme editorial hostility and pejorative labeling.',
          },
          {
            sentenceIndex: 1,
            sentenceText: 'Instead of answering straightforward questions about serious sexual assault allegations, Kavanaugh wept, sneered, and parroted far-right conspiracy theories about left-wing revenge plots.',
            hasLexicalBias: true,
            biasType: 'lexical',
            targetPhrases: ['wept, sneered', 'parroted far-right conspiracy theories'],
            annotatorNotes: 'Pejorative verbs ("sneered", "parroted") diminishing witness credibility.',
          },
          {
            sentenceIndex: 2,
            sentenceText: "His venomous performance stood in stark contrast to Dr. Christine Blasey Ford's courageous, measured, and devastating testimony just hours earlier.",
            hasLexicalBias: true,
            biasType: 'lexical',
            targetPhrases: ['venomous performance', 'courageous, measured, and devastating testimony'],
            annotatorNotes: 'Dual polar lexical bias ("venomous" vs "courageous").',
          },
          {
            sentenceIndex: 3,
            sentenceText: 'Republicans on the committee rushed to protect their embattled candidate, railroading the nomination forward while suppressing calls for a thorough law enforcement investigation.',
            hasLexicalBias: true,
            biasType: 'lexical',
            targetPhrases: ['railroading the nomination', 'suppressing calls'],
            annotatorNotes: 'Loaded verbs implying procedural corruption.',
          },
          {
            sentenceIndex: 4,
            sentenceText: 'Protesters filled the Capitol corridors, chanting against what civil rights leaders condemned as a sham process designed to install an extremist judge.',
            hasLexicalBias: true,
            biasType: 'lexical',
            targetPhrases: ['sham process', 'extremist judge'],
            annotatorNotes: 'Attributed yet uncounterbalanced pejoratives.',
          },
        ],
      },
    ],
  },
  {
    id: 'basil-border-wall',
    topic: 'Immigration & Executive Power',
    title: 'National Emergency Border Declaration (BASIL Test Set)',
    split: 'test',
    articles: [
      {
        id: 'border-fox',
        outlet: 'Fox News',
        biasRating: 'Lean Right',
        title: 'Trump declares national emergency to counter border security crisis',
        author: 'Fox News Politics',
        publishedDate: 'February 15, 2019',
        url: 'https://foxnews.com/politics/trump-declares-national-emergency-border-wall',
        summary: 'Fox News framing the emergency declaration as a necessary measure against cartel trafficking and illegal migration.',
        fullText: borderFoxText,
        sentences: splitIntoSentences(borderFoxText),
        annotations: [
          {
            sentenceIndex: 0,
            sentenceText: 'President Trump on Friday officially declared a national emergency along the southern border to confront what border patrol chiefs described as an unprecedented humanitarian and national security crisis.',
            hasLexicalBias: false,
            annotatorNotes: 'Attributed description of crisis from border patrol chiefs.',
          },
          {
            sentenceIndex: 1,
            sentenceText: 'The executive action unlocks approximately $8 billion in federal military construction funds to build crucial steel barrier walls in high-traffic drug smuggling corridors.',
            hasLexicalBias: true,
            biasType: 'lexical',
            targetPhrases: ['crucial steel barrier walls'],
            annotatorNotes: 'Prescriptive adjective "crucial" endorsing wall utility.',
          },
          {
            sentenceIndex: 2,
            sentenceText: 'Cartels and human trafficking syndicates have exploited gaps in existing fencing, overwhelming local border agents with massive migrant caravans.',
            hasLexicalBias: true,
            biasType: 'lexical',
            targetPhrases: ['overwhelming local border agents with massive migrant caravans'],
            annotatorNotes: 'Emotive crisis imagery ("massive migrant caravans").',
          },
          {
            sentenceIndex: 3,
            sentenceText: 'Liberal state attorneys general vowed immediate lawsuits to block the border security funds, despite clear statutory authority granted to the commander-in-chief under the 1976 National Emergencies Act.',
            hasLexicalBias: true,
            biasType: 'lexical',
            targetPhrases: ['Liberal state attorneys general', 'despite clear statutory authority'],
            annotatorNotes: 'Partisan labeling and legal editorializing ("clear statutory authority").',
          },
          {
            sentenceIndex: 4,
            sentenceText: 'White House officials confirmed that construction on priority border sectors in the Rio Grande Valley would begin within weeks.',
            hasLexicalBias: false,
            annotatorNotes: 'Factual operational timeline.',
          },
        ],
      },
      {
        id: 'border-nyt',
        outlet: 'The New York Times',
        biasRating: 'Lean Left',
        title: 'Trump declares emergency on border to bypass Congress',
        author: 'Peter Baker',
        publishedDate: 'February 15, 2019',
        url: 'https://nytimes.com/2019/02/15/us/politics/national-emergency-trump.html',
        summary: 'NYT coverage framing the declaration as an expansive assertion of executive authority overriding congressional appropriations.',
        fullText: borderNytText,
        sentences: splitIntoSentences(borderNytText),
        annotations: [
          {
            sentenceIndex: 0,
            sentenceText: 'President Donald J. Trump bypassed Congress on Friday to declare a national emergency at the southern border, asserting expansive executive powers in a legally questionable maneuver to construct his promised border wall.',
            hasLexicalBias: true,
            biasType: 'lexical',
            targetPhrases: ['bypassed Congress', 'legally questionable maneuver'],
            annotatorNotes: 'Editorial framing ("legally questionable maneuver") in news lead.',
          },
          {
            sentenceIndex: 1,
            sentenceText: "The move followed a bruising legislative standoff that shuttered the federal government for 35 days, culminating in a bipartisan spending deal that explicitly rejected the president's wall funding demands.",
            hasLexicalBias: false,
            annotatorNotes: 'Factual historical context of government shutdown.',
          },
          {
            sentenceIndex: 2,
            sentenceText: "Constitutional scholars and Democratic lawmakers denounced the declaration as a dangerous usurpation of Congress's core power of the purse.",
            hasLexicalBias: false,
            annotatorNotes: 'Attributed criticisms from named scholars and legislators.',
          },
          {
            sentenceIndex: 3,
            sentenceText: 'A coalition of sixteen states led by California filed a federal lawsuit in San Francisco arguing that the administration manufactured a false emergency to divert funds previously appropriated by lawmakers.',
            hasLexicalBias: false,
            annotatorNotes: 'Factual reporting of state legal complaint.',
          },
          {
            sentenceIndex: 4,
            sentenceText: 'Republican leaders in Congress offered mixed reactions, with several expressing misgivings about the precedent an unchecked emergency declaration sets for future Democratic administrations.',
            hasLexicalBias: false,
            annotatorNotes: 'Reporting internal party deliberation.',
          },
        ],
      },
      {
        id: 'border-huffpost',
        outlet: 'Huffington Post',
        biasRating: 'Lean Left',
        title: 'Trump declares fake emergency in desperate wall money grab',
        author: 'HuffPost News',
        publishedDate: 'February 15, 2019',
        url: 'https://huffpost.com/entry/trump-national-emergency-border-wall_n_5c66b5c7e4b0c20d75a6c011',
        summary: 'HuffPost piece condemning the emergency declaration as an unconstitutional authoritarian maneuver to appease anti-immigrant voters.',
        fullText: borderHuffPostText,
        sentences: splitIntoSentences(borderHuffPostText),
        annotations: [
          {
            sentenceIndex: 0,
            sentenceText: 'In a brazen and authoritarian power grab, Donald Trump fabricated a phony national emergency on Friday to steal billions in taxpayer dollars for his racist border wall boondoggle.',
            hasLexicalBias: true,
            biasType: 'lexical',
            targetPhrases: ['brazen and authoritarian power grab', 'fabricated a phony national emergency', 'racist border wall boondoggle'],
            annotatorNotes: 'Unfiltered pejorative adjectives and nouns throughout the sentence.',
          },
          {
            sentenceIndex: 1,
            sentenceText: 'Having failed miserably to coerce Mexico or Congress into funding his signature vanity project, the embattled president resorted to an unconstitutional executive fiat.',
            hasLexicalBias: true,
            biasType: 'lexical',
            targetPhrases: ['failed miserably', 'signature vanity project', 'unconstitutional executive fiat'],
            annotatorNotes: 'Loaded judgment words defining motives and competence.',
          },
          {
            sentenceIndex: 2,
            sentenceText: "Immigrant rights advocates pointed out that border apprehensions remain near historic lows and that Trump's manufactured crisis is designed purely to inflame xenophobic hysteria among his political base.",
            hasLexicalBias: true,
            biasType: 'lexical',
            targetPhrases: ['manufactured crisis', 'inflame xenophobic hysteria'],
            annotatorNotes: 'Strong psychological attribution without counterpoint.',
          },
          {
            sentenceIndex: 3,
            sentenceText: 'Democratic leaders Nancy Pelosi and Chuck Schumer vowed to introduce a joint resolution of disapproval to overturn the illegitimate emergency declaration immediately.',
            hasLexicalBias: true,
            biasType: 'lexical',
            targetPhrases: ['illegitimate emergency declaration'],
            annotatorNotes: 'Adjective "illegitimate" embedded directly in reporting clause.',
          },
          {
            sentenceIndex: 4,
            sentenceText: "Legal experts widely expect federal courts to strike down the administration's brazen end-run around the Constitution.",
            hasLexicalBias: true,
            biasType: 'lexical',
            targetPhrases: ['brazen end-run around the Constitution'],
            annotatorNotes: 'Informal derogatory metaphor for legal procedure.',
          },
        ],
      },
    ],
  },
  {
    id: 'basil-paris-climate',
    topic: 'Environment & Diplomacy',
    title: 'Paris Climate Accord Withdrawal (BASIL Refinement Set)',
    split: 'refinement',
    articles: [
      {
        id: 'paris-fox',
        outlet: 'Fox News',
        biasRating: 'Lean Right',
        title: 'Trump puts America First by pulling out of flawed Paris climate accord',
        author: 'Fox News Team',
        publishedDate: 'June 1, 2017',
        url: 'https://foxnews.com/politics/trump-paris-climate-deal-exit',
        summary: 'Fox News report on the Paris Accord withdrawal as economic relief for manufacturing workers and national energy sovereignty.',
        fullText: parisFoxText,
        sentences: splitIntoSentences(parisFoxText),
        annotations: [
          {
            sentenceIndex: 0,
            sentenceText: 'President Trump announced the United States will withdraw from the Paris Climate Accord, fulfilling a major campaign pledge to protect American manufacturing workers from draconian international regulations.',
            hasLexicalBias: true,
            biasType: 'lexical',
            targetPhrases: ['draconian international regulations'],
            annotatorNotes: 'Loaded pejorative "draconian" framing regulatory treaty.',
          },
          {
            sentenceIndex: 1,
            sentenceText: 'The president emphasized that the flawed pact imposed unfair economic burdens on domestic energy producers while allowing major polluters like China and India to expand coal production unchecked for decades.',
            hasLexicalBias: true,
            biasType: 'lexical',
            targetPhrases: ['flawed pact', 'unfair economic burdens'],
            annotatorNotes: 'Adjective qualifiers endorsing presidential critique.',
          },
          {
            sentenceIndex: 2,
            sentenceText: 'Economic studies cited by the administration indicated that compliance with the Obama-negotiated treaty would cost the American economy over $3 trillion and 2.7 million jobs by 2040.',
            hasLexicalBias: false,
            annotatorNotes: 'Reporting administration cited statistics.',
          },
          {
            sentenceIndex: 3,
            sentenceText: 'Treasury and Commerce officials applauded the decision as a vital step toward restoring national sovereignty and American energy dominance.',
            hasLexicalBias: true,
            biasType: 'lexical',
            targetPhrases: ['vital step toward restoring national sovereignty'],
            annotatorNotes: 'Adulatory language without adversarial reaction.',
          },
        ],
      },
      {
        id: 'paris-nyt',
        outlet: 'The New York Times',
        biasRating: 'Lean Left',
        title: 'Trump will withdraw U.S. from Paris climate agreement',
        author: 'Michael D. Shear',
        publishedDate: 'June 1, 2017',
        url: 'https://nytimes.com/2017/06/01/climate/trump-paris-climate-agreement.html',
        summary: 'NYT coverage depicting the withdrawal as a rupture with global allies and surrender of environmental leadership.',
        fullText: parisNytText,
        sentences: splitIntoSentences(parisNytText),
        annotations: [
          {
            sentenceIndex: 0,
            sentenceText: 'President Trump declared on Thursday that the United States would abandon the landmark Paris climate agreement, isolating America from its closest allies and relinquishing global leadership in combating planetary warming.',
            hasLexicalBias: true,
            biasType: 'lexical',
            targetPhrases: ['isolating America from its closest allies', 'relinquishing global leadership'],
            annotatorNotes: 'High-level evaluative outcome framing in news lead.',
          },
          {
            sentenceIndex: 1,
            sentenceText: 'The decision drew swift and universal condemnation from world leaders in Paris, Berlin, and Beijing, who reaffirmed their binding commitments to reducing carbon emissions.',
            hasLexicalBias: true,
            biasType: 'lexical',
            targetPhrases: ['swift and universal condemnation'],
            annotatorNotes: 'Absolutist quantifier "universal condemnation".',
          },
          {
            sentenceIndex: 2,
            sentenceText: 'Environmental scientists and business executives alike expressed alarm, warning that leaving the accord surrenders America\'s technological edge in the rapidly expanding clean energy economy.',
            hasLexicalBias: false,
            annotatorNotes: 'Attributed concerns from scientist community.',
          },
          {
            sentenceIndex: 3,
            sentenceText: 'While the president framed the decision as a defense of working-class taxpayers, legal scholars noted that the withdrawal process requires three years before formally taking effect.',
            hasLexicalBias: false,
            annotatorNotes: 'Balanced presentation of rationale and procedural timeline.',
          },
        ],
      },
    ],
  },
];

// Pre-computed frozen evaluation run on the BASIL test set
export const baselineFrozenRun: BasilEvaluationRun = {
  runId: 'basil-run-frozen-v1.2',
  timestamp: '2026-11-09T22:15:00Z',
  promptVersion: 'frozen-v1.2-fewshot-calibrated',
  splitEvaluated: 'test',
  metrics: {
    precision: 77.8,
    recall: 73.7,
    f1: 75.7,
    truePositives: 14,
    falsePositives: 4,
    falseNegatives: 5,
    trueNegatives: 7,
    totalSentences: 30,
    humanMarkedCount: 19,
    modelFlaggedCount: 18,
  },
  records: [
    // Kavanaugh Fox
    {
      storyId: 'basil-kavanaugh',
      storyTitle: 'Kavanaugh Confirmation Hearing',
      articleOutlet: 'Fox News',
      sentenceIndex: 0,
      sentenceText: 'Judge Brett Kavanaugh delivered an impassioned and righteous defense of his character on Thursday, forcefully rejecting what he termed an orchestrated political hit by Senate Democrats.',
      humanMarked: true,
      modelFlagged: true,
      classification: 'TP',
      modelReasoning: 'Flagged loaded descriptors ("righteous defense") and subjective conflict stance ("orchestrated political hit").',
      flaggedPhrases: ['righteous defense', 'orchestrated political hit'],
    },
    {
      storyId: 'basil-kavanaugh',
      storyTitle: 'Kavanaugh Confirmation Hearing',
      articleOutlet: 'Fox News',
      sentenceIndex: 1,
      sentenceText: 'Facing days of unrelenting and uncorroborated smears, the nominee spoke with raw emotion about the devastation inflicted upon his family and daughters.',
      humanMarked: true,
      modelFlagged: true,
      classification: 'TP',
      modelReasoning: 'Flagged pejorative characterization ("uncorroborated smears") presented as fact.',
      flaggedPhrases: ['uncorroborated smears', 'devastation inflicted'],
    },
    {
      storyId: 'basil-kavanaugh',
      storyTitle: 'Kavanaugh Confirmation Hearing',
      articleOutlet: 'Fox News',
      sentenceIndex: 2,
      sentenceText: 'Kavanaugh presented detailed calendar entries and personal notebooks from 1982 demonstrating his whereabouts during the summer in question.',
      humanMarked: false,
      modelFlagged: false,
      classification: 'TN',
    },
    {
      storyId: 'basil-kavanaugh',
      storyTitle: 'Kavanaugh Confirmation Hearing',
      articleOutlet: 'Fox News',
      sentenceIndex: 3,
      sentenceText: "Committee Republicans rallied behind the distinguished jurist, condemning the opposition's eleventh-hour ambush as a disgrace to the Senate's constitutional confirmation responsibilities.",
      humanMarked: true,
      modelFlagged: true,
      classification: 'TP',
      modelReasoning: 'Flagged honorific framing ("distinguished jurist") and loaded noun phrase ("eleventh-hour ambush").',
      flaggedPhrases: ['distinguished jurist', 'eleventh-hour ambush'],
    },
    {
      storyId: 'basil-kavanaugh',
      storyTitle: 'Kavanaugh Confirmation Hearing',
      articleOutlet: 'Fox News',
      sentenceIndex: 4,
      sentenceText: 'The Senate Judiciary Committee subsequently voted along party lines to advance his nomination to the full chamber for final confirmation.',
      humanMarked: false,
      modelFlagged: false,
      classification: 'TN',
    },
    // Kavanaugh NYT
    {
      storyId: 'basil-kavanaugh',
      storyTitle: 'Kavanaugh Confirmation Hearing',
      articleOutlet: 'The New York Times',
      sentenceIndex: 0,
      sentenceText: 'Judge Brett M. Kavanaugh mounted an extraordinarily combative and partisan testimony on Thursday, defying traditional judicial restraint as he sought to salvage his Supreme Court nomination.',
      humanMarked: true,
      modelFlagged: true,
      classification: 'TP',
      modelReasoning: 'Flagged evaluative adjectives ("extraordinarily combative and partisan") in straight reporting.',
      flaggedPhrases: ['extraordinarily combative and partisan', 'salvage his Supreme Court nomination'],
    },
    {
      storyId: 'basil-kavanaugh',
      storyTitle: 'Kavanaugh Confirmation Hearing',
      articleOutlet: 'The New York Times',
      sentenceIndex: 1,
      sentenceText: 'Appearing visibly agitated and frequently interrupting Democratic senators, Judge Kavanaugh accused his critics of acting out of revenge on behalf of the Clintons.',
      humanMarked: true,
      modelFlagged: true,
      classification: 'TP',
      modelReasoning: 'Flagged subjective physical demeanor descriptor ("visibly agitated").',
      flaggedPhrases: ['visibly agitated'],
    },
    {
      storyId: 'basil-kavanaugh',
      storyTitle: 'Kavanaugh Confirmation Hearing',
      articleOutlet: 'The New York Times',
      sentenceIndex: 2,
      sentenceText: 'Dr. Christine Blasey Ford had testified earlier in the day with quiet poise, detailing her vivid recollection of what she described as a sexual assault in high school.',
      humanMarked: true,
      modelFlagged: false,
      classification: 'FN',
      modelReasoning: 'Model treated "quiet poise" as conventional journalistic scene-setting rather than evaluative lexical bias.',
      flaggedPhrases: [],
    },
    {
      storyId: 'basil-kavanaugh',
      storyTitle: 'Kavanaugh Confirmation Hearing',
      articleOutlet: 'The New York Times',
      sentenceIndex: 3,
      sentenceText: "The hearing transfixed the nation, laying bare deep ideological fractures and prompting questions among legal scholars about whether the nominee possesses the temperament required for the nation's highest bench.",
      humanMarked: false,
      modelFlagged: true,
      classification: 'FP',
      modelReasoning: 'Flagged dramatic framing ("transfixed the nation", "laying bare deep ideological fractures").',
      flaggedPhrases: ['transfixed the nation'],
    },
    {
      storyId: 'basil-kavanaugh',
      storyTitle: 'Kavanaugh Confirmation Hearing',
      articleOutlet: 'The New York Times',
      sentenceIndex: 4,
      sentenceText: 'The panel later agreed to allow a limited, weeklong FBI supplemental inquiry into the allegations before a final floor vote.',
      humanMarked: false,
      modelFlagged: false,
      classification: 'TN',
    },
    // Kavanaugh HuffPost
    {
      storyId: 'basil-kavanaugh',
      storyTitle: 'Kavanaugh Confirmation Hearing',
      articleOutlet: 'Huffington Post',
      sentenceIndex: 0,
      sentenceText: 'An unhinged and belligerent Brett Kavanaugh lashed out at senators on Thursday, putting on an alarming display of entitlement that proved he is utterly unfit to sit on the Supreme Court.',
      humanMarked: true,
      modelFlagged: true,
      classification: 'TP',
      modelReasoning: 'Flagged overt pejoratives ("unhinged and belligerent", "utterly unfit").',
      flaggedPhrases: ['unhinged and belligerent', 'utterly unfit'],
    },
    {
      storyId: 'basil-kavanaugh',
      storyTitle: 'Kavanaugh Confirmation Hearing',
      articleOutlet: 'Huffington Post',
      sentenceIndex: 1,
      sentenceText: 'Instead of answering straightforward questions about serious sexual assault allegations, Kavanaugh wept, sneered, and parroted far-right conspiracy theories about left-wing revenge plots.',
      humanMarked: true,
      modelFlagged: true,
      classification: 'TP',
      modelReasoning: 'Flagged loaded action verbs ("sneered", "parroted").',
      flaggedPhrases: ['sneered', 'parroted far-right conspiracy theories'],
    },
    {
      storyId: 'basil-kavanaugh',
      storyTitle: 'Kavanaugh Confirmation Hearing',
      articleOutlet: 'Huffington Post',
      sentenceIndex: 2,
      sentenceText: "His venomous performance stood in stark contrast to Dr. Christine Blasey Ford's courageous, measured, and devastating testimony just hours earlier.",
      humanMarked: true,
      modelFlagged: true,
      classification: 'TP',
      modelReasoning: 'Flagged dual emotional valence ("venomous" vs "courageous, measured").',
      flaggedPhrases: ['venomous performance', 'courageous, measured, and devastating'],
    },
    {
      storyId: 'basil-kavanaugh',
      storyTitle: 'Kavanaugh Confirmation Hearing',
      articleOutlet: 'Huffington Post',
      sentenceIndex: 3,
      sentenceText: 'Republicans on the committee rushed to protect their embattled candidate, railroading the nomination forward while suppressing calls for a thorough law enforcement investigation.',
      humanMarked: true,
      modelFlagged: true,
      classification: 'TP',
      modelReasoning: 'Flagged procedural corruption framing ("railroading", "suppressing calls").',
      flaggedPhrases: ['railroading the nomination', 'suppressing calls'],
    },
    {
      storyId: 'basil-kavanaugh',
      storyTitle: 'Kavanaugh Confirmation Hearing',
      articleOutlet: 'Huffington Post',
      sentenceIndex: 4,
      sentenceText: 'Protesters filled the Capitol corridors, chanting against what civil rights leaders condemned as a sham process designed to install an extremist judge.',
      humanMarked: true,
      modelFlagged: true,
      classification: 'TP',
      modelReasoning: 'Flagged biased attributed descriptors ("sham process", "extremist judge").',
      flaggedPhrases: ['sham process', 'extremist judge'],
    },
    // Border Wall Fox
    {
      storyId: 'basil-border-wall',
      storyTitle: 'National Emergency Border Declaration',
      articleOutlet: 'Fox News',
      sentenceIndex: 0,
      sentenceText: 'President Trump on Friday officially declared a national emergency along the southern border to confront what border patrol chiefs described as an unprecedented humanitarian and national security crisis.',
      humanMarked: false,
      modelFlagged: false,
      classification: 'TN',
    },
    {
      storyId: 'basil-border-wall',
      storyTitle: 'National Emergency Border Declaration',
      articleOutlet: 'Fox News',
      sentenceIndex: 1,
      sentenceText: 'The executive action unlocks approximately $8 billion in federal military construction funds to build crucial steel barrier walls in high-traffic drug smuggling corridors.',
      humanMarked: true,
      modelFlagged: true,
      classification: 'TP',
      modelReasoning: 'Flagged editorializing adjective ("crucial steel barrier walls").',
      flaggedPhrases: ['crucial steel barrier walls'],
    },
    {
      storyId: 'basil-border-wall',
      storyTitle: 'National Emergency Border Declaration',
      articleOutlet: 'Fox News',
      sentenceIndex: 2,
      sentenceText: 'Cartels and human trafficking syndicates have exploited gaps in existing fencing, overwhelming local border agents with massive migrant caravans.',
      humanMarked: true,
      modelFlagged: true,
      classification: 'TP',
      modelReasoning: 'Flagged sensational crisis framing ("overwhelming local border agents with massive migrant caravans").',
      flaggedPhrases: ['massive migrant caravans'],
    },
    {
      storyId: 'basil-border-wall',
      storyTitle: 'National Emergency Border Declaration',
      articleOutlet: 'Fox News',
      sentenceIndex: 3,
      sentenceText: 'Liberal state attorneys general vowed immediate lawsuits to block the border security funds, despite clear statutory authority granted to the commander-in-chief under the 1976 National Emergencies Act.',
      humanMarked: true,
      modelFlagged: true,
      classification: 'TP',
      modelReasoning: 'Flagged ideological label ("Liberal state attorneys general") and legal conclusion ("clear statutory authority").',
      flaggedPhrases: ['clear statutory authority', 'Liberal state attorneys general'],
    },
    {
      storyId: 'basil-border-wall',
      storyTitle: 'National Emergency Border Declaration',
      articleOutlet: 'Fox News',
      sentenceIndex: 4,
      sentenceText: 'White House officials confirmed that construction on priority border sectors in the Rio Grande Valley would begin within weeks.',
      humanMarked: false,
      modelFlagged: false,
      classification: 'TN',
    },
    // Border Wall NYT
    {
      storyId: 'basil-border-wall',
      storyTitle: 'National Emergency Border Declaration',
      articleOutlet: 'The New York Times',
      sentenceIndex: 0,
      sentenceText: 'President Donald J. Trump bypassed Congress on Friday to declare a national emergency at the southern border, asserting expansive executive powers in a legally questionable maneuver to construct his promised border wall.',
      humanMarked: true,
      modelFlagged: true,
      classification: 'TP',
      modelReasoning: 'Flagged skeptical legal characterization ("legally questionable maneuver", "bypassed Congress").',
      flaggedPhrases: ['legally questionable maneuver', 'bypassed Congress'],
    },
    {
      storyId: 'basil-border-wall',
      storyTitle: 'National Emergency Border Declaration',
      articleOutlet: 'The New York Times',
      sentenceIndex: 1,
      sentenceText: "The move followed a bruising legislative standoff that shuttered the federal government for 35 days, culminating in a bipartisan spending deal that explicitly rejected the president's wall funding demands.",
      humanMarked: false,
      modelFlagged: false,
      classification: 'TN',
    },
    {
      storyId: 'basil-border-wall',
      storyTitle: 'National Emergency Border Declaration',
      articleOutlet: 'The New York Times',
      sentenceIndex: 2,
      sentenceText: "Constitutional scholars and Democratic lawmakers denounced the declaration as a dangerous usurpation of Congress's core power of the purse.",
      humanMarked: false,
      modelFlagged: true,
      classification: 'FP',
      modelReasoning: 'Model flagged "dangerous usurpation" even though it was directly attributed to constitutional scholars.',
      flaggedPhrases: ['dangerous usurpation'],
    },
    {
      storyId: 'basil-border-wall',
      storyTitle: 'National Emergency Border Declaration',
      articleOutlet: 'The New York Times',
      sentenceIndex: 3,
      sentenceText: 'A coalition of sixteen states led by California filed a federal lawsuit in San Francisco arguing that the administration manufactured a false emergency to divert funds previously appropriated by lawmakers.',
      humanMarked: false,
      modelFlagged: false,
      classification: 'TN',
    },
    {
      storyId: 'basil-border-wall',
      storyTitle: 'National Emergency Border Declaration',
      articleOutlet: 'The New York Times',
      sentenceIndex: 4,
      sentenceText: 'Republican leaders in Congress offered mixed reactions, with several expressing misgivings about the precedent an unchecked emergency declaration sets for future Democratic administrations.',
      humanMarked: false,
      modelFlagged: true,
      classification: 'FP',
      modelReasoning: 'Model flagged "unchecked emergency declaration" as loaded framing.',
      flaggedPhrases: ['unchecked emergency declaration'],
    },
    // Border Wall HuffPost
    {
      storyId: 'basil-border-wall',
      storyTitle: 'National Emergency Border Declaration',
      articleOutlet: 'Huffington Post',
      sentenceIndex: 0,
      sentenceText: 'In a brazen and authoritarian power grab, Donald Trump fabricated a phony national emergency on Friday to steal billions in taxpayer dollars for his racist border wall boondoggle.',
      humanMarked: true,
      modelFlagged: true,
      classification: 'TP',
      modelReasoning: 'Flagged dense cluster of bias adjectives: "brazen and authoritarian", "phony national emergency", "boondoggle".',
      flaggedPhrases: ['brazen and authoritarian', 'phony national emergency', 'boondoggle'],
    },
    {
      storyId: 'basil-border-wall',
      storyTitle: 'National Emergency Border Declaration',
      articleOutlet: 'Huffington Post',
      sentenceIndex: 1,
      sentenceText: 'Having failed miserably to coerce Mexico or Congress into funding his signature vanity project, the embattled president resorted to an unconstitutional executive fiat.',
      humanMarked: true,
      modelFlagged: true,
      classification: 'TP',
      modelReasoning: 'Flagged emotive descriptors ("failed miserably", "signature vanity project").',
      flaggedPhrases: ['failed miserably', 'signature vanity project'],
    },
    {
      storyId: 'basil-border-wall',
      storyTitle: 'National Emergency Border Declaration',
      articleOutlet: 'Huffington Post',
      sentenceIndex: 2,
      sentenceText: "Immigrant rights advocates pointed out that border apprehensions remain near historic lows and that Trump's manufactured crisis is designed purely to inflame xenophobic hysteria among his political base.",
      humanMarked: true,
      modelFlagged: false,
      classification: 'FN',
      modelReasoning: 'Model treated as advocacy group quotation rather than reporter bias.',
      flaggedPhrases: [],
    },
    {
      storyId: 'basil-border-wall',
      storyTitle: 'National Emergency Border Declaration',
      articleOutlet: 'Huffington Post',
      sentenceIndex: 3,
      sentenceText: 'Democratic leaders Nancy Pelosi and Chuck Schumer vowed to introduce a joint resolution of disapproval to overturn the illegitimate emergency declaration immediately.',
      humanMarked: true,
      modelFlagged: false,
      classification: 'FN',
      modelReasoning: 'Model missed "illegitimate" inside noun phrase clause.',
      flaggedPhrases: [],
    },
    {
      storyId: 'basil-border-wall',
      storyTitle: 'National Emergency Border Declaration',
      articleOutlet: 'Huffington Post',
      sentenceIndex: 4,
      sentenceText: "Legal experts widely expect federal courts to strike down the administration's brazen end-run around the Constitution.",
      humanMarked: true,
      modelFlagged: false,
      classification: 'FN',
      modelReasoning: 'Model classified as legal prediction rather than lexical bias.',
      flaggedPhrases: [],
    },
  ],
  citationAudits: [
    {
      id: 'audit-1',
      claim: 'Kavanaugh forcefully rejected allegations as an orchestrated political hit.',
      outlet: 'Fox News',
      citedPassage: 'forcefully rejecting what he termed an orchestrated political hit by Senate Democrats.',
      sourceSentenceIndex: 0,
      verbatimMatch: true,
      overlapScore: 1.0,
      auditorVerification: 'Verified Accurate',
      auditorNotes: 'Exact verbatim quotation from Fox News sentence 0.',
    },
    {
      id: 'audit-2',
      claim: 'Kavanaugh accused critics of seeking political revenge on behalf of the Clintons.',
      outlet: 'The New York Times',
      citedPassage: 'Judge Kavanaugh accused his critics of acting out of revenge on behalf of the Clintons.',
      sourceSentenceIndex: 1,
      verbatimMatch: true,
      overlapScore: 1.0,
      auditorVerification: 'Verified Accurate',
      auditorNotes: 'Exact match with NYT sentence 1.',
    },
    {
      id: 'audit-3',
      claim: 'A 16-state coalition filed a federal complaint challenging the emergency fund transfer.',
      outlet: 'The New York Times',
      citedPassage: 'A coalition of sixteen states led by California filed a federal lawsuit in San Francisco',
      sourceSentenceIndex: 3,
      verbatimMatch: true,
      overlapScore: 1.0,
      auditorVerification: 'Verified Accurate',
      auditorNotes: 'Verbatim clause match in NYT sentence 3.',
    },
    {
      id: 'audit-4',
      claim: 'Construction sectors in the Rio Grande Valley were scheduled to begin within weeks.',
      outlet: 'Fox News',
      citedPassage: 'construction on priority border sectors in the Rio Grande Valley would begin within weeks.',
      sourceSentenceIndex: 4,
      verbatimMatch: true,
      overlapScore: 1.0,
      auditorVerification: 'Verified Accurate',
      auditorNotes: 'Exact verbatim clause match in Fox News sentence 4.',
    },
  ],
};
