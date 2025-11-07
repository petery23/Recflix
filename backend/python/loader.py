import os
import pandas as pd
from models import Movie

def load_movies():
    project_root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    data_dir = os.path.join(project_root, 'data')
    genre_path = os.path.join(data_dir, "contentDataGenre.csv")
    prime_path = os.path.join(data_dir, "contentDataPrime.csv")
    region_path = os.path.join(data_dir, "contentDataRegion.csv")

    genre_df = pd.read_csv(genre_path, thousands = ',')
    prime_df = pd.read_csv(prime_path, thousands = ',')
    region_df = pd.read_csv(region_path, thousands = ',')

    # Merge by dataId
    merged = prime_df.merge(genre_df.groupby("dataId")["genre"].apply(list).reset_index(), on="dataId", how="left")
    merged = merged.merge(region_df.groupby("dataId")["region"].apply(list).reset_index(), on="dataId", how="left")

    movies = []
    for _, row in merged.iterrows():
        title = row["title"]
        genres = row["genre"] if isinstance(row["genre"], list) else []
        rating = float(row["rating"]) if row["rating"] != -1 else 0.0
        length = int(row["length"]) if row["length"] != -1 else 0
        year = int(row["releaseYear"]) if row["releaseYear"] != -1 else 0
        region = row["region"][0] if isinstance(row["region"], list) and len(row["region"]) > 0 else "Unknown"

        movie = Movie(title=title, genres=genres, rating=rating, length=length, year=year, region=region)
        movies.append(movie)

    return movies