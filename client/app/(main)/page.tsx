export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
      <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-7xl">
        Welcome to <span className="text-primary italic">Chordly</span>
      </h1>
      <p className="text-slate-400 text-xl max-w-2xl">
        The ultimate companion for your musical journey. Explore millions of chords, 
        organize your library, and elevate your practice.
      </p>
    </div>
  );
}
