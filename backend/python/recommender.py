from loader import load_movies
from algorithms import merge_sort, quick_sort

DATA_PATH = "data/movies.json"

def compute_score(movie, prefs):
    score = 0.0

    preferred_genre = prefs.get("genre")
    if preferred_genre and preferred_genre.lower() in [g.lower() for g in movie.genres]:
        score += 5

    min_year = prefs.get("minYear")
    max_year = prefs.get("maxYear")
    
    if min_year and movie.year and movie.year >= int(min_year):
        score += 1
    if max_year and movie.year and movie.year <= int(max_year):
        score += 1

    score += movie.rating

    return score

def get_recommendations(prefs: dict):

    movies = load_movies(DATA_PATH)

    for m in movies:
        m.score = compute_score(m, prefs)

    algo = prefs.get("algorithm", "merge").lower()

    if algo == "quick":
        movies = quick_sort(movies, key=lambda x: x.score, reverse=True)
    else:
        movies = merge_sort(movies, key=lambda x: x.score, reverse=True)
    
    return movies[:10]
