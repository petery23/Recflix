import sys
import json
from dataclasses import asdict
from search import search_movies
from loader import load_movies
from recommender import recommend_movies

def main():
    try:
        prefs = json.load(sys.stdin)
    except json.JSONDecodeError:
        print(json.dumps({"error": "Invalid JSON input"}))
        return

    if "search_query" in prefs:
        query = prefs.get("search_query")
        results = search_movies(query)
        print(json.dumps(results))

    elif "target_title" in prefs:
        movies = load_movies()
        target_title = prefs.get("target_title")
        recommendations = recommend_movies(target_title, movies)

        recommendations_dict = [asdict(movie) for movie in recommendations]
        print(json.dumps(recommendations_dict))

    else:
        print(json.dumps({"error": "Invalid request. Missing 'search_query' or 'target_title'"}))


if __name__ == "__main__":
    main()