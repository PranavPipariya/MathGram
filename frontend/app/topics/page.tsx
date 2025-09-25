// 'use client';

// import { useMemo, useState } from 'react';
// import { useRouter } from 'next/navigation';

// const ALL_TOPICS = [
//   'Calculus','IO Econ','Psych Stats','Neuro','Time Series',
//   'Game Theory','DBMS','OS','ZK Proofs'
// ];

// export default function TopicsPage() {
//   const router = useRouter();
//   const [picked, setPicked] = useState<string[]>([]);

//   const canContinue = picked.length === 5;

//   const toggle = (t: string) => {
//     setPicked((old) => {
//       if (old.includes(t)) return old.filter(x => x !== t);
//       if (old.length >= 5) return old; // cap at 5
//       return [...old, t];
//     });
//   };

//   const remaining = useMemo(() => 5 - picked.length, [picked.length]);

//   const goFeed = () => {
//     const q = new URLSearchParams({ topics: picked.join(',') }).toString();
//     router.push(`/feed?${q}`);
//   };

//   return (
//     <main className="min-h-screen bg-slate-50">
//       <div className="max-w-2xl mx-auto px-4 py-8">
//         <h1 className="text-2xl font-semibold text-slate-900">Pick exactly 5 topics</h1>
//         <p className="mt-1 text-slate-600">You’ve picked {picked.length}/5. {remaining > 0 ? `${remaining} to go.` : 'All set!'}</p>

//         <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
//           {ALL_TOPICS.map((t) => {
//             const active = picked.includes(t);
//             return (
//               <button
//                 key={t}
//                 onClick={() => toggle(t)}
//                 className={`px-3 py-2 rounded-xl border text-sm
//                   ${active ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-700 hover:bg-slate-50'}`}
//               >
//                 {t}
//               </button>
//             );
//           })}
//         </div>

//         <div className="mt-8">
//           <button
//             disabled={!canContinue}
//             onClick={goFeed}
//             className={`w-full rounded-xl py-3
//               ${canContinue ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-slate-200 text-slate-500 cursor-not-allowed'}`}
//           >
//             Start feed
//           </button>
//         </div>
//       </div>
//     </main>
//   );
// }




// 'use client';

// import { useMemo, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { motion, AnimatePresence } from 'framer-motion';

// const ALL_TOPICS = [
//   'Calculus','IO Econ','Psych Stats','Neuro','Time Series',
//   'Game Theory','DBMS','OS','ZK Proofs'
// ];

// export default function TopicsPage() {
//   const router = useRouter();
//   const [picked, setPicked] = useState<string[]>([]);

//   const canContinue = picked.length === 5;

//   const toggle = (t: string) => {
//     setPicked((old) => {
//       if (old.includes(t)) return old.filter(x => x !== t);
//       if (old.length >= 5) return old; // cap at 5
//       return [...old, t];
//     });
//   };

//   const remaining = useMemo(() => 5 - picked.length, [picked.length]);

//   const goFeed = () => {
//     const q = new URLSearchParams({ topics: picked.join(',') }).toString();
//     router.push(`/feed?${q}`);
//   };

//   return (
//     <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
//       <div className="max-w-3xl mx-auto px-6 py-16 text-center">
//         <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
//           Pick Your <span className="text-blue-600">5 Topics</span>
//         </h1>
//         <p className="mt-4 text-lg text-slate-600">
//           {remaining > 0
//             ? `You’ve picked ${picked.length}/5. ${remaining} left to go.`
//             : 'All set — let’s get started!'}
//         </p>

//         <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-4">
//           {ALL_TOPICS.map((t) => {
//             const active = picked.includes(t);
//             return (
//               <motion.button
//                 key={t}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => toggle(t)}
//                 className={`px-4 py-3 rounded-2xl text-base font-medium border transition-all
//                   ${active
//                     ? 'bg-blue-600 text-white border-blue-600 shadow-md'
//                     : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}`}
//               >
//                 {t}
//               </motion.button>
//             );
//           })}
//         </div>

//         <div className="mt-12">
//           <motion.button
//             whileHover={canContinue ? { scale: 1.05 } : {}}
//             whileTap={canContinue ? { scale: 0.97 } : {}}
//             disabled={!canContinue}
//             onClick={goFeed}
//             className={`w-full md:w-auto px-12 py-5 rounded-2xl text-xl font-semibold transition-colors
//               ${canContinue
//                 ? 'bg-blue-600 text-white shadow-lg hover:bg-blue-700'
//                 : 'bg-slate-200 text-slate-500 cursor-not-allowed'}`}
//           >
//             Start Feed →
//           </motion.button>
//         </div>

//         <AnimatePresence>
//           {picked.length > 0 && (
//             <motion.div
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: 10 }}
//               transition={{ duration: 0.3 }}
//               className="mt-8 flex flex-wrap justify-center gap-2 text-sm text-slate-600"
//             >
//               {picked.map((t) => (
//                 <span
//                   key={t}
//                   className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-medium"
//                 >
//                   {t}
//                 </span>
//               ))}
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </main>
//   );
// }

'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const ALL_TOPICS = [
  'Algebra',
  'Linear Algebra',
  'Calculus I',
  'Calculus II',
  'Multivariable Calculus',
  'Differential Equations',
  'Probability',
  'Statistics',
  'Geometry',
  'Number Theory',
  'Discrete Math',
  'Real Analysis',
];

export default function TopicsPage() {
  const router = useRouter();
  const [picked, setPicked] = useState<string[]>([]);

  const canContinue = picked.length === 5;

  const toggle = (t: string) => {
    setPicked((old) => {
      if (old.includes(t)) return old.filter((x) => x !== t);
      if (old.length >= 5) return old; // cap at 5
      return [...old, t];
    });
  };

  const remaining = useMemo(() => 5 - picked.length, [picked.length]);

  const goFeed = () => {
    const q = new URLSearchParams({ topics: picked.join(',') }).toString();
    router.push(`/feed?${q}`);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-3xl mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Pick Your <span className="text-blue-600">5 Math Topics</span>
        </h1>

        <p className="mt-4 text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
          We’ll build you an <span className="font-semibold text-blue-700">infinite scroll feed</span> of math questions —
          like doomscrolling, but productive.
        </p>

        <p className="mt-3 text-base text-slate-500">
          {remaining > 0
            ? `You’ve picked ${picked.length}/5. ${remaining} left to go.`
            : 'All set — let’s get started!'}
        </p>

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-4">
          {ALL_TOPICS.map((t) => {
            const active = picked.includes(t);
            return (
              <motion.button
                key={t}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggle(t)}
                className={`px-4 py-3 rounded-2xl text-base font-medium border transition-all
                  ${active
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}`}
              >
                {t}
              </motion.button>
            );
          })}
        </div>

        <div className="mt-12">
          <motion.button
            whileHover={canContinue ? { scale: 1.05 } : {}}
            whileTap={canContinue ? { scale: 0.97 } : {}}
            disabled={!canContinue}
            onClick={goFeed}
            className={`w-full md:w-auto px-12 py-5 rounded-2xl text-xl font-semibold transition-colors
              ${canContinue
                ? 'bg-blue-600 text-white shadow-lg hover:bg-blue-700'
                : 'bg-slate-200 text-slate-500 cursor-not-allowed'}`}
          >
            Start Your Feed →
          </motion.button>
        </div>

        <AnimatePresence>
          {picked.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="mt-8 flex flex-wrap justify-center gap-2 text-sm text-slate-600"
            >
              {picked.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-medium"
                >
                  {t}
                </span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
