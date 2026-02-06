export default function TopPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Top Charts
        </h1>
        <p className="text-slate-400 text-lg">
          The most popular chords and songs this week.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-card border border-border rounded-3xl p-6 hover:border-primary/50 transition-colors group cursor-pointer">
            <div className="h-40 bg-slate-800/50 rounded-2xl mb-4 overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center">
                 <span className="text-4xl font-bold text-slate-700/50">#{i}</span>
              </div>
            </div>
            <h3 className="text-lg font-bold text-white mb-1 group-hover:text-primary transition-colors">Popular Song {i}</h3>
            <p className="text-slate-400 text-sm">Artist Name</p>
          </div>
        ))}
      </div>
    </div>
  );
}
