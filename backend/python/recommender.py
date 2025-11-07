# recommender.py
from loader import load_movies
# from algorithms import merge_sort, quick_sort  # Algorithms not yet integrated
from models import Movie
DATA_PATH = "data/movies.json"

def compute_score(target: Movie, candidate: Movie):
    score = 0

    # Genre similarity
    genre_overlap = len(set(target.genres) & set(candidate.genres))
    score += genre_overlap * 100

    # Region similarity
    if target.region == candidate.region:
        score += 200

    # Rating contribution
    score += candidate.rating * 20

    # Year similarity (older movies slightly penalized)
    if target.year > 0 and candidate.year > 0:
        year_diff = abs(target.year - candidate.year)
        score += max(0, 200 - year_diff)  # subtract up to 200 pts if far apart

    return score


def recommend_movies(target_title, movies, top_n=10):
    # 1. Find the target movie
    target_movie = next((m for m in movies if m.title.lower() == target_title.lower()), None)
    if not target_movie:
        print("Movie not found.")
        return []

    recommendations = []

    # 2. Assign scores to every other movie
    for candidate in movies:
        if candidate.title != target_movie.title:
            candidate.score = compute_score(target_movie, candidate)
            recommendations.append(candidate)

    # ----------------------------------------------------------------------
    # TO BE COMPLETED BY TEAMMATE: INTEGRATE SORTING ALGORITHMS HERE
    # ----------------------------------------------------------------------
    # recommendations.sort(key=lambda m: m.score, reverse=True) # REMOVED: Use custom sort

    # For now, we'll use Python's built-in sort to ensure the program runs
    # This line MUST BE replaced by quick_sort() or merge_sort() later.
    recommendations.sort(key=lambda m: m.score, reverse=True)

    return recommendations[:top_n]