import { useCallback, useEffect, useState } from "react";
import { Content } from "./components/Content";
import { SideBar } from "./components/SideBar";
import { api } from "./services/api";

import "./styles/global.scss";
interface GenreResponseProps {
  id: number;
  name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
  title: string;
}

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>(
    {} as GenreResponseProps
  );
  const [movies, setMovies] = useState<MovieProps[]>([]);

  useEffect(() => {
    api
      .get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`)
      .then((response) => {
        setMovies(response.data);
      });

    api
      .get<GenreResponseProps>(`genres/${selectedGenreId}`)
      .then((response) => {
        setSelectedGenre(response.data);
      });
  }, [selectedGenreId]);

  useEffect(() => {
    api.get<GenreResponseProps[]>("genres").then((response) => {
      setGenres(response.data);
    });
  }, []);

  const handleClickButton = useCallback((id: number) => {
    setSelectedGenreId(id);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <SideBar
        genres={genres}
        selectedGenreId={selectedGenreId}
        buttonClickCallback={handleClickButton}
      />

      <Content selectedGenre={selectedGenre} movies={movies} />
    </div>
  );
}
