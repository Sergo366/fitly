import { Music2 } from 'lucide-react';

export default function LibraryPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          My Library
        </h1>
        <p className="text-slate-400 text-lg">
          All your saved songs and personal collections.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center min-h-[400px] border-2 border-dashed border-white/5 rounded-3xl bg-white/2">
        <div className="bg-slate-800/50 p-6 rounded-2xl mb-4">
          <Music2 className="w-12 h-12 text-slate-500" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Your library is empty</h2>
        <p className="text-slate-400 max-w-xs text-center">
          Start exploring and save your favorite songs to see them here.
        </p>
        <button className="mt-8 px-6 py-3 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
          Find Songs
        </button>
      </div>
    </div>
  );
}
