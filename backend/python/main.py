import sys
import json
from dataclasses import asdict
from search import search_movies
from loader import load_movies
from recommender import recommend_movies

def main():
    movies = load_movies()
    try:
        prefs = json.load(sys.stdin)
    except json.JSONDecodeError:
        print(json.dumps({"error": "Invalid JSON input"}))
        return

    if "search_query" in prefs:
        query = prefs.get("search_query")
        results = search_movies(query, movies)
        print(json.dumps(results))

    elif "target_title" in prefs:
        target_title = prefs.get("target_title")
        algorithm = prefs.get("algorithm", "merge")
        recommendations, selected_sort_time, other_sort_time = recommend_movies(
            target_title, 
            movies, 
            algorithm=algorithm
        )

        recommendations_dict = []
        for movie in recommendations:
            recommendations_dict.append(asdict(movie))
        
        if algorithm == "quick":
            other_algorithm = "merge"
        else:
            other_algorithm = "quick"
        
        response = {
            "movies": recommendations_dict,
            "sortTime": selected_sort_time,
            "algorithm": algorithm,
            "otherSortTime": other_sort_time,
            "otherAlgorithm": other_algorithm
        }
        print(json.dumps(response))

    else:
        print(json.dumps({"error": "Invalid request. Missing 'search_query' or 'target_title'"}))


if __name__ == "__main__":
    main()