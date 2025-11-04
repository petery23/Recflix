import sys
import json
from recommender import get_recommendations
from dataclasses import asdict

def main():

    try:
        prefs = json.load(sys.stdin)
    except json.JSONDecodeError:
        prefs = {}

    recommendations = get_recommendations(prefs)

    recommendations_dict = [asdict(movie) for movie in recommendations]

    json.dump(recommendations_dict, sys.stdout)

if __name__ == "__main__":
    main()