import MoviesView from '@/components/MoviesView';

export default function Home(): JSX.Element {
  return (
    <main className="container max-w-6xl p-4 mx-auto">
      <MoviesView />
    </main>
  );
}
