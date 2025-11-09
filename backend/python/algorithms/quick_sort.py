def quick_sort(movies, key, reverse=False):
    if len(movies) <= 1:
        return movies
    
    pivot_index = len(movies) // 2
    pivot = movies[pivot_index]
    pivot_val = key(pivot)
    
    left = []
    middle = []
    right = []
    
    for movie in movies:
        movie_val = key(movie)
        if movie_val < pivot_val:
            left.append(movie)
        elif movie_val > pivot_val:
            right.append(movie)
        else:
            middle.append(movie)
    
    left = quick_sort(left, key, reverse)
    right = quick_sort(right, key, reverse)
    
    if reverse:
        return right + middle + left
    else:
        return left + middle + right