import sys
import json
from loader import load_movies
from recommender import recommend_movies

def main():
    movies = load_movies()
    print(f"Loaded {len(movies)} movies.\n")

    target_title = input("Enter a movie title to base recommendations on: ")
    top_movies = recommend_movies(target_title, movies)

    print("\nTop Recommendations:")
    for i, m in enumerate(top_movies, 1):
        print(f"{i}. {m.title} ({m.year}) | Rating: {m.rating} | Region: {m.region} | Score: {round(m.score, 2)}")

if __name__ == "__main__":
    main()