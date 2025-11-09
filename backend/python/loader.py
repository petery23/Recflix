import os
import pandas as pd
from models import Movie

def load_movies():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    merged_path = os.path.join(base_dir, "merged_movie_data.feather")

    try:
        merged = pd.read_feather(merged_path)
    except Exception as e:
        print(f"ERROR: Could not read {merged_path}.")
        print("Please run `pre_merge_data.py` again to generate the .feather file.")
        return []

    movies = []
    for _, row in merged.iterrows():
        title = row["title"]
        genres = row["genre"] if isinstance(row["genre"], list) else []
        rating = float(row["rating"]) if row["rating"] != -1 else 0.0
        length = int(row["length"]) if row["length"] != -1 else 0
        year = int(row["releaseYear"]) if row["releaseYear"] != -1 else 0
        region_list = row["region"] if isinstance(row["region"], list) else []
        region = region_list[0] if region_list else "Unknown"

        movie = Movie(title=title, genres=genres, rating=rating, length=length, year=year, region=region)
        movies.append(movie)

    return movies