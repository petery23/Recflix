from models import Movie

def load_movies(path) -> list[Movie]:

    movies = []

    return [
        Movie(title="Movie A", genres=["Action", "Adventure"], rating=7.5, year=2020),
        Movie(title="Movie B", genres=["Action", "Adventure"], rating=7.5, year=2020),
        Movie(title="Movie C", genres=["Drama", "Romance"], rating=8.0, year=2021),
        Movie(title="Movie D", genres=["Sci-Fi", "Thriller"], rating=6.5, year=2019),
        Movie(title="Movie E", genres=["Comedy", "Drama"], rating=7.0, year=2022),
        Movie(title="Movie F", genres=["Action", "Adventure"], rating=8.5, year=2023),
        Movie(title="Movie G", genres=["Drama", "Romance"], rating=9.0, year=2024),
        Movie(title="Movie H", genres=["Sci-Fi", "Thriller"], rating=7.5, year=2025),
        Movie(title="Movie I", genres=["Comedy", "Drama"], rating=8.0, year=2026),
        Movie(title="Movie J", genres=["Action", "Adventure"], rating=8.5, year=2027),
    ]
    