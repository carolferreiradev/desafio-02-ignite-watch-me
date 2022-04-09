import { Button } from "./Button";

import "../styles/sidebar.scss";

interface GenreResponseProps {
  id: number;
  name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
  title: string;
}
interface SidebarProps {
  genres: GenreResponseProps[];
  selectedGenreId: number;
  buttonClickCallback: (id: number) => void;
}

export function SideBar({
  genres,
  selectedGenreId,
  buttonClickCallback,
}: SidebarProps) {
  return (
    <>
      <nav className="sidebar">
        <span>
          Watch<p>Me</p>
        </span>

        <div className="buttons-container">
          {genres.map((genre) => (
            <Button
              key={String(genre.id)}
              title={genre.title}
              iconName={genre.name}
              onClick={() => buttonClickCallback(genre.id)}
              selected={selectedGenreId === genre.id}
            />
          ))}
        </div>
      </nav>
    </>
  );
}
