from dataclasses import dataclass

@dataclass
class Movie:
    title: str
    genres: list[str]
    rating: float
    year: int
    score: float = 0.0