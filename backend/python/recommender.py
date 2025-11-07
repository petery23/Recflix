from loader import load_movies
from models import Movie
DATA_PATH = "data/movies.json"

def compute_score(target: Movie, candidate: Movie):
    score = 0

    genre_overlap = len(set(target.genres) & set(candidate.genres))
    score += genre_overlap * 100

    if target.region == candidate.region:
        score += 200

    score += candidate.rating * 20

    if target.year > 0 and candidate.year > 0:
        year_diff = abs(target.year - candidate.year)
        score += max(0, 200 - year_diff)  

    return score


def recommend_movies(target_title, movies, top_n=10):
    target_movie = next((m for m in movies if m.title.lower() == target_title.lower()), None)
    if not target_movie:
        print("Movie not found.")
        return []

    recommendations = []

    for candidate in movies:
        if candidate.title != target_movie.title:
            candidate.score = compute_score(target_movie, candidate)
            recommendations.append(candidate)

    recommendations.sort(key=lambda m: m.score, reverse=True)

    return recommendations[:top_n]