export default function ExplorePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Explore
        </h1>
        <p className="text-slate-400 text-lg">
          Discover new music and curated collections.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div className="p-8 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/5 rounded-3xl relative overflow-hidden group">
          <div className="relative z-10 transition-transform duration-300 group-hover:scale-105">
            <h2 className="text-2xl font-bold text-white mb-2">New Arrivals</h2>
            <p className="text-slate-300">Fresh songs added to our library every day.</p>
          </div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl" />
        </div>
        <div className="p-8 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-white/5 rounded-3xl relative overflow-hidden group">
          <div className="relative z-10 transition-transform duration-300 group-hover:scale-105">
            <h2 className="text-2xl font-bold text-white mb-2">Editor&apos;s Choice</h2>
            <p className="text-slate-300">Hand-picked selections for your practice.</p>
          </div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl" />
        </div>
      </div>
    </div>
  );
}
