import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const response = await fetch(
    `https://api.themoviedb.org/3/search/tv?query=${encodeURIComponent(
      searchParams.get("q") ?? ""
    )}&include_adult=false&language=en-US&page=1&api_key=${
      process.env.TMDB_API_KEY
    }`
  );

  const data = (await response.json()) as {
    results: {
      original_language: string;
      poster_path: string;
      backdrop_path: string;
    }[];
  };

  return NextResponse.json(
    (data.results ?? [])
      .filter(
        ({ original_language, poster_path }) =>
          original_language === "en" && poster_path
      )
      .map((show: any) => ({
        ...show,
        poster_path: `https://image.tmdb.org/t/p/w500${show.poster_path}`,
        backdrop_path: `https://image.tmdb.org/t/p/w500${show.backdrop_path}`,
      }))
  );
}
