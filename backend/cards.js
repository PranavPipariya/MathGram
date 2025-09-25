

// const { Router } = require('express');

// const router = Router();

// // --- tiny helpers ---
// const uid = () => Math.random().toString(36).slice(2);
// const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);
// const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];

// // --- MATH-ONLY banks (fallback seeds; you can swap with JSON or AI later) ---
// const DEFINITIONS = [
//   { q: 'Define derivative.', a: 'The instantaneous rate of change of a function with respect to a variable.' },
//   { q: 'What is a matrix?', a: 'A rectangular array of numbers arranged in rows and columns.' },
//   { q: 'Define prime number.', a: 'A natural number greater than 1 that has no positive divisors other than 1 and itself.' },
//   { q: 'Define variance.', a: 'The average of the squared deviations from the mean of a data set.' },
// ];

// const CLOZES = [
//   { q: 'The derivative of x^2 is _____', a: '2x' },
//   { q: 'The integral of 1/x dx is _____ + C', a: 'ln|x|' },
//   { q: 'Pythagoras: a^2 + b^2 = _____', a: 'c^2' },
//   { q: 'Limit of (1 + 1/n)^n as n→∞ is _____', a: 'e' },
//   { q: 'Probability of heads for a fair coin is _____', a: '1/2' },
// ];

// const MCQS = [
//   { q: 'What is the derivative of sin(x)?', a: 'cos(x)', opts: ['cos(x)', '-sin(x)', '-cos(x)', 'sin(x)'] },
//   { q: 'What is the probability of rolling a 3 on a fair six-sided die?', a: '1/6', opts: ['1/3', '1/6', '1/2', '1/12'] },
//   { q: 'Determinant of [[1,2],[3,4]] equals:', a: '-2', opts: ['-2', '2', '10', '-10'] },
//   { q: 'Which distribution is used when variance is unknown and n is small?', a: 't-distribution', opts: ['normal distribution', 'chi-square distribution', 't-distribution', 'F-distribution'] },
// ];

// // ensure options contain answer & are shuffled
// const mcqFrom = (m) => {
//   const pool = Array.isArray(m.opts) ? m.opts.slice() : [];
//   if (!pool.includes(m.a)) pool.push(m.a);
//   return shuffle(pool);
// };

// const DIFFICULTY = ['easy', 'med', 'hard'];

// const makeCard = (topic) => {
//   const type = sample(['definition', 'cloze', 'mcq']);
//   const difficulty = sample(DIFFICULTY);
//   const badge = Math.random() > 0.96 ? 'BOSS' : Math.random() < 0.04 ? 'WILDCARD' : null;

//   if (type === 'definition') {
//     const d = sample(DEFINITIONS);
//     return { id: uid(), type, prompt: d.q, answer: d.a, tags: [topic], difficulty, badge };
//   }
//   if (type === 'cloze') {
//     const c = sample(CLOZES);
//     return { id: uid(), type, prompt: c.q, answer: c.a, tags: [topic], difficulty, badge };
//   }
//   const m = sample(MCQS);
//   return { id: uid(), type: 'mcq', prompt: m.q, answer: m.a, options: mcqFrom(m), tags: [topic], difficulty, badge };
// };

// router.get('/', (req, res) => {
//   // topics come from /feed?topics=A,B,C
//   const topicsParam = (req.query.topics || '').toString().trim();
//   const topics = topicsParam ? topicsParam.split(',').map((s) => s.trim()).filter(Boolean) : ['General'];

//   // allow optional amount (default ~18)
//   const amount = Math.max(1, Math.min(60, parseInt(req.query.amount, 10) || 18));

//   // distribute cards across topics
//   const perTopic = Math.max(1, Math.ceil(amount / topics.length));
//   const cards = topics.flatMap((t) => Array.from({ length: perTopic }, () => makeCard(t))).slice(0, amount);

//   res.json({ cards });
// });

// module.exports = router;




// const { Router } = require('express');

// const router = Router();

// // --- tiny helpers ---
// const uid = () => Math.random().toString(36).slice(2);
// const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);
// const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];

// // --- MATH-ONLY banks (fallback seeds; you can swap with JSON or AI later) ---
// const DEFINITIONS = [
//   { q: 'Define derivative.', a: 'The instantaneous rate of change of a function with respect to a variable.' },
//   { q: 'What is a matrix?', a: 'A rectangular array of numbers arranged in rows and columns.' },
//   { q: 'Define prime number.', a: 'A natural number greater than 1 that has no positive divisors other than 1 and itself.' },
//   { q: 'Define variance.', a: 'The average of the squared deviations from the mean of a data set.' },
// ];

// const CLOZES = [
//   { q: 'The derivative of x^2 is _____', a: '2x' },
//   { q: 'The integral of 1/x dx is _____ + C', a: 'ln|x|' },
//   { q: 'Pythagoras: a^2 + b^2 = _____', a: 'c^2' },
//   { q: 'Limit of (1 + 1/n)^n as n→∞ is _____', a: 'e' },
//   { q: 'Probability of heads for a fair coin is _____', a: '1/2' },
// ];

// const MCQS = [
//   { q: 'What is the derivative of sin(x)?', a: 'cos(x)', opts: ['cos(x)', '-sin(x)', '-cos(x)', 'sin(x)'] },
//   { q: 'What is the probability of rolling a 3 on a fair six-sided die?', a: '1/6', opts: ['1/3', '1/6', '1/2', '1/12'] },
//   { q: 'Determinant of [[1,2],[3,4]] equals:', a: '-2', opts: ['-2', '2', '10', '-10'] },
//   { q: 'Which distribution is used when variance is unknown and n is small?', a: 't-distribution', opts: ['normal distribution', 'chi-square distribution', 't-distribution', 'F-distribution'] },
// ];

// // ensure options contain answer & are shuffled
// const mcqFrom = (m) => {
//   const pool = Array.isArray(m.opts) ? m.opts.slice() : [];
//   if (!pool.includes(m.a)) pool.push(m.a);
//   return shuffle(pool);
// };

// const DIFFICULTY = ['easy', 'med', 'hard'];

// const makeCard = (topic) => {
//   const type = sample(['definition', 'cloze', 'mcq']);
//   const difficulty = sample(DIFFICULTY);
//   const badge = Math.random() > 0.96 ? 'BOSS' : Math.random() < 0.04 ? 'WILDCARD' : null;

//   if (type === 'definition') {
//     const d = sample(DEFINITIONS);
//     return { id: uid(), type, prompt: d.q, answer: d.a, tags: [topic], difficulty, badge };
//   }
//   if (type === 'cloze') {
//     const c = sample(CLOZES);
//     return { id: uid(), type, prompt: c.q, answer: c.a, tags: [topic], difficulty, badge };
//   }
//   const m = sample(MCQS);
//   return { id: uid(), type: 'mcq', prompt: m.q, answer: m.a, options: mcqFrom(m), tags: [topic], difficulty, badge };
// };

// router.get('/', (req, res) => {
//   // topics come from /feed?topics=A,B,C
//   const topicsParam = (req.query.topics || '').toString().trim();
//   const topics = topicsParam ? topicsParam.split(',').map((s) => s.trim()).filter(Boolean) : ['General'];

//   // allow optional amount (default ~18)
//   const amount = Math.max(1, Math.min(60, parseInt(req.query.amount, 10) || 18));

//   // distribute cards across topics
//   const perTopic = Math.max(1, Math.ceil(amount / topics.length));
//   const cards = topics.flatMap((t) => Array.from({ length: perTopic }, () => makeCard(t))).slice(0, amount);

//   res.json({ cards });
// });

// module.exports = router;


// backend/cards.js
const { Router } = require('express');
const router = Router();

const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY || '';
const MISTRAL_MODEL   = process.env.MISTRAL_MODEL || 'mistral-small-latest';
const useNativeFetch  = typeof fetch === 'function';
const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
const uid = () => Math.random().toString(36).slice(2);

if (!MISTRAL_API_KEY) {
  console.warn('[cards] MISTRAL_API_KEY is missing. Requests will fail until it is set.');
}

// ——— util: resilient JSON extraction (handles code fences / prose) ———
function extractJsonObject(text) {
  if (!text) return null;
  // grab the first {...} block
  const m = text.match(/\{[\s\S]*\}/);
  if (!m) return null;
  try { return JSON.parse(m[0]); } catch { return null; }
}

// ——— normalize card shape ———
function normalizeCards(rawCards, topics, requestedAmount, requestedDifficulty) {
  if (!Array.isArray(rawCards)) return [];
  const out = [];

  for (const c of rawCards) {
    if (!c || typeof c !== 'object') continue;

    let type = c.type;
    if (type !== 'definition' && type !== 'cloze' && type !== 'mcq') type = 'mcq';

    // MCQ must have options; if not, skip it
    if (type === 'mcq' && !Array.isArray(c.options)) continue;

    const card = {
      id: String(c.id || uid()),
      type,
      prompt: String(c.prompt || '').trim(),
      answer: String(c.answer || '').trim(),
      options: type === 'mcq' ? c.options.map(String) : undefined,
      tags: Array.isArray(c.tags) && c.tags.length ? c.tags.map(String) : topics,
      difficulty: ['easy', 'med', 'hard'].includes(c.difficulty) ? c.difficulty : (requestedDifficulty || 'med'),
      badge: c.badge === 'BOSS' || c.badge === 'WILDCARD' ? c.badge : null,
    };

    if (!card.prompt || !card.answer) continue;
    out.push(card);
    if (out.length >= requestedAmount) break;
  }

  return out;
}

// ——— talk to Mistral ———
async function generateWithMistral({ topics, amount, difficulty }) {
  if (!MISTRAL_API_KEY) throw new Error('missing_api_key');

  const systemPrompt = `
You are a math question generator.
Output ONLY valid JSON (no markdown, no code fences, no commentary) in EXACTLY this schema:
{
  "cards": [
    {
      "id": "string",
      "type": "definition|cloze|mcq",
      "prompt": "string",
      "answer": "string",
      "options": ["string", "... optional for mcq"],
      "tags": ["${topics.join('","')}"],
      "difficulty": "easy|med|hard",
      "badge": "BOSS|WILDCARD|null"
    }
  ]
}
Rules:
- Questions MUST be SPECIFIC to these topics: ${topics.join(', ')}.
- Keep prompts concise (<= 140 chars).
- For cloze, put a single blank "_____” in the prompt and the real answer in "answer".
- For mcq, "options" MUST include the correct answer + plausible distractors.
- Keep everything academic and safe.
`.trim();

  const userPrompt = `Generate ${amount} mixed cards about: ${topics.join(', ')}. Target difficulty: ${difficulty || 'mixed'}.`;

  const body = {
    model: MISTRAL_MODEL,
    temperature: 0.4, // a bit conservative to keep JSON well-formed
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user',   content: userPrompt },
    ],
  };

  const doFetch = useNativeFetch ? fetch : (await import('node-fetch')).default;

  const rsp = await doFetch('https://api.mistral.ai/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${MISTRAL_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!rsp.ok) {
    const errText = await rsp.text().catch(() => '');
    throw new Error(`mistral_http_${rsp.status}: ${errText}`);
  }

  const data = await rsp.json().catch(() => ({}));
  const content = data?.choices?.[0]?.message?.content?.trim();
  const parsed  = extractJsonObject(content);
  if (!parsed || !Array.isArray(parsed.cards)) {
    throw new Error('mistral_bad_json');
  }
  return parsed.cards;
}

// ——— GET /cards ———
// Example: /cards?topics=Calculus,Algebra&amount=18&difficulty=med
router.get('/', async (req, res) => {
  const topicsParam = (req.query.topics || '').toString().trim();
  const topics = topicsParam ? topicsParam.split(',').map(s => s.trim()).filter(Boolean) : ['Calculus'];

  const amount     = clamp(parseInt(req.query.amount, 10) || 18, 1, 60);
  const difficulty = ['easy', 'med', 'hard'].includes(req.query.difficulty) ? req.query.difficulty : undefined;

  try {
    const raw = await generateWithMistral({ topics, amount, difficulty });
    const cards = normalizeCards(raw, topics, amount, difficulty);

    if (!cards.length) return res.status(502).json({ cards: [], error: 'no_cards_from_model' });
    res.json({ cards });
  } catch (err) {
    console.error('[cards] error:', err.message || err);
    res.status(500).json({ cards: [], error: 'generation_failed' });
  }
});

module.exports = router;
