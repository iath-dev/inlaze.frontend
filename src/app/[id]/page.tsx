'use client';

import { MovieCard } from '@/components/MovieCard';
import useAxios from '@/hooks/useAxios';
import { MovieDetails, PopularResponse } from '@/types/tmdb';
import { parseImage } from '@/utils/helpers';
import { useParams } from 'next/navigation';

export default function Page(): JSX.Element {
  const { id } = useParams();
  const [data] = useAxios<MovieDetails>({
    url: `${process.env.NEXT_PUBLIC_API_HOST}/movie/${id}`,
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    },
  });
  const [recommendation] = useAxios<PopularResponse>({
    url: `${process.env.NEXT_PUBLIC_API_HOST}/movie/${id}/recommendations`,
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    },
  });

  if (!data || !recommendation) return <p>Loading...</p>;

  return (
    <main className="container max-w-6xl p-4 mx-auto space-x-4">
      <section className="flex flex-col items-center gap-4 md:flex-row">
        <div className="space-y-4 max-w-60">
          <img
            className="rounded-lg max-w-60"
            src={parseImage(data.poster_path)}
            alt="backdrop image"
          />
          <button
            type="button"
            className="w-full text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900 inline-flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-3.5 h-3.5 me-2"
            >
              <path
                fill-rule="evenodd"
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                clip-rule="evenodd"
              />
            </svg>
            <span className="flex-1">Add to favorite</span>
          </button>
        </div>
        <section className="mt-4">
          <h1 className="flex items-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            {data.title}
            <span className="bg-blue-100 text-blue-800 text-2xl font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-4">
              {data.vote_average.toPrecision(2)}
            </span>
          </h1>
          <h2 className="mb-4 text-4xl font-extrabold text-gray-500">
            {data.original_title}
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.genres.flatMap((genre) => (
              <span
                key={genre.id}
                className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
              >
                {genre.name}
              </span>
            ))}
          </div>
          <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
          <h3 className="mb-4 text-2xl font-extrabold text-black dark:text-white">
            Overview:
          </h3>
          <p className="mb-3 text-gray-500 dark:text-gray-400">
            {data.overview}
          </p>
        </section>
      </section>
      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
      <section className="flex gap-4 py-4 overflow-x-auto">
        {recommendation.results.flatMap((item) => (
          <MovieCard key={item.id} item={item} />
        ))}
      </section>
    </main>
  );
}
