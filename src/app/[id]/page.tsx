'use client';

import { FavoriteButton } from '@/components/FavoriteButton';
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

  if (!data || !recommendation)
    return (
      <main className="container flex flex-col items-center justify-center max-w-6xl gap-4 p-4 mx-auto animate-pulse md:flex-row">
        <div className="rounded-lg bg-slate-500 w-72 h-96"></div>
        <div className="flex flex-col w-full space-y-4">
          <div className="w-full h-12 rounded bg-slate-500"></div>
          <div className="w-full h-8 rounded bg-slate-500"></div>
          <div className="w-full h-8 rounded bg-slate-500"></div>
          <div className="flex-1 w-full rounded bg-slate-500"></div>
        </div>
      </main>
    );

  return (
    <main className="container max-w-6xl p-4 mx-auto space-x-4">
      <section className="flex flex-col items-center gap-4 md:flex-row">
        <div className="space-y-4 max-w-60">
          <img
            className="rounded-lg max-w-60"
            src={parseImage(data.poster_path)}
            alt="backdrop image"
          />
          <FavoriteButton id={data.id} />
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
