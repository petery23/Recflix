import sys
import json
from loader import load_movies

def search_movies(query):
    if not query:
        return []

    movies = load_movies()
    query = query.lower()

    matches = [movie.title for movie in movies if query in movie.title.lower()]

    return matches[:10]

if __name__ == "__main__":
    try:
        data = json.load(sys.stdin)
        query = data.get("search_query")
        results = search_movies(query)
        print(json.dumps(results))
    except Exception as e:
        print(json.dumps({"error": str(e)}))
        