// frontend/components/LoadingScreen.tsx
import React from 'react';

export default function LoadingScreen() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-600 text-lg font-medium">Generating your feed…</p>
      </div>
    </main>
  );
}
