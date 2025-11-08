def merge_sort(movies, key, reverse=False):
    if len(movies) <= 1:
        return movies

    mid = len(movies) // 2
    left = movies[:mid]
    right = movies[mid:]

    left = merge_sort(left, key, reverse)
    right = merge_sort(right, key, reverse)

    return merge(left, right, key, reverse)
    
def merge(left, right, key, reverse):
    result = []
    i = 0
    j = 0

    while i < len(left) and j < len(right):
        left_val = key(left[i])
        right_val = key(right[j])
        
        if not reverse:
            if left_val <= right_val:
                result.append(left[i])
                i += 1
            else:
                result.append(right[j])
                j += 1
        else:
            if left_val >= right_val:
                result.append(left[i])
                i += 1
            else:
                result.append(right[j])
                j += 1
    
    result.extend(left[i:])
    result.extend(right[j:])
    
    return result