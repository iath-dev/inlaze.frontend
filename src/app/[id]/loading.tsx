export default function Loading(): JSX.Element {
  return (
    <main className="container flex flex-col max-w-6xl gap-4 p-4 mx-auto animate-pulse md:flex-row">
      <div className="rounded-lg bg-slate-500 w-72 h-96"></div>
      <div className="flex flex-col w-full space-y-4">
        <div className="w-full h-12 rounded bg-slate-500"></div>
        <div className="w-full h-8 rounded bg-slate-500"></div>
        <div className="w-full h-8 rounded bg-slate-500"></div>
        <div className="flex-1 w-full rounded bg-slate-500"></div>
      </div>
    </main>
  );
}
