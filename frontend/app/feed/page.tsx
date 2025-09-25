

'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import StudyFeedApp from '../../components/StudyFeedApp'; // ← fix path

type Card = {
  id: string;
  type: 'definition' | 'cloze' | 'mcq';
  prompt: string;
  answer: string;
  options?: string[];
  tags: string[];
  difficulty: 'easy' | 'med' | 'hard';
  badge?: 'BOSS' | 'WILDCARD' | null;
};

export default function FeedPage() {
  const params = useSearchParams();
  const router = useRouter();
  const topics = useMemo(
    () => params.get('topics')?.split(',').map(t => t.trim()).filter(Boolean) ?? [],
    [params]
  );

  const [cards, setCards] = useState<Card[] | null>(null);

  // bounce users who arrive without picks
  useEffect(() => {
    if (topics.length === 0) router.replace('/topics');
  }, [topics.length, router]);

  useEffect(() => {
    if (topics.length === 0) return;

    const controller = new AbortController();
    const qs = new URLSearchParams({ topics: topics.join(',') });

    fetch(`http://localhost:4000/cards?${qs.toString()}`, { signal: controller.signal })
      .then((r) => r.json())
      .then((data) => {
        const normalized: Card[] = (data.cards || []).map((c: any) => ({
          id: String(c.id ?? crypto.randomUUID()),
          type: c.type === 'mcq' || c.type === 'cloze' || c.type === 'definition' ? c.type : 'definition',
          prompt: String(c.prompt ?? c.question ?? ''),
          answer: String(c.answer ?? c.correctAnswer ?? ''),
          options: Array.isArray(c.options) ? c.options : Array.isArray(c.incorrectAnswers) ? c.incorrectAnswers.concat(c.correctAnswer ?? []) : undefined,
          tags: Array.isArray(c.tags) ? c.tags : topics.slice(0, 1), // tag with the first selected topic if missing
          difficulty: (['easy','med','hard'] as const).includes(c.difficulty) ? c.difficulty : 'med',
          badge: c.badge ?? null,
        }));
        setCards(normalized);
      })
      .catch(() => setCards([]));

    return () => controller.abort();
  }, [topics.join(',')]);

  if (cards === null) {
    return (
      <main className="min-h-screen grid place-items-center bg-slate-50">
        <div className="text-slate-500">Loading feed…</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-2xl mx-auto px-4 pt-6">
        {topics.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {topics.map((t) => (
              <span key={t} className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 border border-blue-200">
                {t}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* StudyFeedApp must sync seedCards on change (useEffect in the component) */}
      {/* <StudyFeedApp seedCards={cards} /> */}
      <StudyFeedApp key={(topics || []).join(',')} seedCards={cards} />
    </main>
  );
}


