import { Article, ComparisonAnalysis } from '../types';
import { splitIntoSentences } from '../utils/metrics';

const article1Text = `KENNEDY SPACE CENTER — NASA's Space Launch System rocket stood gleaming on Pad 39B as engineers completed final countdown simulations for Artemis II, humanity's first crewed mission to lunar orbit in over fifty years.

The four-member crew, led by Commander Reid Wiseman, conducted hatch ingress drills while telemetry specialists tested ground communication arrays. The mission represents a pivotal test flight of the Orion capsule before Artemis III attempts an Antarctic lunar landing.

During pre-launch acoustic and ionospheric modeling, federal researchers noted that the rocket's twin solid rocket boosters generate intense acoustic pressure waves. Preliminary telemetry data suggested the launch may have disrupted coastal GPS systems and high-precision maritime beacons across Brevard County for approximately eighteen minutes during ascent.

"We are investigating whether atmospheric ionization from the exhaust plume interacted with local UHF frequencies," stated a NASA systems engineer, noting that commercial airliners maintained standard VHF navigation without interruption.

The $4.1 billion launch vehicle passed all cryogenic liquid hydrogen fueling stress evaluations without recurrence of the seal leaks that troubled previous uncrewed tests. Flight controllers expressed confidence in the updated propellant chilldown sequence scheduled for the targeted November launch window.`;

const article2Text = `CAPE CANAVERAL — NASA's thunderous Artemis II mega-rocket liftoff disrupted vital Florida GPS signals, aviation officials confirmed on Tuesday, triggering urgent reviews from regional transportation authorities.

Federal Aviation Administration advisories disclosed that precision satellite positioning receivers experienced severe lock loss within a forty-mile radius of the launch complex. Marine port pilots near Port Canaveral reported that ship navigation terminals lost differential GPS coordinates during the rocket's first-stage burn.

The incident renewed fierce scrutiny over the escalating $93 billion Artemis program budget. Safety advocates warned that NASA downplayed known electromagnetic acoustic risks to avoid embarrassing schedule delays for its marquee human spaceflight initiative.

"The sheer acoustic concussive force and solid fuel ionization disrupted critical GPS signals that civilian shipping and automated docking systems depend upon," said a senior maritime logistics director.

While NASA insisted the interference was localized and transient, congressional oversight committee members have demanded a full briefing before astronauts strap into the capsule for the upcoming lunar circumnavigation.`;

const article3Text = `WASHINGTON — Four astronauts are preparing for an unprecedented voyage around the far side of the moon on Artemis II, marking humanity's grand return to deep space exploration.

Commander Reid Wiseman, Pilot Victor Glover, Mission Specialist Christina Koch, and Canadian Space Agency astronaut Jeremy Hansen will spend ten days testing life-support systems on a free-return trajectory around Earth's celestial companion.

Engineers and launch directors are conducting routine post-test reviews after sensitive monitoring equipment registered a minor signal anomaly in coastal radio telemetry following the static fire evaluation. Scientific sensors detected brief ionospheric fluctuations that momentarily degraded commercial satellite receiver sensitivity in the immediate coastal marshland.

"Such minor signal deviations are standard when 8.8 million pounds of thrust ignite the atmosphere," explained Dr. Elena Vance, an aerospace physics fellow. "The Orion spacecraft and primary flight guidance architectures operated with flawless precision."

The international mission has galvanized global enthusiasm, uniting American and Canadian space agencies in a shared commitment to peaceful scientific discovery across the lunar frontier.`;

export const artemisArticles: Article[] = [
  {
    id: 'artemis-aerotech',
    outlet: 'AeroTech Journal',
    biasRating: 'Center',
    title: 'NASA Artemis II Countdown Advances; Launch May Have Disrupted Coastal GPS Systems',
    author: 'Marcus Vance, Senior Aerospace Correspondent',
    publishedDate: 'November 8, 2026',
    url: 'https://aerotech-journal.org/news/artemis-ii-telemetry-gps-analysis',
    summary: 'Technical report on Artemis II countdown status, noting preliminary telemetry suggests the launch may have disrupted coastal GPS beacons during ascent.',
    fullText: article1Text,
    sentences: splitIntoSentences(article1Text),
  },
  {
    id: 'artemis-chronicle',
    outlet: 'The Daily Chronicle',
    biasRating: 'Lean Right',
    title: "NASA's Artemis II Rocket Launch Disrupted Vital Florida GPS Signals, Aviation Officials Confirm",
    author: 'Sarah Jenkins, Investigative Bureau',
    publishedDate: 'November 8, 2026',
    url: 'https://dailychronicle.com/investigations/artemis-launch-gps-blackout-florida',
    summary: 'Investigative piece emphasizing confirmed GPS disruption to commercial shipping and aviation, highlighting program budget scrutiny.',
    fullText: article2Text,
    sentences: splitIntoSentences(article2Text),
  },
  {
    id: 'artemis-tribune',
    outlet: 'Public Science Monitor',
    biasRating: 'Lean Left',
    title: 'Four Astronauts Slated for Historic Artemis II Orbit As Minor Signal Anomaly Examined',
    author: 'Dr. Arthur Campbell, Science Editor',
    publishedDate: 'November 9, 2026',
    url: 'https://publicsciencemonitor.com/space/artemis-ii-astronauts-historic-orbit',
    summary: 'Human-interest and science-focused coverage celebrating the international crew while characterizing GPS interference as an expected minor signal anomaly.',
    fullText: article3Text,
    sentences: splitIntoSentences(article3Text),
  },
];

export const artemisAnalysisDemo: ComparisonAnalysis = {
  storyTitle: 'Artemis II Launch & Florida Coastal GPS Interference',
  lastUpdated: 'November 9, 2026 · 18:30 EST',
  articles: artemisArticles,
  consensus: [
    {
      id: 'cons-1',
      claim: 'Artemis II is a 4-person crewed lunar orbit mission preparing to launch from Kennedy Space Center Pad 39B.',
      explanation: 'All three publications confirm the mission identity, launch site, crew status, and overall objective to orbit the moon.',
      confidence: 0.99,
      citations: [
        {
          articleId: 'artemis-aerotech',
          outlet: 'AeroTech Journal',
          sentenceIndex: 0,
          quote: "NASA's Space Launch System rocket stood gleaming on Pad 39B as engineers completed final countdown simulations for Artemis II, humanity's first crewed mission to lunar orbit in over fifty years.",
        },
        {
          articleId: 'artemis-chronicle',
          outlet: 'The Daily Chronicle',
          sentenceIndex: 4,
          quote: 'While NASA insisted the interference was localized and transient, congressional oversight committee members have demanded a full briefing before astronauts strap into the capsule for the upcoming lunar circumnavigation.',
        },
        {
          articleId: 'artemis-tribune',
          outlet: 'Public Science Monitor',
          sentenceIndex: 0,
          quote: 'Four astronauts are preparing for an unprecedented voyage around the far side of the moon on Artemis II, marking humanity\'s grand return to deep space exploration.',
        },
      ],
    },
    {
      id: 'cons-2',
      claim: 'Satellite GPS signal interference occurred in coastal Florida during or following the rocket testing/ascent.',
      explanation: 'Every outlet acknowledges that GPS signal degradation took place in the vicinity of the Cape Canaveral/Brevard County region.',
      confidence: 0.98,
      citations: [
        {
          articleId: 'artemis-aerotech',
          outlet: 'AeroTech Journal',
          sentenceIndex: 3,
          quote: 'Preliminary telemetry data suggested the launch may have disrupted coastal GPS systems and high-precision maritime beacons across Brevard County for approximately eighteen minutes during ascent.',
        },
        {
          articleId: 'artemis-chronicle',
          outlet: 'The Daily Chronicle',
          sentenceIndex: 1,
          quote: 'Federal Aviation Administration advisories disclosed that precision satellite positioning receivers experienced severe lock loss within a forty-mile radius of the launch complex.',
        },
        {
          articleId: 'artemis-tribune',
          outlet: 'Public Science Monitor',
          sentenceIndex: 3,
          quote: 'Scientific sensors detected brief ionospheric fluctuations that momentarily degraded commercial satellite receiver sensitivity in the immediate coastal marshland.',
        },
      ],
    },
    {
      id: 'cons-3',
      claim: 'NASA and federal aerospace researchers are actively investigating the atmospheric plume mechanisms behind the signal disturbance.',
      explanation: 'All sources reference ongoing technical evaluations into whether acoustic shockwaves, plume ionization, or exhaust chemistry triggered the interference.',
      confidence: 0.95,
      citations: [
        {
          articleId: 'artemis-aerotech',
          outlet: 'AeroTech Journal',
          sentenceIndex: 4,
          quote: '"We are investigating whether atmospheric ionization from the exhaust plume interacted with local UHF frequencies," stated a NASA systems engineer, noting that commercial airliners maintained standard VHF navigation without interruption.',
        },
        {
          articleId: 'artemis-chronicle',
          outlet: 'The Daily Chronicle',
          sentenceIndex: 0,
          quote: "NASA's thunderous Artemis II mega-rocket liftoff disrupted vital Florida GPS signals, aviation officials confirmed on Tuesday, triggering urgent reviews from regional transportation authorities.",
        },
        {
          articleId: 'artemis-tribune',
          outlet: 'Public Science Monitor',
          sentenceIndex: 2,
          quote: 'Engineers and launch directors are conducting routine post-test reviews after sensitive monitoring equipment registered a minor signal anomaly in coastal radio telemetry following the static fire evaluation.',
        },
      ],
    },
  ],
  outletEmphasis: [
    {
      articleId: 'artemis-aerotech',
      outlet: 'AeroTech Journal',
      headline: 'NASA Artemis II Countdown Advances; Launch May Have Disrupted Coastal GPS Systems',
      primaryAngle: 'Technical systems assessment balancing mission readiness milestones against verified ionospheric telemetry.',
      emphasizedThemes: [
        'Cryogenic hydrogen chilldown validation passing without leaks',
        'Specific 18-minute timeline and acoustic modeling boundaries',
        'Continuity of commercial airliner VHF navigation arrays',
      ],
      omittedOrDownplayed: 'Downplays economic controversy and avoids quoting political or congressional critics.',
      stanceTone: 'Empirical, measured, procedural.',
      representativeQuote: {
        sentenceIndex: 3,
        quote: 'Preliminary telemetry data suggested the launch may have disrupted coastal GPS systems and high-precision maritime beacons across Brevard County for approximately eighteen minutes during ascent.',
      },
    },
    {
      articleId: 'artemis-chronicle',
      outlet: 'The Daily Chronicle',
      headline: "NASA's Artemis II Rocket Launch Disrupted Vital Florida GPS Signals, Aviation Officials Confirm",
      primaryAngle: 'Investigative accountability focusing on public infrastructure vulnerability and fiscal scrutiny.',
      emphasizedThemes: [
        'Confirmed impact on Port Canaveral marine pilots and FAA advisories',
        'Overall $93 billion Artemis program price tag and potential delay costs',
        'Congressional oversight inquiries and calls for public safety hearings',
      ],
      omittedOrDownplayed: 'Omits technical details on redundant backup navigation protocols; downplays astronaut mission preparations.',
      stanceTone: 'Urgent, scrutinizing, confrontational.',
      representativeQuote: {
        sentenceIndex: 3,
        quote: '"The sheer acoustic concussive force and solid fuel ionization disrupted critical GPS signals that civilian shipping and automated docking systems depend upon," said a senior maritime logistics director.',
      },
    },
    {
      articleId: 'artemis-tribune',
      outlet: 'Public Science Monitor',
      headline: 'Four Astronauts Slated for Historic Artemis II Orbit As Minor Signal Anomaly Examined',
      primaryAngle: 'Inspirational human spaceflight narrative framing signal variations as normal physics of mega-thrust rocketry.',
      emphasizedThemes: [
        'Individual profiles of the four multinational crew members',
        'Deep space exploration history and scientific advancement',
        'Flawless performance of Orion spacecraft core flight guidance computers',
      ],
      omittedOrDownplayed: 'Frames ground GPS degradation as a mere "minor signal anomaly" restricted to coastal marshlands, minimizing marine concerns.',
      stanceTone: 'Celebratory, reassuring, aspirational.',
      representativeQuote: {
        sentenceIndex: 4,
        quote: '"Such minor signal deviations are standard when 8.8 million pounds of thrust ignite the atmosphere," explained Dr. Elena Vance, an aerospace physics fellow.',
      },
    },
  ],
  wordingFindings: [
    {
      id: 'wf-gps-headline',
      topic: 'GPS Signal Disruption vs Possibility (The Core Headline Finding)',
      category: 'certainty_hedging',
      categoryLabel: 'Epistemic Certainty & Hedging',
      significance: 'High',
      findingSummary:
        'The central distinction in how readers perceive the event: AeroTech uses an epistemic hedge ("may have disrupted"), The Daily Chronicle presents the disruption as an absolute confirmed fact ("disrupted vital Florida GPS signals"), while Public Science Monitor downplays the event entirely to a "minor signal anomaly".',
      comparison: [
        {
          articleId: 'artemis-aerotech',
          outlet: 'AeroTech Journal',
          keyPhrase: 'may have disrupted coastal GPS systems',
          sentenceIndex: 3,
          exactSentence:
            'Preliminary telemetry data suggested the launch may have disrupted coastal GPS systems and high-precision maritime beacons across Brevard County for approximately eighteen minutes during ascent.',
          framingAnalysis:
            'The modal auxiliary "may have" cushions the claim as an open hypothesis pending final telemetry verification, preventing reader panic.',
        },
        {
          articleId: 'artemis-chronicle',
          outlet: 'The Daily Chronicle',
          keyPhrase: 'disrupted vital Florida GPS signals',
          sentenceIndex: 0,
          exactSentence:
            "NASA's thunderous Artemis II mega-rocket liftoff disrupted vital Florida GPS signals, aviation officials confirmed on Tuesday, triggering urgent reviews from regional transportation authorities.",
          framingAnalysis:
            'Uses the unqualified transitive verb "disrupted" coupled with the loaded intensifier "vital", framing the incident as an established operational crisis.',
        },
        {
          articleId: 'artemis-tribune',
          outlet: 'Public Science Monitor',
          keyPhrase: 'minor signal anomaly in coastal radio telemetry',
          sentenceIndex: 2,
          exactSentence:
            'Engineers and launch directors are conducting routine post-test reviews after sensitive monitoring equipment registered a minor signal anomaly in coastal radio telemetry following the static fire evaluation.',
          framingAnalysis:
            'Replaces "disruption" with technical jargon ("signal anomaly") and qualifies it with the diminishing adjective "minor", subtly reassuring the audience that nothing alarming occurred.',
        },
      ],
    },
    {
      id: 'wf-rocket-characterization',
      topic: 'Launch Vehicle Characterization & Power',
      category: 'loaded_descriptors',
      categoryLabel: 'Loaded Adjectives & Imagery',
      significance: 'Medium',
      findingSummary:
        'AeroTech describes the rocket as "gleaming" and "pivotal"; The Daily Chronicle depicts it as "thunderous" with "sheer acoustic concussive force"; Public Science Monitor emphasizes "8.8 million pounds of thrust" in a grand return.',
      comparison: [
        {
          articleId: 'artemis-aerotech',
          outlet: 'AeroTech Journal',
          keyPhrase: 'stood gleaming on Pad 39B',
          sentenceIndex: 0,
          exactSentence:
            "NASA's Space Launch System rocket stood gleaming on Pad 39B as engineers completed final countdown simulations for Artemis II, humanity's first crewed mission to lunar orbit in over fifty years.",
          framingAnalysis:
            'Evokes aesthetic technological majesty and pristine engineering readiness.',
        },
        {
          articleId: 'artemis-chronicle',
          outlet: 'The Daily Chronicle',
          keyPhrase: 'thunderous Artemis II mega-rocket liftoff',
          sentenceIndex: 0,
          exactSentence:
            "NASA's thunderous Artemis II mega-rocket liftoff disrupted vital Florida GPS signals, aviation officials confirmed on Tuesday, triggering urgent reviews from regional transportation authorities.",
          framingAnalysis:
            '"Thunderous" and "mega-rocket" emphasize overwhelming acoustic violence and destructive potential.',
        },
        {
          articleId: 'artemis-tribune',
          outlet: 'Public Science Monitor',
          keyPhrase: 'unprecedented voyage around the far side',
          sentenceIndex: 0,
          exactSentence:
            "Four astronauts are preparing for an unprecedented voyage around the far side of the moon on Artemis II, marking humanity's grand return to deep space exploration.",
          framingAnalysis:
            'Focuses the descriptive weight entirely on historic human courage and exploration milestone.',
        },
      ],
    },
    {
      id: 'wf-attribution-stance',
      topic: 'Institutional Stance: Caution vs Coverup vs Routine',
      category: 'framing_attribution',
      categoryLabel: 'Attribution & Institutional Stance',
      significance: 'High',
      findingSummary:
        'The Daily Chronicle accuses NASA of having "downplayed known electromagnetic acoustic risks", whereas AeroTech treats NASA statements as neutral technical updates, and Public Science Monitor quotes an academic declaring such effects "standard".',
      comparison: [
        {
          articleId: 'artemis-aerotech',
          outlet: 'AeroTech Journal',
          keyPhrase: '"We are investigating whether atmospheric ionization... interacted"',
          sentenceIndex: 4,
          exactSentence:
            '"We are investigating whether atmospheric ionization from the exhaust plume interacted with local UHF frequencies," stated a NASA systems engineer, noting that commercial airliners maintained standard VHF navigation without interruption.',
          framingAnalysis:
            'Attributes quotes to anonymous but calm NASA systems engineers giving methodological explanations.',
        },
        {
          articleId: 'artemis-chronicle',
          outlet: 'The Daily Chronicle',
          keyPhrase: 'warned that NASA downplayed known electromagnetic acoustic risks',
          sentenceIndex: 2,
          exactSentence:
            'Safety advocates warned that NASA downplayed known electromagnetic acoustic risks to avoid embarrassing schedule delays for its marquee human spaceflight initiative.',
          framingAnalysis:
            'Employs active attribution of deception ("downplayed", "embarrassing schedule delays") citing external watchdogs to construct an adversarial accountability narrative.',
        },
        {
          articleId: 'artemis-tribune',
          outlet: 'Public Science Monitor',
          keyPhrase: '"Such minor signal deviations are standard when 8.8 million pounds of thrust ignite"',
          sentenceIndex: 4,
          exactSentence:
            '"Such minor signal deviations are standard when 8.8 million pounds of thrust ignite the atmosphere," explained Dr. Elena Vance, an aerospace physics fellow.',
          framingAnalysis:
            'Quotes an academic authority ("aerospace physics fellow") to normalize the physical phenomenon as an expected law of nature.',
        },
      ],
    },
  ],
};
