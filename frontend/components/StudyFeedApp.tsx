

'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Minus, Sparkles, Clock, Settings, Brain, BookOpen, Zap } from "lucide-react";
import { useRouter } from "next/navigation";


// ========== TYPES (shared with backend shape) ==========
const CARD_TYPES = ["definition", "cloze", "mcq"] as const;
type CardType = typeof CARD_TYPES[number];

export type Card = {
  id: string;
  type: CardType;
  prompt: string;
  answer: string;
  options?: string[]; // MCQ only
  tags: string[];
  difficulty: "easy" | "med" | "hard";
  badge?: "BOSS" | "WILDCARD" | null;
};

export type Review = {
  cardId: string;
  response: "got_it" | "meh" | "stumped";
  latencyMs: number;
};

// SSR‑safe timestamp
const now = () => (typeof performance !== "undefined" && performance.now ? performance.now() : Date.now());

// ========== SFX: tiny chime (no assets) ==========
function playChime() {
  try {
    const Ctx = (window as any).AudioContext || (window as any).webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = 'triangle';
    o.frequency.setValueAtTime(880, ctx.currentTime);
    g.gain.setValueAtTime(0.0001, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.28);
    o.connect(g).connect(ctx.destination);
    o.start();
    o.stop(ctx.currentTime + 0.3);
  } catch {}
}

// ========== Confetti from both bottom corners ==========
const ConfettiBurst: React.FC<{ tick: number }> = ({ tick }) => {
  const [alive, setAlive] = useState(true);
  useEffect(() => {
    setAlive(true);
    const t = setTimeout(() => setAlive(false), 1100);
    return () => clearTimeout(t);
  }, [tick]);

  if (!alive) return null;
  const N = 22;
  const palette = ['#ef4444','#f59e0b','#10b981','#3b82f6','#8b5cf6'];

  const Particles = ({ side }: { side: 'left' | 'right' }) => (
    <>
      {Array.from({ length: N }).map((_, i) => {
        const dx = (Math.random() * 200 + 100) * (side === 'left' ? 1 : -1);
        const dy = - (Math.random() * 300 + 200);
        const rot = 360 * (Math.random() * 2 - 1);
        const size = Math.random() < 0.6 ? 8 : 12;
        const rounded = Math.random() < 0.5 ? 'rounded-sm' : 'rounded-full';
        return (
          <motion.span
            key={`${side}-${i}-${tick}`}
            initial={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
            animate={{ opacity: 0, x: dx, y: dy, rotate: rot }}
            transition={{ duration: 1.05, ease: 'easeOut' }}
            className={`absolute ${side === 'left' ? 'left-0' : 'right-0'} bottom-0 ${rounded}`}
            style={{ width: size, height: size, backgroundColor: palette[i % palette.length] }}
          />
        );
      })}
    </>
  );

  return (
    <AnimatePresence>
      {alive && (
        <motion.div key={`burst-${tick}`} className="fixed inset-0 pointer-events-none z-50" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <Particles side="left" />
          <Particles side="right" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ========== UI Bits ==========
const Badge: React.FC<{ label: string; tone: "rose" | "purple" }> = ({ label, tone }) => {
  const toneMap = { rose: "bg-rose-100 text-rose-700 border-rose-200", purple: "bg-purple-100 text-purple-700 border-purple-200" } as const;
  return <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full border ${toneMap[tone]}`}>{label}</span>;
};

const Tag: React.FC<{ t: string }> = ({ t }) => (
  <span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-600">{t}</span>
);

const CardShell: React.FC<{ children: React.ReactNode; card: Card }> = ({ children, card }) => (
  <motion.div
    layout
    initial={{ y: 20, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    viewport={{ once: true, margin: "-40px" }}
    className="rounded-2xl bg-white p-4 shadow-sm border hover:shadow-md transition-shadow"
  >
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        {card.badge === "BOSS" && <Badge label="BOSS" tone="rose" />}
        {card.badge === "WILDCARD" && <Badge label="WILDCARD" tone="purple" />}
        <span className="text-[11px] uppercase tracking-wider text-slate-400">{card.type}</span>
      </div>
      <div className="flex items-center gap-2">
        {(card.tags || []).map((t) => <Tag key={`${card.id}-${t}`} t={t} />)}
      </div>
    </div>
    {children}
  </motion.div>
);

// ========== Card variants ==========
const DefinitionCard: React.FC<{ card: Card; onReview: (r: Review["response"], ms: number) => void; onCorrect?: () => void }> = ({ card, onReview, onCorrect }) => {
  const [revealed, setRevealed] = useState(false);
  const t0 = useRef<number>(now());
  const respond = (resp: Review["response"]) => {
    if (resp === 'got_it') onCorrect?.();
    onReview(resp, now() - (t0.current || now()));
  };

  return (
    <CardShell card={card}>
      <div className="mb-3 text-slate-800 text-[15px] leading-6">{card.prompt}</div>
      <button onClick={() => setRevealed(true)} className="w-full rounded-xl border py-2 hover:bg-slate-50 text-slate-600">Tap to reveal</button>
      <AnimatePresence>
        {revealed && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-3 p-3 rounded-xl bg-slate-50 text-slate-800">
            {card.answer}
          </motion.div>
        )}
      </AnimatePresence>
      <div className="mt-3 flex gap-2">
        <button onClick={() => respond("got_it")} className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 text-white py-2 hover:bg-emerald-700"><Check size={16}/>Got it</button>
        <button onClick={() => respond("meh")} className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 text-white py-2 hover:bg-amber-600"><Minus size={16}/>Meh</button>
        <button onClick={() => respond("stumped")} className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-rose-600 text-white py-2 hover:bg-rose-700"><X size={16}/>Stumped</button>
      </div>
    </CardShell>
  );
};

const ClozeCard: React.FC<{ card: Card; onReview: (r: Review["response"], ms: number) => void; onCorrect?: () => void }> = ({ card, onReview, onCorrect }) => {
  const [revealed, setRevealed] = useState(false);
  const t0 = useRef<number>(now());

  return (
    <CardShell card={card}>
      <div className="mb-2 whitespace-pre-wrap text-slate-800">{card.prompt}</div>
      <div className="text-xs text-slate-500">Hold to peek, tap to reveal</div>
      <div className="mt-3 flex items-center gap-2">
        <button onMouseDown={() => setRevealed(true)} onMouseUp={() => setRevealed(false)} onTouchStart={() => setRevealed(true)} onTouchEnd={() => setRevealed(false)} className="px-3 py-2 rounded-xl border hover:bg-slate-50">Peek</button>
        <button onClick={() => setRevealed(true)} className="px-3 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700">Reveal</button>
      </div>
      <AnimatePresence>
        {revealed && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-3 p-3 rounded-xl bg-slate-50 text-slate-800">
            {card.answer}
          </motion.div>
        )}
      </AnimatePresence>
      <div className="mt-3 flex gap-2">
        <button onClick={() => { onCorrect?.(); onReview("got_it", now() - (t0.current || now())); }} className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 text-white py-2 hover:bg-emerald-700"><Check size={16}/>Got it</button>
        <button onClick={() => onReview("meh", now() - (t0.current || now()))} className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 text-white py-2 hover:bg-amber-600"><Minus size={16}/>Meh</button>
        <button onClick={() => onReview("stumped", now() - (t0.current || now()))} className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-rose-600 text-white py-2 hover:bg-rose-700"><X size={16}/>Stumped</button>
      </div>
    </CardShell>
  );
};

const McqCard: React.FC<{ card: Card; onReview: (r: Review["response"], ms: number) => void; onCorrect?: () => void }> = ({ card, onReview, onCorrect }) => {
  const [picked, setPicked] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const t0 = useRef<number>(now());

  const choose = (opt: string) => {
    if (done) return;
    setPicked(opt);
    setDone(true);
    const correct = opt === card.answer;
    if (correct) onCorrect?.();
    onReview(correct ? "got_it" : "stumped", now() - (t0.current || now()));
  };

  return (
    <CardShell card={card}>
      <div className="mb-3 text-slate-800">{card.prompt}</div>
      <div className="space-y-2">
        {card.options?.map((o) => {
          const isCorrect = o === card.answer;
          const isPicked = picked === o;
          const ring = done ? (isCorrect ? "ring-emerald-500" : isPicked ? "ring-rose-500" : "ring-transparent") : "ring-transparent";
          return (
            <button key={o} onClick={() => choose(o)} className={`w-full text-left px-3 py-2 rounded-xl border hover:bg-slate-50 ring-2 ${ring}`}>
              {o}
            </button>
          );
        })}
      </div>
    </CardShell>
  );
};

// ========== Header & Summary ==========
const HeaderBar: React.FC<{ streakDays: number; coins: number }> = ({ streakDays, coins }) => (
  <div className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b">
    <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <motion.div initial={{ rotate: -8 }} animate={{ rotate: 0 }} className="h-9 w-9 rounded-2xl bg-blue-600 flex items-center justify-center text-white">
          <BookOpen size={18} />
        </motion.div>
        <div className="font-semibold">MathGram</div>
        <span className="ml-2 inline-flex items-center gap-1 text-xs text-blue-700 bg-blue-100 rounded-full px-2 py-0.5"><Zap size={12}/> Learn Math by Doomscrolling</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2 text-slate-600"><Clock className="text-slate-400" size={18}/><span className="text-sm font-medium">Focus mode</span></div>
        <div className="flex items-center gap-1 text-slate-700"><Brain size={18}/><span className="text-sm font-medium">{coins}</span></div>
        <button className="p-2 rounded-xl hover:bg-slate-100"><Settings size={18}/></button>
      </div>
    </div>
  </div>
);



const SessionSummary: React.FC<{ open: boolean; onClose: () => void; stats: { got: number; meh: number; stumped: number; mins: number } }> = ({ open, onClose, stats }) => (
  <AnimatePresence>
    {open && (
      <motion.div className="fixed inset-0 z-50 flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div className="absolute inset-0 bg-black/40" onClick={onClose} />
        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="text-blue-600" />
            <h3 className="text-lg font-semibold">Nice session! Quick recap</h3>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-xl border p-4 text-center">
              <Check className="mx-auto mb-2 text-emerald-600" />
              <div className="text-2xl font-bold">{stats.got}</div>
              <div className="text-xs text-slate-500">Got it</div>
            </div>
            <div className="rounded-xl border p-4 text-center">
              <Minus className="mx-auto mb-2 text-amber-600" />
              <div className="text-2xl font-bold">{stats.meh}</div>
              <div className="text-xs text-slate-500">Meh</div>
            </div>
            <div className="rounded-xl border p-4 text-center">
              <X className="mx-auto mb-2 text-rose-600" />
              <div className="text-2xl font-bold">{stats.stumped}</div>
              <div className="text-xs text-slate-500">Stumped</div>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-slate-600">
            <Clock size={16} /> ~{stats.mins} min on task this session
          </div>
          <div className="mt-6 flex justify-end gap-2">
            <button onClick={onClose} className="px-4 py-2 rounded-xl border hover:bg-slate-50">Stop here</button>
            <button onClick={()=>window.location.reload()} className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700">Keep scrolling</button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

// ========== Main App ==========
export default function StudyFeedApp({ seedCards }: { seedCards?: Card[] }) {
  // strictly render what backend provides
  const [cards, setCards] = useState<Card[]>(() => seedCards ?? []);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [coins, setCoins] = useState(0);
  const [streak] = useState(5);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [topicFilter, setTopicFilter] = useState<string | null>(null);
  const [summaryStats, setSummaryStats] = useState({ got: 0, meh: 0, stumped: 0, mins: 1 });
  const [celebrateTick, setCelebrateTick] = useState(0);

  // keep cards in sync if parent fetches new ones (e.g., when topics change)
  useEffect(() => {
    if (seedCards) setCards(seedCards);
  }, [seedCards]);

  const celebrate = useCallback(() => {
    setCelebrateTick((t) => t + 1);
    playChime();
  }, []);

  const filteredCards = useMemo(() => {
    if (!topicFilter) return cards;
    return cards.filter((c) => (c.tags || []).includes(topicFilter));
  }, [cards, topicFilter]);

  const onReview = useCallback((card: Card, response: Review["response"], latencyMs: number) => {
    setReviews((r) => [...r, { cardId: card.id, response, latencyMs }]);
    setCoins((c) => c + (response === "got_it" ? 3 : response === "meh" ? 1 : 0));

    // Every 20 interactions → show session summary
    setSummaryStats((prev) => {
      const got = (response === "got_it" ? 1 : 0) + reviews.filter((x) => x.response === "got_it").length;
      const meh = (response === "meh" ? 1 : 0) + reviews.filter((x) => x.response === "meh").length;
      const stumped = (response === "stumped" ? 1 : 0) + reviews.filter((x) => x.response === "stumped").length;
      return { ...prev, got, meh, stumped };
    });

    const total = reviews.length + 1;
    if (total > 0 && total % 20 === 0) {
      setSummaryStats((prev) => ({ ...prev, mins: Math.max(1, Math.round(5)) }));
      setSummaryOpen(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reviews]);

  const topics = useMemo(() => Array.from(new Set(cards.flatMap((c) => c.tags || []))), [cards]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <HeaderBar streakDays={streak} coins={coins} />

      {/* confetti overlay */}
      <ConfettiBurst tick={celebrateTick} />

      <main className="min-h-screen">
        <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
          <div className="flex items-center gap-2 text-slate-600">
            <Sparkles className="text-blue-600" size={18}/>
            <span className="text-sm">Interleaved feed • {(topicFilter ?? "All topics")}</span>
          </div>

          {/* Topic filters (optional) */}
          {topics.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setTopicFilter(null)} className={`text-xs px-2 py-1 rounded-full border ${topicFilter === null ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-700'}`}>All</button>
              {topics.map((t) => (
                <button key={t} onClick={() => setTopicFilter(t)} className={`text-xs px-2 py-1 rounded-full border ${topicFilter === t ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-700'}`}>{t}</button>
              ))}
            </div>
          )}

          {filteredCards.map((c) => (
            <FeedRow key={c.id} card={c} onReview={onReview} onCorrect={celebrate} />
          ))}

<div className="h-12 flex items-center justify-center text-slate-500 text-md animate-pulse">
  Please wait for a moment while we generate the most fun math problems for you! (usually takes less than a minute)
 
</div>

 <button onClick={()=>window.location.reload()} className="h-12 flex items-center justify-center text-blue-500 text-lg animate-pulse">Click to refresh feed ! </button>



        </div>
      </main>

      <SessionSummary open={summaryOpen} onClose={() => setSummaryOpen(false)} stats={summaryStats} />

      <footer className="py-10 text-center text-slate-400 text-sm">Built for focus • Math-only • Minimal runtime</footer>
    </div>
  );
}

// --- Feed row wrapper ---
const FeedRow: React.FC<{ card: Card; onReview: (c: Card, r: Review["response"], ms: number) => void; onCorrect?: () => void }> = ({ card, onReview, onCorrect }) => {
  const handler = (r: Review["response"], ms: number) => onReview(card, r, ms);
  if (card.type === "definition") return <DefinitionCard card={card} onReview={handler} onCorrect={onCorrect} />;
  if (card.type === "cloze") return <ClozeCard card={card} onReview={handler} onCorrect={onCorrect} />;
  return <McqCard card={card} onReview={handler} onCorrect={onCorrect} />;
};