import time
import copy
from loader import load_movies
from models import Movie
from algorithms import merge_sort, quick_sort
DATA_PATH = "data/movies.json"

def compute_score(target: Movie, candidate: Movie):
    score = 0

    genre_overlap = len(set(target.genres) & set(candidate.genres))
    score += genre_overlap * 100

    if target.region == candidate.region:
        score += 200

    score += candidate.rating * 20

    if target.year > 0:
        if candidate.year > 0:
            year_diff = abs(target.year - candidate.year)
            score += max(0, 200 - year_diff)  

    return score


def recommend_movies(target_title, movies, top_n=10, algorithm="merge"):
    target_movie = None
    for movie in movies:
        if movie.title.lower() == target_title.lower():
            target_movie = movie
            break
    
    if not target_movie:
        print("Movie not found.")
        return [], 0.0, 0.0

    recommendations = []

    for candidate in movies:
        if candidate.title != target_movie.title:
            candidate.score = compute_score(target_movie, candidate)
            recommendations.append(candidate)

    recommendations_copy = copy.deepcopy(recommendations)

    selected_start_time = time.perf_counter()
    if algorithm == "quick":
        recommendations = quick_sort(
            recommendations, 
            key=lambda m: m.score, 
            reverse=True
        )
    else:
        recommendations = merge_sort(
            recommendations, 
            key=lambda m: m.score, 
            reverse=True
        )
    selected_end_time = time.perf_counter()
    selected_sort_time = selected_end_time - selected_start_time

    other_start_time = time.perf_counter()
    if algorithm == "quick":
        merge_sort(
            recommendations_copy, 
            key=lambda m: m.score, 
            reverse=True
        )
        other_algorithm = "merge"
    else:
        quick_sort(
            recommendations_copy, 
            key=lambda m: m.score, 
            reverse=True
        )
        other_algorithm = "quick"
    other_end_time = time.perf_counter()
    other_sort_time = other_end_time - other_start_time

    return recommendations[:top_n], selected_sort_time, other_sort_time