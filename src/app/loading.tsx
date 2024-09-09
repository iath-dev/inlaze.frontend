export default function Loading(): JSX.Element {
  return (
    <main className="container max-w-6xl p-4 mx-auto">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={`loading-card-${index}`}
          className="bg-white border border-gray-200 rounded-lg shadow w-80 h-96 dark:bg-gray-800 dark:border-gray-700"
        >
          <div className="flex flex-col w-full h-full animate-pulse">
            <div className="flex-1 w-full bg-slate-700"></div>
            <div className="flex items-center p-4 space-x-2">
              <div className="w-8 h-8 p-4 rounded bg-slate-700"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 rounded bg-slate-700"></div>
                <div className="h-2 rounded bg-slate-700"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </main>
  );
}
